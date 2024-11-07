// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {RealDigital} from "./RealDigital.sol";

contract STR {
    RealDigital public realDigitalContract;

    address[] public participants = [address(0x1), address(0x2)];

    constructor(address _realDigitalContract) {
        realDigitalContract = RealDigital(_realDigitalContract);
        participants.push(msg.sender);
    }

    modifier onlyParticipant() {
        bool isParticipant = false;

        for (uint256 i = 0; i < participants.length; i++) {
            if (participants[i] == msg.sender) {
                isParticipant = true;
            }
        }

        require(isParticipant, "Unauthorized");
        _;
    }

    function requestToMint(uint256 _amount) external onlyParticipant {
        realDigitalContract.mint(msg.sender, _amount);
    }

    function requestToBurn(uint256 _amount) external onlyParticipant {
        realDigitalContract.burnFrom(msg.sender, _amount);
    }
}
