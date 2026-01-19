// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Minimal EIP-5192 Interface
interface IERC5192 {
    function locked(uint256 tokenId) external view returns (bool);
}

contract SoulboundToken is ERC721, Ownable {
    uint256 private _nextTokenId;

    event Locked(uint256 tokenId);
    event Unlocked(uint256 tokenId);

    constructor() ERC721("DeSoc Identity", "SBT") Ownable(msg.sender) {}

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        emit Locked(tokenId); // Signal that this token is locked
    }

    // Revoke a credential (Burn)
    function revoke(uint256 tokenId) external onlyOwner {
        _burn(tokenId);
    }

    // EIP-5192: All tokens are locked permanently
    function locked(uint256 tokenId) external view returns (bool) {
        require(_ownerOf(tokenId) != address(0), "Token not found");
        return true;
    }

    // BLOCK TRANSFERS
    function _update(address to, uint256 tokenId, address auth) internal override returns (address) {
        address from = _ownerOf(tokenId);
        
        // Allow Minting (from 0) and Burning (to 0), but block transfers between users
        if (from != address(0) && to != address(0)) {
            revert("SBT: Transfer not allowed");
        }
        
        return super._update(to, tokenId, auth);
    }
}
