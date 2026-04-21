// Chat.sol
pragma solidity ^0.8.28;

contract Chat {
    event MessageLogged(address user, string hash);

    function logMessage(string memory hash) public {
        emit MessageLogged(msg.sender, hash);
    }
}