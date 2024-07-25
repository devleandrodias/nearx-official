// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract REAL is ERC20, Ownable {
    constructor() ERC20("Real", "BRT") {}

    function mint(address _to, uint256 _amount) public onlyOwner {
        _mint(_to, _amount);
    }

    function withdraw(uint256 _amount) public onlyOwner {
        require(balanceOf(msg.sender) >= _amount);
        
        _burn(msg.sender, _amount);

        payable(msg.sender).transfer(_amount);
    }
}