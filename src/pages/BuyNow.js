import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductsData from '../components/Products';
import addIcon from '../assets/add.svg'; // Path to add icon
import dashIcon from '../assets/dash.svg'; // Path to dash icon
import backArrow from '../assets/back-arrow.svg'; // Path to back arrow icon

const BuyNow = () => {
  const { productId } = useParams();
  const product = ProductsData.find(p => p.id === productId);
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(product ? product.companyLogo : '');
  const [quantity, setQuantity] = useState(1);

  // Handle case where product is not found
  if (!product) {
    return <div className="container mx-auto px-4 py-8">Product not found.</div>;
  }

  const handleQuantityChange = (value) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + value));
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleBackClick = () => {
    navigate('/products');
  };

  return (
    <div className="container mx-auto bg-white px-4 py-8">
      {/* Back Button */}
      <button 
        onClick={handleBackClick}
        className="absolute top-[110px] left-8 flex items-center bg-white p-2 rounded-lg shadow-md"
      >
        <img src={backArrow} alt="Back" className="w-6 h-6" />
        <span className="ml-2 text-lg font-semibold">Back</span>
      </button>

      <div className="flex flex-col mt-5 md:flex-row">
        {/* Image Thumbnails */}
        <div className="flex flex-col items-center md:mr-6">
          <div className="space-y-4 ml-[90px] mt-8">
            {/* Small Image 1 */}
            <div
              className={`w-20 h-20 p-1 rounded-lg ml-[80px] cursor-pointer border ${selectedImage === product.companyLogo ? 'border-[#ff0909] border-500' : 'opacity-50'}`}
              onClick={() => handleImageClick(product.companyLogo)}
            >
              <img
                src={product.companyLogo}
                alt="Thumbnail 1"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            {/* Small Image 2 */}
            <div
              className={`w-20 h-20 p-1 rounded-lg ml-[80px] cursor-pointer border ${selectedImage === 'https://www.shutterstock.com/image-photo/long-rice-burlap-sack-ears-600nw-1751879540.jpg' ? 'border-[#ff0909] border-500' : 'opacity-50'}`}
              onClick={() => handleImageClick('https://www.shutterstock.com/image-photo/long-rice-burlap-sack-ears-600nw-1751879540.jpg')}
            >
              <img
                src="https://www.shutterstock.com/image-photo/long-rice-burlap-sack-ears-600nw-1751879540.jpg"
                alt="Thumbnail 2"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            {/* Small Image 3 */}
            <div
              className={`w-20 h-20 p-1 rounded-lg ml-[80px] cursor-pointer border ${selectedImage === 'https://nairametrics.com/wp-content/uploads/2024/04/bag-of-rice.jpg' ? 'border-[#ff0909] border-500' : 'opacity-50'}`}
              onClick={() => handleImageClick('https://nairametrics.com/wp-content/uploads/2024/04/bag-of-rice.jpg')}
            >
              <img
                src="https://nairametrics.com/wp-content/uploads/2024/04/bag-of-rice.jpg"
                alt="Thumbnail 3"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Main Image with Border Div Card */}
        <div className="relative flex-1 mb-[100px]">
          <div className="absolute inset-0 flex justify-center items-center z-10">
            <div className="w-[320px] h-[300px] p-1 rounded-lg border-[#ff0909] border-2">
              <img
                src={selectedImage}
                alt="Main"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 ml-[20px] mt-[50px]">
          <h1 className="text-2xl font-bold mb-4">{product.jobTitle}</h1>
          <p className="text-gray-600 mb-2">{product.companyName}</p>
          <p className="text-gray-800 mb-4">Rate: {product.rate}</p>
          <p className="text-gray-500 mb-6">{product.productDescription}</p>
          <p className="text-gray-800 mb-6">Duration: {product.duration}</p>
          
          <div className="flex items-center mb-4">
            <label htmlFor="quantity" className="mr-4">Choose Quantity:</label>
            <button onClick={() => handleQuantityChange(-1)} className="bg-gray-300 rounded-md p-2">
              <img src={dashIcon} alt="Decrease Quantity" width={15} height={15}/>
            </button>
            <input
              type="text"
              id="quantity"
              value={quantity}
              readOnly
              className="text-center bg-white mb-2 w-12 border-0 mx-2 rounded-md p-2"
            />
            <button onClick={() => handleQuantityChange(1)} className="bg-gray-300 rounded-md p-2">
              <img src={addIcon} alt="Increase Quantity" width={15} height={15}/>
            </button>
          </div>
          
          <button className="bg-green-500 text-white mb-[100px] px-6 py-2 rounded-md">
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyNow;
