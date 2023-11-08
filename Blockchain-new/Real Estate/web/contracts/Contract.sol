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
        return productId;
    }
    function updateProperty(address owner,uint256 productId,string memory _propertyTitle,string memory _category, string memory _images, string memory _propertyAddress,string memory _description)external returns(uint256){
        Property storage property = properties[productId];
        require(property.owner==owner,"you are not the owner");
        property.category=_category;
        property.images=_images;
        property.propertyAddress=_propertyAddress;
        property.description=_description;
        property.propertyTitle=_propertyTitle;
        return productId;
    }
    function buyProperty(uint256 id, address buyer) external payable{
        uint256 amount = msg.value;
        require(amount >= properties[id].price, "Insufficient funds");
        Property storage property = properties[id];
        (bool sent,) = payable(property.owner).call{value: amount}("");
        if(sent){
            property.owner = buyer;
            emit PropertySold(id, property.owner, buyer, amount);
        }
            //shd add commission

    }
    function getAllProperties() public view returns(Property[] memory){
        uint256 itemCount = propertyIndex;
    
        Property[] memory items = new Property[](itemCount);
        for(uint256 currentIndex = 0; currentIndex < itemCount; currentIndex){
            
            Property storage currentItem = properties[currentIndex+1];
            items[currentIndex]=currentItem;
        }
        return items;
    } 
    function getUserProperties (address user) external view returns(Property [] memory){
        uint256 totalItems=propertyIndex;
        uint256 itemCount =0;
        uint256 curr=0;
        for(uint256 i=0;i<totalItems;i++)
        {
            if(properties[i+1].owner==user)
            {
                itemCount+=1;
            }

        }
        Property[] memory item= new Property[](itemCount);
        for(uint256 i=0;i<totalItems;i++)
        {
            if(properties[i+1].owner==user)
            {
                Property storage currentItem = properties[curr];
                item[curr]=currentItem;
                curr+=1;
            }
        }
        return item;

    }
    function addReview(uint256 productId,uint256 rating,string calldata comment,address user)external{
        Property storage property=properties[productId];
        property.revieweers.push(user);
        property.reviews.push(comment);
        reviews[productId].push(Review(user,productId,rating,comment,0));
        userReviews[user].push(productId);
        products[productId].totalRating +=rating;
        products[productId].totalRating+=rating;
        products[productId].numReviews++;
        emit ReviewAdded(productId,user,rating,comment);
        reviewsCounter++;

    }
    function getProductReviews(uint256 productId) external view returns(Review[] memory){
        return reviews[productId];
    }
    function getUserReviews(address user) external view returns (Review[] memory)
        {
            uint256 totalReviews = userReviews[user].length;
            Review[] memory userProductReviews = new Review[](totalReviews);
            for(uint256 i=0; i < userReviews[user].length; i++){
                uint256 productId = userReviews[user][i];
                Review[] memory productReviews = reviews[productId];
                for(uint256 j=0; j < productReviews.length; j++ ){
                    if(productReviews[j].reviewer == user){
                        userProductReviews[i] = productReviews[j];
                    }
                }
            }
            return userProductReviews;
        }

    function getProperty(uint256 id) external view returns(uint256, address, uint256, string memory, string memory, string memory, string memory, string memory)
    {
        Property memory property = properties[id];
        return(
            property.productID,
            property.owner,
            property.price,
            property.propertyTitle,
            property.category,
            property.images,
            property.propertyAddress,
            property.description
        );
    } 
   
}
