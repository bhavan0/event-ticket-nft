// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract EventNFT is ERC20 {
    
    address _owner;
    
    constructor() 
    ERC20('Test', 'TST') {
        _owner = msg.sender;
    }
    
    function MintNew() public virtual {
        _mint(msg.sender, 1000 * 1000000000000000000);
    }
    
    function payOther() payable public virtual {
        payable(_owner).transfer(msg.value);
    }
}