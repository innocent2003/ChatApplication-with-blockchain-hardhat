// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.28;

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

// contract NFTMarketplace is ERC721, Ownable, ReentrancyGuard {

//     uint256 private _tokenIds;
//     uint256 public marketplaceFee = 250; // 2.5% (basis points: 250 = 2.5%)

//     struct NFT {
//         string tokenURI;
//         uint256 price;
//         bool forSale;
//     }

//     mapping(uint256 => NFT) public nfts;

//     // ========== EVENTS ==========
//     event Minted(uint256 indexed tokenId, address indexed owner, string uri);
//     event Listed(uint256 indexed tokenId, uint256 price, address indexed seller);
//     event Unlisted(uint256 indexed tokenId);
//     event Sold(uint256 indexed tokenId, address indexed buyer, uint256 price);

//     constructor() ERC721("MyNFT", "MNFT") Ownable() {}

//     // ========== MINT ==========
//     function mint(string memory uri) external returns (uint256) {
//         _tokenIds++;

//         uint256 newTokenId = _tokenIds;

//         _safeMint(msg.sender, newTokenId);

//         nfts[newTokenId] = NFT({
//             tokenURI: uri,
//             price: 0,
//             forSale: false
//         });

//         emit Minted(newTokenId, msg.sender, uri);

//         return newTokenId;
//     }

//     // ========== LIST ==========
//     function listNFT(uint256 tokenId, uint256 price) external {
//         require(ownerOf(tokenId) == msg.sender, "Not owner");
//         require(price > 0, "Invalid price");

//         nfts[tokenId].price = price;
//         nfts[tokenId].forSale = true;

//         emit Listed(tokenId, price, msg.sender);
//     }

//     // ========== UNLIST ==========
//     function unlistNFT(uint256 tokenId) external {
//         require(ownerOf(tokenId) == msg.sender, "Not owner");

//         nfts[tokenId].forSale = false;
//         nfts[tokenId].price = 0;

//         emit Unlisted(tokenId);
//     }

//     // ========== BUY ==========
//     function buyNFT(uint256 tokenId) external payable nonReentrant {
//         NFT memory nft = nfts[tokenId];

//         require(nft.forSale, "Not for sale");
//         require(msg.value >= nft.price, "Insufficient funds");

//         address seller = ownerOf(tokenId);

//         uint256 feeAmount = (msg.value * marketplaceFee) / 10000;
//         uint256 sellerAmount = msg.value - feeAmount;

//         // Transfer NFT
//         _transfer(seller, msg.sender, tokenId);

//         // Pay seller
//         payable(seller).transfer(sellerAmount);

//         // Pay marketplace owner
//         payable(owner()).transfer(feeAmount);

//         // Update state
//         nfts[tokenId].forSale = false;
//         nfts[tokenId].price = 0;

//         emit Sold(tokenId, msg.sender, msg.value);
//     }

//     // ========== ADMIN ==========
//     function setMarketplaceFee(uint256 fee) external onlyOwner {
//         require(fee <= 1000, "Max 10%");
//         marketplaceFee = fee;
//     }

//     // ========== VIEW ==========
//     function tokenURI(uint256 tokenId) public view override returns (string memory) {
//         return nfts[tokenId].tokenURI;
//     }
// }