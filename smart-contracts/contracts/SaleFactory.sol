// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./access/Ownable.sol";
import "./token/ERC20/ERC20.sol";
import "./token/ERC721/ERC721.sol";
import "./token/ERC20/IERC20.sol";
import "./MasterpieceNFT.sol";

/**
 * PJT Ⅲ - Req.1-SC1 SaleFactory 구현
 * 상태 변수나 함수의 시그니처, 이벤트는 구현에 따라 변경할 수 있습니다.
 */
contract SaleFactory is Ownable {
    address public admin; // 모든 판매의 수퍼 권한을 갖는 owner address
    address[] public sales; // 이 컨트랙트를 통해 생성된 Sale컨트랙트의 주소의 배열
    mapping(uint256 => address) saleContractAddress; // 토큰id -> Salecontract address 맵핑

    event NewSale(
        address indexed _saleContract,
        address indexed _owner,
        uint256 _workId
    );

    constructor() {
        admin = msg.sender;
    }

    /**
     * @dev 반드시 구현해야하는 함수입니다. 
     */
    function createSale(
        uint256 itemId,
        uint256 purchasePrice,
        address currencyAddress,
        address nftAddress
    ) public returns (address) {
        // TODO
        address seller = msg.sender;
        Sale instance = new Sale(admin, seller, itemId, purchasePrice, currencyAddress, nftAddress);
        sales.push(address(instance));
        saleContractAddress[itemId] = address(instance);
        emit NewSale(address(instance), msg.sender, itemId);
        return address(instance);
    }

    function allSales() public view returns (address[] memory) {
        return sales;
    }

    function getSaleContractAddress(uint256 tokenId) public view returns (address) {
        require(saleContractAddress[tokenId] != address(0), "this token is not on sale");
        return saleContractAddress[tokenId];
    }
}

/**
 *  PJT Ⅲ - Req.1-SC2) Sale 구현
 */
contract Sale {
    // 생성자에 의해 정해지는 값
    address public seller;
    address public buyer;
    address admin;
    // uint256 public saleStartTime;
    // uint256 public saleEndTime;
    // uint256 public minPrice;
    uint256 public purchasePrice;
    uint256 public tokenId;
    address public currencyAddress;
    address public nftAddress;
    bool public ended;

    // 현재 최고 입찰 상태
    address public highestBidder;
    uint256 public highestBid;

    IERC20 public SsafyTokenContract;
    MasterpieceNFT public MasterpieceNFTContract;

    event HighestBidIncereased(address bidder, uint256 amount);
    event SaleEnded(address winner, uint256 amount);

    constructor(
        address _admin,
        address _seller,
        uint256 _tokenId,
        // uint256 _minPrice,
        uint256 _purchasePrice,
        // uint256 startTime,
        // uint256 endTime,
        address _currencyAddress,
        address _nftAddress
    ) {
        // require(_minPrice > 0);
        tokenId = _tokenId;
        // minPrice = _minPrice;
        purchasePrice = _purchasePrice;
        seller = _seller;
        admin = _admin;
        // saleStartTime = startTime;
        // saleEndTime = endTime;
        currencyAddress = _currencyAddress;
        nftAddress = _nftAddress;
        ended = false;
        // erc20Contract = IERC20(_currencyAddress);
        // erc721Constract = IERC721(_nftAddress);
        SsafyTokenContract = IERC20(_currencyAddress);
        MasterpieceNFTContract = MasterpieceNFT(_nftAddress);
    }

    function bid(uint256 bid_amount) public {
        // TODO
    }

    function purchase(uint256 price) public {
        // TODO
        require(msg.sender != seller, "seller can't call this function");
        require(ended == false, "Not on Sale");
        require(SsafyTokenContract.balanceOf(msg.sender) >= price, "buyer do not have enough tokens");
        require(SsafyTokenContract.allowance(msg.sender, address(this)) != 0, "buyer did not approve this contract");
        require(SsafyTokenContract.allowance(msg.sender, address(this)) >= price, "caller approve less amount of token");
        buyer = msg.sender;
        SsafyTokenContract.transferFrom(buyer, seller, price);
        MasterpieceNFTContract.transferFrom(seller, buyer, tokenId);
        emit SaleEnded(buyer, price);
        _end();
    }

    function confirmItem() public {
        // TODO 
    }
    
    // NFT 판매 중지
    function cancelSales() public onlySeller {
        // TODO
        require(msg.sender == seller || msg.sender == admin, "caller is not approved");
        _end();
    }

    // function getTimeLeft() public view returns (int256) {
    //     return (int256)(saleEndTime - block.timestamp);
    // }

    function getSaleInfo()
        public
        view
        returns (
            uint256,
            uint256,
            address,
            address
        )
    {
        return (
            purchasePrice,
            tokenId,
            currencyAddress,
            nftAddress
        );
    }

    function getHighestBid() public view returns(uint256){
        return highestBid;
    }

    // internal 혹은 private 함수 선언시 아래와 같이 _로 시작하도록 네이밍합니다.
    function _end() internal {
        ended = true;
    }

    function _getCurrencyAmount() private view returns (uint256) {
        return SsafyTokenContract.balanceOf(msg.sender);
    }

    // modifier를 사용하여 함수 동작 조건을 재사용하는 것을 권장합니다. 
    modifier onlySeller() {
        require(msg.sender == seller || msg.sender == admin, "Sale: You are not seller.");
        _;
    }

    // modifier onlyAfterStart() {
    //     require(
    //         block.timestamp >= saleStartTime,
    //         "Sale: This sale is not started."
    //     );
    //     _;
    // }
}
