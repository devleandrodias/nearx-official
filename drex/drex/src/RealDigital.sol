// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {ERC20} from "./ERC20.sol";

contract RealDigital is ERC20 {
    address public str;
    address public swap;

    event Swap(address indexed, address to, uint256 amount);

    constructor(address _str, address _swap) ERC20("RealDigital", "RD", 2) {
        str = _str;
        swap = _swap;
    }

    modifier onlySWAP() {
        require(msg.sender == swap, "Unauthorized");
        _;
    }

    modifier onlySTR() {
        require(msg.sender == str, "Unauthorized");
        _;
    }

    function mint(address _to, uint256 _amount) external onlySTR {
        _mint(_to, _amount);
    }

    function burnFrom(address _to, uint256 _amount) external onlySTR {
        _burn(_to, _amount);
    }

    function transferSWAP(
        address _from,
        address _to,
        uint256 _amount
    ) external onlySWAP {
        balanceOf[_from] -= _amount;

        unchecked {
            balanceOf[_to] += _amount;
        }

        emit Swap(_from, _to, _amount);
    }
}
