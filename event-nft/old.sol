// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/openzeppelin-solidity/contracts/utils/Counters.sol";

contract EventNFT is ERC721URIStorage {
    
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    uint private _maxTicketsCount;
    string private _tokenURI;
    address payable _owner;
    uint _ticketCost;
    uint noOfEvents;
    
    modifier minimumAmmountSent(uint amount) {
        require(amount >= _ticketCost, 'Amount is less than ticket cost');
        _;
    }
    
    modifier onlyOwner {
        require(msg.sender == _owner, 'Only owner can perform this operation');
        _;
    }
    
    constructor(uint maxTicketsCount, uint singleTicketCost, string memory tokenURI, string memory eventName, string memory eventSymbol) 
    ERC721(eventName, eventSymbol) {
        _maxTicketsCount = maxTicketsCount;
        _ticketCost = singleTicketCost * 1000000000000000000; // convert to wei
        _tokenURI = tokenURI;
        _owner = payable(msg.sender);
    }
    
    function totalTickets() public view virtual returns (uint) {
        return _maxTicketsCount;
    }
    
    function ticketCost() public view virtual returns (uint) {
        return _ticketCost;
    }
    
    function ticketsLeft() public view virtual returns (uint) {
        return _maxTicketsCount - _tokenIds.current();
    }
    
    function getTicketInfo() public view virtual returns (string memory) {
        return _tokenURI;
    }
    
    function buyTicket() minimumAmmountSent(msg.value) public payable returns (uint)
    {
        _tokenIds.increment();
        
        uint newItemId = _tokenIds.current();
        
        if(newItemId > _maxTicketsCount + 1) revert("All tickets sold out!!!");
        
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, _tokenURI);
        
        uint refund = msg.value - _ticketCost;

        payable(msg.sender).transfer(refund);
        
        payable(_owner).transfer(_ticketCost);
        
        return newItemId;
    }

    function payOther() public payable{
        payable(_owner).transfer(msg.value);
    }
}