// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract ExampleVariables {
    // This is a comment

    uint8 public maxPermit = 255;
    uint8 public testLimit;
    int256 public negative = -1;
    uint256 public number;
    int256 public negativeNumber;
    
    // second example

    function insertMaxUint(uint8 _number) external {
        testLimit = _number;
    }

    function insertMaxUint(uint256 _number) external {
        number = _number;
    }

    function testNegative(int256 _number) external view returns(int256) {
        int256 internalNegativeNumber = _number;
        int256 sumNegativeNumbers = negative - internalNegativeNumber;
        return(sumNegativeNumbers);
    }
}
