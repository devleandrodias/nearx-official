// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract RealestateToken is ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;
    mapping(uint256 => uint256) public precos;
    mapping(uint256 => address) public locatarios;

    IERC20 public moeda;

    constructor(address initialAddress) Ownable(initialAddress) {}
}
