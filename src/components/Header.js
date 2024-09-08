import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import tewoLogo from '../assets/tewo-logo.png';
import walletIcon from '../assets/wallet.svg';
import notificationIcon from '../assets/notification.svg';
import Notification from './Notification';
import EnsLoginButton from './EnsButton';
import { useWallet } from '../context/Context';

const Header = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddresses, setWalletAddresses] = useState([]);
  const [activeWallet, setActiveWallet] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '' });
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { ensName, connectENS, connectWallet, account } = useWallet();

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
        const accounts = await connectWallet()
        setIsWalletConnected(true);
        setWalletAddresses(account);
        setActiveWallet(account);
        localStorage.setItem('activeWallet', account);
        localStorage.setItem('isWalletConnected', 'true');
        setNotification({ show: true, message: 'Wallet connected!' });
      } catch (error) {
        console.trace(error)
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
    localStorage.removeItem('activeWallet');
    localStorage.setItem('isWalletConnected', 'false');
    setNotification({ show: true, message: 'Wallet disconnected!' });
    navigate('/');
  
    window.location.reload();
  };

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

  const userConnected = isWalletConnected || !!ensName;

  return (
    <header className="flex items-center justify-between p-5 bg-white border-b border-gray-200 relative">
      <div className="flex items-center">
        <Link to="/">
          <img src={tewoLogo} alt="EquiBloc Logo" height={40} width={160} />
        </Link>
      </div>
      
      <nav className="flex-1 flex ml-[120px] justify-center space-x-6">
        <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
        <button onClick={() => navigate('/products')} className="text-gray-700 hover:text-gray-900">
          Products
        </button>
        <Link to="#about" className="text-gray-700 hover:text-gray-900">About</Link>
      </nav>
      
      <div className="flex items-center space-x-4">
        {userConnected && (
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

        <div className="relative flex space-x-4">
          {!userConnected && (
            <>
              {/* Ens login button */}
              <EnsLoginButton 
                isWalletConnected={isWalletConnected}
                connectENS={connectENS}
                walletIcon={walletIcon}
              />
              <button
                onClick={handleWalletConnection}
                className="bg-[#d6ce93] text-white px-5 py-2.5 rounded font-bold flex items-center"
              >
                <img src={walletIcon} alt="Wallet Icon" className="w-4 h-4 mr-2" />
                Connect Wallet
              </button>
            </>
          )}

          {userConnected && (
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="bg-[#d6ce93] text-white px-5 py-2.5 rounded font-bold flex items-center"
            >
              <img src={walletIcon} alt="Wallet Icon" className="w-4 h-4 mr-2" />
              {/* Display ENS name if available, otherwise show the truncated wallet address */}
              {ensName ? ensName : account.slice(0, 6) + '...' + account.slice(-4)}
            </button>
          )}

          {userConnected && showDropdown && (
            <div ref={dropdownRef} className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg z-20">
              <button
                onClick={handleWalletDisconnection}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
              >
                Disconnect
              </button>
            </div>
          )}
        </div>
      </div>

      <Notification
        message={notification.message}
        show={notification.show}
        onClose={() => setNotification({ ...notification, show: false })}
      />
    </header>
  );
};

export default Header;
