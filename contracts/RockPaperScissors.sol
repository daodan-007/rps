pragma solidity ^0.4.24;

import "./Ownable.sol";
import "./SafeMath.sol";

contract RockPaperScissors is Ownable {

  using SafeMath for uint;

  bool public contractPaused = false;
  uint public gameIdCounter = 0;
  uint public minimumWager;
  uint public gameBlockTimeLimit;
  bytes32 internal emptyStringHash = keccak256(''); 
  uint public tip_rate = 20000000000000000; //0.02 eth
  mapping (address => uint) public balances;

  struct Game {
    uint gameId;
    uint wager;
    uint gameExpirationBlock;
    address creator;
    address challenger;
    address winner;
    bytes32 creatorEncryptedMove;
    bytes32 challengerEncryptedMove;
    string creatorMove;
    string challengerMove;
    Status status;
  }

  event GameUpdates(uint gameId, uint wager, address indexed creator, address indexed challenger, Status indexed status, address winner);

  function emitGameUpdates(uint gameId) internal {
    Game memory game = games[gameId];
    emit GameUpdates(game.gameId, game.wager, game.creator, game.challenger, game.status, game.winner);
  }

  mapping (uint => Game) public games;

  enum Status {
    Open,
    Cancelled,
    AwaitingReveals,
    AwaitingCreatorReveal,
    AwaitingChallengerReveal,
    Finished,
    Expired
  }

  mapping (string => string) internal moveWinsAgainst;

  function seedMoveWinsAgainst() internal {
    moveWinsAgainst['Rock'] = 'Paper';
    moveWinsAgainst['Paper'] = 'Scissors';
    moveWinsAgainst['Scissors'] = 'Rock';
  }

  constructor() public {
    minimumWager = 200000000000000; // .02 ETH
    gameBlockTimeLimit = 5760; 
    seedMoveWinsAgainst();
  }

  function circuitBreaker() public onlyOwner {
    if (contractPaused == false) { contractPaused = true; }
    else { contractPaused = false; }
  }

  modifier checkIfPaused() {
    require(contractPaused == false);
    _;
  }

  modifier validateMove(string _move ) {
    require(
      keccak256(_move) == keccak256('Rock') ||
      keccak256(_move) == keccak256('Paper') ||
      keccak256(_move) == keccak256('Scissors')
    );
    _;
  }

  modifier validatePasswordHash(bytes32 _passwordHash) {
    require(_passwordHash != emptyStringHash);
    _;
  }

  modifier checkGameExpiration(uint _gameId) {
    Game storage game = games[_gameId];
    uint totalPrizePool = game.wager.mul(2);

    if (block.number >= game.gameExpirationBlock && game.gameExpirationBlock != 0 && game.status != Status.Expired) {
      game.status = Status.Expired;
      emitGameUpdates(game.gameId);

      if (
        keccak256(game.creatorMove) == emptyStringHash &&
        keccak256(game.challengerMove) != emptyStringHash
        ) { increaseBalance(game.challenger, totalPrizePool); }

      else if (
        keccak256(game.creatorMove) != emptyStringHash &&
        keccak256(game.challengerMove) == emptyStringHash
        ) { increaseBalance(game.creator, totalPrizePool); }

      else if (
        keccak256(game.creatorMove) == emptyStringHash &&
        keccak256(game.challengerMove) == emptyStringHash
        ) {
        increaseBalance(game.creator, game.wager);
        increaseBalance(game.challenger, game.wager);
      }

      revert(); 
    }

    else {
      _; 
    }
  }


  function increaseBalance(address _account, uint _amount) internal {
    balances[_account] = balances[_account].add(_amount);
  }

  function decreaseBalance(address _account, uint _amount) internal {
    balances[_account] = balances[_account].sub(_amount);
  }

  function depositFunds() public payable {
    increaseBalance(msg.sender, msg.value);
  }

  function withdrawFunds(uint _amount) public {
    require(balances[msg.sender] >= _amount);
    decreaseBalance(msg.sender, _amount);
    msg.sender.transfer(_amount);
  }

  function createGame(bytes32 _encryptedMove, uint _wager) public checkIfPaused() {
    require(balances[msg.sender] >= _wager);
    decreaseBalance(msg.sender, _wager);
    gameIdCounter = gameIdCounter.add(1); 
    games[gameIdCounter] = Game({ 
      gameId: gameIdCounter,
      wager: _wager,
      gameExpirationBlock: 0,
      creator: msg.sender,
      challenger: 0x0,
      winner: 0x0,
      creatorEncryptedMove: _encryptedMove, 
      challengerEncryptedMove: emptyStringHash,
      creatorMove: '',
      challengerMove: '',
      status: Status.Open
    });
    emitGameUpdates(gameIdCounter);
  }

  function cancelGame(uint _gameId) public checkIfPaused() {
    Game storage game = games[_gameId];
    require(
      msg.sender == game.creator &&
      game.status == Status.Open
    );
    game.status = Status.Cancelled;
    emitGameUpdates(game.gameId);
    increaseBalance(game.creator, game.wager); 
  }

  function joinGame(bytes32 _encryptedMove, uint _gameId) public checkIfPaused() {
    Game storage game = games[_gameId]; 
    require(
      game.creator != msg.sender && 
      game.status == Status.Open &&
      balances[msg.sender] >= game.wager
    );
    decreaseBalance(msg.sender, game.wager);
    game.status = Status.AwaitingReveals;
    game.challenger = msg.sender;
    game.gameExpirationBlock = block.number.add(gameBlockTimeLimit);
    game.challengerEncryptedMove = _encryptedMove; 
    emitGameUpdates(game.gameId);
  }

  function revealMove(string _move, bytes32 _passwordHash, uint _gameId) public checkIfPaused() checkGameExpiration(_gameId) validateMove(_move) validatePasswordHash(_passwordHash) {
    Game storage game = games[_gameId];
    require(
      game.status == Status.AwaitingReveals ||
      game.status == Status.AwaitingCreatorReveal ||
      game.status == Status.AwaitingChallengerReveal
    );

    if (msg.sender == game.creator) { 
      require(game.creatorEncryptedMove == keccak256(_move, msg.sender, _passwordHash));
      game.creatorMove = _move;
      game.status = Status.AwaitingChallengerReveal;
      emitGameUpdates(game.gameId);
    } else if (msg.sender == game.challenger) { 
      require(game.challengerEncryptedMove == keccak256(_move, msg.sender, _passwordHash));
      game.challengerMove = _move;
      game.status = Status.AwaitingCreatorReveal;
      emitGameUpdates(game.gameId);
    } else { 
      revert();
    }

    if (keccak256(game.creatorMove) != emptyStringHash && keccak256(game.challengerMove) != emptyStringHash) {
      determineWinner(_gameId);
    }
  }

  function determineWinner(uint _gameId) internal checkIfPaused() {
    Game storage game = games[_gameId];
    uint totalPrizePool = game.wager.mul(2);
    uint tip = totalPrizePool * tip_rate / (1 ether);
    totalPrizePool = totalPrizePool - tip;

    require(
      keccak256(game.creatorMove) != emptyStringHash &&
      keccak256(game.challengerMove) != emptyStringHash
    );

    if (keccak256(game.creatorMove) == keccak256(game.challengerMove)) { 
      increaseBalance(game.creator, game.wager);
      increaseBalance(game.challenger, game.wager);
    } else if (keccak256(moveWinsAgainst[game.creatorMove]) == keccak256(game.challengerMove)) { 
      game.winner = game.challenger;
      transferOwner(tip); 
      increaseBalance(game.winner, totalPrizePool);
    } else if (keccak256(moveWinsAgainst[game.challengerMove]) == keccak256(game.creatorMove)) { 
      game.winner = game.creator;
      transferOwner(tip); 
      increaseBalance(game.winner, totalPrizePool);
    } else { 
      revert();
    }
    game.status = Status.Finished;
    emitGameUpdates(game.gameId);
  }

  function () public payable {
    depositFunds();
  }

  function Successd() public {
    successd();
  }

}
