// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {RealDigital} from "./RealDigital.sol";
import {RealTokenizado} from "./RealTokenizado.sol";

contract SwapOneStep {
    RealDigital realDigital;
    RealTokenizado realTokenizado1;
    RealTokenizado realTokenizado2;

    address[] participants = [address(0x1), address(0x2)];

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

    function swap(
        address _realDigital,
        address _realTokenizado1,
        address _client1,
        address _realTokenizado2,
        address _client2,
        uint256 _amount
    ) external onlyParticipant {
        realDigital = RealDigital(_realDigital);
        realTokenizado1 = RealTokenizado(_realTokenizado1);
        realTokenizado2 = RealTokenizado(_realTokenizado2);

        realDigital.transferSWAP(realTokenizado1.owner(), realTokenizado2.owner(), _amount);

        realTokenizado1.burn(_client1, _amount);

        realTokenizado2.mint(_client2, _amount);
    }
}
