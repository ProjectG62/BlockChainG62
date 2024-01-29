// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract RealEstate {
    struct Property {
        uint256 productID;
        address owner;
        uint256 price;
        string country;
        string city;
        string propertyTitle;
        uint256 nRooms;
        uint256 nBathrooms;
        uint256 nParking;
        string propertyAddress;
        string description;
        uint256 likeCount;
        bool sold;
        string[] images;
    }

    struct UserSTR {
        uint256[] likedPropId;
        uint256[] SoldProperties;
        uint256[] BoughtProperties;
    }

    mapping(uint256 => Property) private properties;
    uint256 public propertyIndex = 0;
    mapping(address => UserSTR) private users;

    event PropertyListed(
        uint256 indexed id,
        address indexed owner,
        uint256 price
    );
    event PropertySold(
        uint256 indexed id,
        address indexed oldowner,
        address indexed newowner,
        uint256 price
    );
    event PropertyResold(
        uint256 indexed id,
        address indexed oldowner,
        address indexed newowner,
        uint256 price
    );
    event LikeAdded(uint256 indexed productId, address indexed user);
    event LikeDeleted(uint256 indexed productId, address indexed user);

    modifier onlyOwner(uint256 productId) {
        require(
            properties[productId].owner == msg.sender,
            "You are not the owner"
        );
        _;
    }

    function listProperty(
        uint256 _price,
        string memory _country,
        string memory _city,
        string memory _propertyTitle,
        uint256 _nBathrooms,
        uint256 _nRooms,
        uint256 _nParking,
        string memory _propertyAddress,
        string memory _description,
        string memory _image1
    ) external returns (uint256) {
        require(_price > 0, "Price must be greater than 0.");
        uint256 temp = propertyIndex++;
        Property storage property = properties[temp];
        property.productID = temp;
        property.owner = msg.sender;
        property.price = _price;
        property.propertyTitle = _propertyTitle;
        property.propertyAddress = _propertyAddress;
        property.description = _description;
        property.nBathrooms = _nBathrooms;
        property.nRooms = _nRooms;
        property.nParking = _nParking;
        property.country = _country;
        property.city = _city;
        property.sold = false;
        property.images.push(_image1);
        emit PropertyListed(temp, msg.sender, _price);
        return temp;
    }

    function updateTitle(
        uint256 productId,
        string memory _propertyTitle
    ) external onlyOwner(productId) {
        Property storage property = properties[productId];
        property.propertyTitle = _propertyTitle;
    }

    function updateDescription(
        uint256 productId,
        string memory _description
    ) external onlyOwner(productId) {
        Property storage property = properties[productId];
        property.description = _description;
    }

    function updatePrice(
        uint256 productId,
        uint256 _price
    ) external onlyOwner(productId) {
        Property storage property = properties[productId];
        property.price = _price;
    }

    function updateImage(
        uint256 productId,
        string memory _image
    ) external onlyOwner(productId) {
        Property storage property = properties[productId];
        property.images.push(_image);
    }

    function buyProperty(uint256 id, address buyer) external {
        Property storage property = properties[id];
        address seller = property.owner;
        property.sold = true;
        UserSTR storage user2 = users[property.owner];
        user2.SoldProperties.push(id);
        UserSTR storage user1 = users[buyer];
        user1.BoughtProperties.push(id);
        property.owner = buyer;
        emit PropertySold(id, seller, buyer, property.price);
    }

    function getAllProperties() external view returns (Property[] memory) {
        uint256 itemCount = propertyIndex;
        uint256 activeItemCount = 0;

        for (uint256 currIndex = 0; currIndex < itemCount; currIndex++) {
            if (!properties[currIndex].sold) {
                activeItemCount++;
            }
        }

        Property[] memory activeItems = new Property[](activeItemCount);
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < itemCount; i++) {
            if (!properties[i].sold) {
                activeItems[currentIndex] = properties[i];
                currentIndex++;
            }
        }

        return activeItems;
    }

    function getUserProperties(
        address user
    ) external view returns (Property[] memory) {
        uint256 totalItems = propertyIndex;
        uint256 itemCount = 0;
        for (uint256 i = 0; i < totalItems; i++) {
            if (properties[i].owner == user) {
                itemCount += 1;
            }
        }

        Property[] memory userProperties = new Property[](itemCount);
        // UserSTR storage user1 = users[user];
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItems; i++) {
            if (properties[i].owner == user) {
                userProperties[currentIndex] = properties[i];
                currentIndex += 1;
            }
        }

        return userProperties;
    }

    function getEveryListedProperty()
        external
        view
        returns (Property[] memory)
    {
        uint256 itemCount = propertyIndex;
        uint256 activeItemCount = 0;

        for (uint256 currIndex = 0; currIndex < itemCount; currIndex++) {
            activeItemCount++;
        }

        Property[] memory activeItems = new Property[](activeItemCount);
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < itemCount; i++) {
            activeItems[currentIndex] = properties[i];
            currentIndex++;
        }

        return activeItems;
    }

    function getLikedProperties(
        address user
    ) external view returns (uint256[] memory) {
        UserSTR storage liker = users[user];
        return liker.likedPropId;
    }

    function getBoughtProperties(
        address user
    ) external view returns (uint256[] memory) {
        UserSTR storage buyer = users[user];
        return buyer.BoughtProperties;
    }

    function getSoldProperties(
        address user
    ) external view returns (uint256[] memory) {
        UserSTR storage seller = users[user];
        return seller.SoldProperties;
    }

    function addLike(uint256 productId) external {
        Property storage property = properties[productId];
        require(property.sold == false, "Property has been sold!");
        property.likeCount++;
        UserSTR storage user1 = users[msg.sender];

        user1.likedPropId.push(productId);
        emit LikeAdded(productId, msg.sender);
    }

    function removeLike(uint256 productId) external {
        Property storage property = properties[productId];
        require(property.likeCount > 0, "No likes to remove");
        property.likeCount--;

        UserSTR storage user1 = users[msg.sender];
        uint256[] storage likes = user1.likedPropId;

        for (uint256 i = 0; i < likes.length; i++) {
            if (likes[i] == productId) {
                user1.likedPropId[i] = 9999999;
                break;
            }
        }

        emit LikeDeleted(productId, msg.sender);
    }

    function getProductLikes(
        uint256 productId
    ) external view returns (uint256) {
        Property storage property = properties[productId];
        return property.likeCount;
    }
}