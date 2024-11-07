// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Realestate is ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;

    constructor(
        address initialAddress
    ) ERC721("Realestate", "IMT") Ownable(initialAddress) {}

    function mint(address to) public onlyOwner returns (uint256) {
        _tokenIdCounter += 1;
        _mint(to, _tokenIdCounter);
        return _tokenIdCounter;
    }

    function setTokenURI(
        uint256 tokenId,
        string memory _tokenURI
    ) public onlyOwner {
        _setTokenURI(tokenId, _tokenURI);
    }
}
