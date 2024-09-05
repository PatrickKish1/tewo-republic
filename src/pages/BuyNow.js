import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import addIcon from '../assets/add.svg'; // Path to add icon
import dashIcon from '../assets/dash.svg'; // Path to dash icon
import backArrow from '../assets/back-arrow.svg'; // Path to back arrow icon
import { useWallet } from '../context/Context';

const BuyNow = () => {
  const { productId } = useParams();
  const [productData, setProductData] = useState([]);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { requestPurchase, getAllProduce, getETHinNaira } = useWallet();

  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Fetch all produce when the component mounts
    const fetchProduce = async () => {
      const products = await getAllProduce();
      setProductData(products);
    };
    
    fetchProduce();
  }, [getAllProduce]);

  useEffect(() => {
    if (productData.length > 0) {
      const foundProduct = productData.find(p => p.produceId === productId);
      setProduct(foundProduct);
      if (foundProduct) {
        setSelectedImage(foundProduct.imageUrl[0]);
      }
    }
  }, [productData, productId]);

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
            {product.imageUrl.map((image, index) => (
              <div
                key={index}
                className={`w-20 h-20 p-1 rounded-lg ml-[80px] cursor-pointer border ${selectedImage === image ? 'border-[#ff0909] border-500' : 'opacity-50'}`}
                onClick={() => handleImageClick(image)}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
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
          <h1 className="text-2xl font-bold mb-4">{product.farmer}</h1>
          <p className="text-gray-600 mb-2">{product.company}</p>
          <p className="text-gray-800 mb-4">Rate: {getETHinNaira(product.price)}</p>
          <p className="text-gray-500 mb-6">{product.description}</p>
          <p className="text-gray-800 mb-6">Duration: {product.duration || "1"}</p>

          <div className="flex items-center mb-4">
            <label htmlFor="quantity" className="mr-4">Choose Quantity:</label>
            <button onClick={() => handleQuantityChange(-1)} className="bg-gray-300 rounded-md p-2">
              <img src={dashIcon} alt="Decrease Quantity" width={15} height={15} />
            </button>
            <input
              type="text"
              id="quantity"
              value={quantity}
              readOnly
              className="text-center bg-white mb-2 w-12 border-0 mx-2 rounded-md p-2"
            />
            <button onClick={() => handleQuantityChange(1)} className="bg-gray-300 rounded-md p-2">
              <img src={addIcon} alt="Increase Quantity" width={15} height={15} />
            </button>
          </div>

          <button className="bg-green-500 text-white mb-[100px] px-6 py-2 rounded-md" onClick={() => requestPurchase(product.produceId, quantity, product.price)}>
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyNow;
