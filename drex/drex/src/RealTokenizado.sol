// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {ERC20} from "./ERC20.sol";

contract RealTokenizado is ERC20 {
    address public owner;
    address public swap;

    constructor(
        address _owner,
        string memory _name,
        string memory _symbol
    ) ERC20(_name, _symbol, 2) {
        owner = _owner;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function mint(address _client, uint256 amount) external {
        _mint(_client, amount);
    }

    function burn(address _client, uint256 amount) external {
        _burn(_client, amount);
    }
}
