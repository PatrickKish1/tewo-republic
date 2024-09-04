import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import searchIcon from '../assets/search.svg';
import downArrowIcon from '../assets/arrow-down.svg';
import backArrowIcon from '../assets/back-arrow.svg';
import forwardArrowIcon from '../assets/forward-arrow.svg';
import bgHexagon from '../assets/bitmapGrey 2.png';
import bgHexagon1 from '../assets/bitmapGrey 1.png';
import briefcaseIcon from '../assets/briefcase.svg';
import profileFillIcon from '../assets/profile-fill.svg';
import calendarIcon from '../assets/calender.svg';
import moneyIcon from '../assets/money.svg';
import ProductsData from '../components/Products';

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  const filteredproducts = ProductsData
    .filter(product => {
      const searchMatch = product.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
      const filterMatch = filter === 'All' || product.type === filter;
      return searchMatch && filterMatch;
    })
    .slice(0, 16);

  return (
    <div className="flex flex-col bg-white overflow-x-hidden min-h-screen">
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8 relative">
          <div className="absolute top-10 right-[-10px] -z-1">
            <img src={bgHexagon} alt="Background Hexagon" width={280} height={280} />
          </div>
          <div className="absolute bottom-0 left-[-5px] -z-1">
            <img src={bgHexagon1} alt="Background Hexagon" width={280} height={280} />
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <div className="relative ml-[60px]">
              <input
                type="text"
                placeholder="Search here..."
                className="pl-10 pr-4 py-2 border rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <img
                src={searchIcon}
                alt="Search"
                width={20}
                height={20}
                className="absolute right-3 top-[25px] transform -translate-y-1/2"
              />
            </div>
            <div className="relative mr-[60px]">
              <select
                className="appearance-none border rounded-md px-4 py-2 pr-8"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option>All</option>
                <option>Fresh</option>
                <option>On Market</option>
              </select>
              <img
                src={downArrowIcon}
                alt="Down Arrow"
                width={12}
                height={12}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 mr-[5px] ml-[10px] gap-6">
            {filteredproducts.map(product => (
              <div key={product.id} className="relative w-[230px] h-[300px] bg-white rounded-lg shadow-md p-3 flex flex-col justify-between">
                <div className="flex items-center mb-2">
                  <div className="w-[80px] h-[80px] relative mr-3 mt-[30px]">
                    <img src={product.companyLogo} alt="Company Logo" className="w-full h-full object-cover rounded-full border border-gray-200" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2lg mt-5 font-bold">{product.jobTitle}</h2>
                    <p className="text-gray-600">{product.companyName}</p>
                  </div>
                </div>

                <div className="flex flex-col text-gray-500 text-sm mb-2">
                  <div className="flex items-center mb-3">
                    <img src={briefcaseIcon} alt="Briefcase Icon" width={14} height={14} className="mr-1" />
                    <span>{product.companyName}</span>
                  </div>
                  <div className="flex items-center mb-3">
                    <img src={calendarIcon} alt="Calendar Icon" width={14} height={14} className="mr-1" />
                    <span>{product.duration}</span>
                  </div>
                  <div className="flex items-center mr-2">
                    <img src={moneyIcon} alt="Rate" style={{ width: '14px', height: '14px' }} className="mr-1" />
                    <span>{product.rate}</span>
                  </div>
                  <div className="flex items-center mt-[-18px] ml-[120px]">
                    <img src={profileFillIcon} alt="Rate" style={{ width: '14px', height: '14px' }} className="mr-1" />
                    <span>{product.quantity}</span>
                  </div>
                </div>
                
                <button 
                  className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm self-center"
                  onClick={() => navigate(`/details/${product.id}`)}>
                  Buy Now
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center mt-10 mb-[150px]">
            <button className="mx-2 px-4 py-2 bg-green-500 text-white rounded-md flex items-center">
              <img src={backArrowIcon} alt="Back" width={25} height={25} className="mr-1" />
              Back
            </button>
            <div className="flex space-x-2 mx-4">
              <button className="px-3 py-1 border-0 rounded bg-green-500 text-white">1</button>
              <button className="px-3 py-1 border-0 rounded">2</button>
            </div>
            <button className="mx-2 px-4 py-2 bg-green-500 text-white rounded-md flex items-center">
              Next
              <img src={forwardArrowIcon} alt="Forward" width={25} height={25} className="ml-1" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductsPage;
