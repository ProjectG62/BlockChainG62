// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract RealEstate {
    struct Property{
        uint256 productID;
        address owner;
        uint256 price;
        string propertyTitle;
        string category;
        string images;
        string propertyAddress;
        string description;
        address [] revieweers;
        string [] reviews;
    }
    mapping(uint256 => Property) private properties;
    uint256 public propertyIndex;

    event PropertyListed(uint256 indexed id, address indexed owner, uint256 price);
    event PropertySold(uint256 indexed id, address indexed  oldowner, address indexed newowner, uint256 price );
    event PropertyResold( uint256 indexed id, address indexed oldowner, uint256 indexed newowner, uint256 price );
    
    struct Review{
        address reviewer;
        uint256 productId;
        uint256 rating;
        string comment;
        uint256 likes;
    }
    struct Product{
        uint256 productId;
        uint256 totalRating;
        uint256 numReviews;

    }

    mapping(uint256=>Review[]) private reviews;
    mapping(address => uint256[]) private userReviews;
    mapping(uint256 => Product) private products;
    uint256 public reviewsCounter;
    event ReviewAdded(uint256 indexed productId, address indexed reviewer,uint256 rating, string comment);
event ReviewLiked(uint256 indexed productId,uint256 indexed reviewIndex, address indexed liker, uint256 likes);

    function listProperty(address owner, uint256 price,string memory _propertyTitle,string memory _category, string memory _images, string memory _propertyAddress,string memory _description)external returns(uint256)
    {
    require(price>0,"Price must be greater than 0.");
    uint256 productId = propertyIndex++;
    Property storage property = properties[productId];
    property.productID=productId;
    property.owner =owner;
    property.price=price;
    property.propertyTitle=_propertyTitle;
    property.category=_category;
    property.images=_images;
    property.propertyAddress=_propertyAddress;
    property.description=_description;
    emit PropertyListed(productId,owner,price);
    }


}