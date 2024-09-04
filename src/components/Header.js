import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import tewoLogo from '../assets/tewo-logo.png';
import walletIcon from '../assets/wallet.svg';
import notificationIcon from '../assets/notification.svg';
import Notification from './Notification';

const Header = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddresses, setWalletAddresses] = useState([]);
  const [activeWallet, setActiveWallet] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '' });
  const dropdownRef = useRef(null);
  const navigate = useNavigate();


  // Check for existing wallet connection state on component mount
  useEffect(() => {
    const loadWallet = async () => {
      const storedWallet = localStorage.getItem('activeWallet');
      const walletConnected = localStorage.getItem('isWalletConnected') === 'true';

      if (window.ethereum && walletConnected && storedWallet) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.includes(storedWallet)) {
          setIsWalletConnected(true);
          setWalletAddresses(accounts);
          setActiveWallet(storedWallet);
        }
      }
    };

    loadWallet();
  }, []);

  const handleWalletConnection = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setIsWalletConnected(true);
        setWalletAddresses(accounts);
        setActiveWallet(accounts.length > 1 ? '' : accounts[0]); // Set active wallet if only one
        localStorage.setItem('activeWallet', accounts.length > 1 ? '' : accounts[0]); // Save to local storage
        localStorage.setItem('isWalletConnected', 'true'); // Mark wallet as connected
        setNotification({ show: true, message: 'Wallet connected!' });
      } catch (error) {
        setNotification({ show: true, message: 'Failed to connect wallet.' });
      }
    } else {
      setNotification({ show: true, message: 'MetaMask is not installed. Please install it to connect your wallet.' });
    }
  };

  const handleWalletDisconnection = () => {
    setIsWalletConnected(false);
    setWalletAddresses([]);
    setActiveWallet('');
    setShowDropdown(false);
    localStorage.removeItem('activeWallet'); // Remove from local storage
    localStorage.setItem('isWalletConnected', 'false'); // Mark wallet as disconnected
    setNotification({ show: true, message: 'Wallet disconnected!' });
    navigate('/'); // Redirect to home page
  };

  const handleWalletSelection = (address) => {
    setActiveWallet(address);
    setNotification({ show: true, message: `Switched to wallet ${address.slice(0, 6)}...${address.slice(-4)}` });
    setShowDropdown(false);
    localStorage.setItem('activeWallet', address); // Save selected wallet to local storage
  };

  const handleJobsNavigation = () => {
    if (isWalletConnected) {
      navigate('/products');
    } else {
      setNotification({ show: true, message: 'Please connect your wallet to access this page.' });
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="flex items-center justify-between p-5 bg-white border-b border-gray-200 relative">
      <div className="flex items-center">
        <Link to="/">
          <img src={tewoLogo} alt="EquiBloc Logo" height={40} width={160} />
        </Link>
      </div>
      
      <nav className="flex-1 flex ml-[120px] justify-center space-x-6">
        <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
        <button onClick={handleJobsNavigation} className="text-gray-700 hover:text-gray-900">
          Products
        </button>
        <Link to="#about" className="text-gray-700 hover:text-gray-900">About</Link>
      </nav>
      
      <div className="flex items-center space-x-4">
        {isWalletConnected && (
          <>
            <img src={notificationIcon} alt="Notifications" className="w-6 h-6 cursor-pointer" />
            <Link to="/creategig" className="border-2 border-[#a3a380] text-[#a3a380] bg-white px-4 py-[7px] rounded font-bold">
              Sell
            </Link>
            <Link to="/products" className="bg-[#d6ce93] text-white px-4 py-2 rounded font-bold">
              Buy
            </Link>
          </>
        )}
        <div className="relative">
          <button
            onClick={() => {
              isWalletConnected ? setShowDropdown(!showDropdown) : handleWalletConnection();
            }}
            className="bg-[#d6ce93] text-white px-5 py-2.5 rounded font-bold flex items-center"
          >
            <img src={walletIcon} alt="Wallet Icon" className="w-4 h-4 mr-2" />
            {isWalletConnected ? (
              <span>{activeWallet.slice(0, 6) + '...' + activeWallet.slice(-4)}</span>
            ) : (
              'Connect Wallet'
            )}
          </button>
          {isWalletConnected && showDropdown && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg z-20"
            >
              {walletAddresses.length > 1 ? (
                walletAddresses.map((address, index) => (
                  <button
                    key={index}
                    onClick={() => handleWalletSelection(address)}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                  >
                    {address.slice(0, 6) + '...' + address.slice(-4)}
                  </button>
                ))
              ) : (
                <button
                  onClick={handleWalletConnection}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                >
                  Connect Wallet
                </button>
              )}
              <button
                onClick={handleWalletDisconnection}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left mt-2"
              >
                Disconnect
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Notification component */}
      <Notification
        message={notification.message}
        show={notification.show}
        onClose={() => setNotification({ ...notification, show: false })}
      />
    </header>
  );
};

export default Header;
