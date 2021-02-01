// SPDX-License-Identifier:MIT
pragma solidity 0.6.12;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/math/SafeMath.sol';


contract Allowance is Ownable {
    using SafeMath for uint;
    
    struct CustomMap {
         mapping(address => uint) maps;
         address[] keys;
     }
    
    CustomMap allowance;

    event AllowanceChange(address indexed _forWho, address indexed _fromWhom, uint _oldAmount, uint _newAmount);
    
    modifier ownerOrAllowance(uint _amount) {
        require(isOwner() || allowance.maps[msg.sender] >= _amount, "You are not allowance!");
        _;
    }
    
    function isOwner() internal view returns(bool) {
        return (owner() == msg.sender);
    }
    
    function setAllowance(address _who, uint _amount) public onlyOwner {
        require(address(this).balance >= _amount, "Account balance is not sufficient.");
        bool contain = contains(_who);
        if (contain) {
            allowance.maps[_who] = _amount;
        } else {
            allowance.maps[_who] = _amount;
            allowance.keys.push(_who);
        }
        emit AllowanceChange(_who, msg.sender, allowance.maps[_who], _amount);
    }
    
    function reduceAllowance(address _who, uint _amount) internal ownerOrAllowance(_amount) {
        emit AllowanceChange(_who, msg.sender, allowance.maps[_who], allowance.maps[_who].sub(_amount));
        allowance.maps[_who] = allowance.maps[_who].sub(_amount);
    }

    function contains(address _addr) public view returns (bool) {
        if (allowance.keys.length == 0) {
           return false;
        }
        uint len = allowance.keys.length;
        for (uint i = 0 ; i < len ; i++) {
            if (allowance.keys[i] == _addr) {
              return true;
            }
        }
            return false;
    } 

    function getAllowances() public view returns (address[] memory, uint[] memory) {
        uint len = allowance.keys.length;
        address[] memory keys = new address[](len);
        uint[] memory values = new uint[](len);
        for (uint i=0; i< len; i++) {
            address key = allowance.keys[i];
            keys[i] = key;
            values[i] = allowance.maps[key];
        }

        return (keys, values);
    }
}


contract SharedWallet is Allowance {
    
    event MoneySent(address indexed _to, uint _amount);
    event MoneyReceived(address indexed _from, uint _amount);
    
    function withdrawMoney(address payable _to, uint _amount) public ownerOrAllowance(_amount) {
        require(_amount <= address(this).balance, "Contract does not own enough money");
        if (!isOwner()) {
            reduceAllowance(msg.sender, _amount);
        }
        emit MoneySent(_to, _amount);
        _to.transfer(_amount);
    }
    
    function renounceOwnership() public onlyOwner override{
        revert("Not possible in this contract!!!");
    }
    
    fallback() external payable {
        emit MoneyReceived(msg.sender, msg.value);
    }
    receive() external payable {
        emit MoneyReceived(msg.sender, msg.value);
    }    
}
