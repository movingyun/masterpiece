// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./token/ERC721/ERC721.sol";
import "./utils/Counters.sol";
import "./utils/Strings.sol";

/**
 * PJT Ⅰ - 과제 2) NFT Creator 구현
 * 상태 변수나 함수의 시그니처는 구현에 따라 변경할 수 있습니다.
 */
contract MasterpieceNFT is ERC721{
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter private _tokenIds;
    // uint256 private _tokenIds;

    mapping(uint256 => string) tokenURIs;

    constructor() ERC721("Masterpiece-NFT", "MPT") {}

    function current() public view returns (uint256) {
        return _tokenIds.current();
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        // TODO
        _requireMinted(tokenId);
        return tokenURIs[tokenId];
    }

    function create(address to, string memory _tokenURI) public returns (uint256) {
        // TODO
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(to, newItemId);
        tokenURIs[newItemId] = _tokenURI;
        return newItemId;
    }
}