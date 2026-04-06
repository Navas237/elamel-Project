import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { IoBagOutline, IoSearchOutline, IoHomeOutline, IoBookSharp } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";
import { IoIosMenu } from "react-icons/io";
import { MdContactPhone } from "react-icons/md";
import { FaWhatsapp, FaFacebook } from "react-icons/fa6";
import { AiOutlineProduct } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supbasecontext } from '../../../context/SupbaseContext';
import { cartcontext } from '../../../context/CartCotext';
import logo from '../../../images/Logo.png';
import './Navpar.css';
import { useLocation } from "react-router-dom";
import { normalizeArabic } from '../../../utiles/arabicNormalization';


function Navpar() {
  const [menustat, setmenustat] = useState(false);
  const [serchstat, setserchstat] = useState(false);
  const { cartIds } = useContext(cartcontext);
  const [serchKey, setserchKey] = useState("");
  const { prodectsSerch, serchplayprodect } = useContext(supbasecontext);

  const inputRef = useRef();
  const dropMenu = useRef();

  const cartLength = () => Object.keys(cartIds).length;

  const filterProducts = useMemo(() => {
    if (!serchKey.trim()) return [];

    // Normalize search key
    const normalizedSearch = normalizeArabic(serchKey);
    const searchTerms = normalizedSearch.split(' ').filter(term => term !== '');

    return prodectsSerch.filter(item => {
      // Normalize product data
      const combinedString = normalizeArabic(`${item.name || ''} ${item.level || ''} ${item.company || ''}`);
      return searchTerms.every(term => combinedString.includes(term) && item.stuts == "نزل");
    });
  }, [prodectsSerch, serchKey]);

  useEffect(() => {
    function handleClickOutSide(event) {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setserchstat(false);
        setserchKey('');
      }
    }
    document.addEventListener("mousedown", handleClickOutSide);
    return () => document.removeEventListener("mousedown", handleClickOutSide);
  }, []);

  useEffect(() => {
    function handleDropMenuOpen(event) {
      if (dropMenu.current && !dropMenu.current.contains(event.target)) {
        setmenustat(false);
      }
    }
    document.addEventListener("mousedown", handleDropMenuOpen);
    return () => document.removeEventListener("mousedown", handleDropMenuOpen);
  }, []);

  useEffect(() => {
    serchplayprodect();
  }, []);

  const navLinks = [
    { name: 'تواصل معنا', path: '#contact', icon: <MdContactPhone /> },
    { name: 'الكتب', path: '/#books', icon: <IoBookSharp /> },
    { name: 'الرئيسية', path: '/', icon: <IoHomeOutline /> },
  ];

  const mobileMenuLinks = [
    { name: 'الرئيسية', path: '/', icon: <IoHomeOutline /> },
    // { name: 'الكتب', path: '/#books', icon: <IoBookSharp /> },
    { name: 'طلباتي', path: '/myorder', icon: <AiOutlineProduct /> },
    { name: 'واتساب', path: 'https://api.whatsapp.com/send?phone=201069571111', icon: <FaWhatsapp />, external: true },
    { name: 'فيسبوك', path: 'https://www.facebook.com/Amaleducationalstore?locale=ar_AR', icon: <FaFacebook />, external: true },
  ];

  const location = useLocation();
  const handleHomeClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      const homeSection = document.getElementById("home");
      if (homeSection) {
        homeSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  return (
    <>
      {/* Main Navbar */}
      <nav className="bg-gradient-to-r from-[#2d839b] via-[#2a7a90] to-[#2d839b] shadow-lg shadow-b-0 fixed top-0 left-0 w-full z-50">
        <div className=" w-full mx-auto px-6   py-2 flex !justify-between items-center">

          {/* Left Section - Cart & Search */}
          <div className="flex  items-center gap-4">


            {/* Search */}
            <div className="relative" ref={inputRef}>
              {!serchstat ? (
                <button
                  onClick={() => setserchstat(true)}
                  className="text-white text-3xl md:text-4xl hover:text-yellow-300 transition-colors duration-300"
                >
                  <IoSearchOutline />
                </button>
              ) : (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 'auto', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="flex items-center"
                >
                  <input
                    type="text"
                    placeholder="ابحث عن كتاب..."
                    value={serchKey}
                    onChange={(e) => setserchKey(e.target.value)}
                    className="w-48 md:w-64 px-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 shadow-lg"
                    autoFocus
                  />
                </motion.div>
              )}

              {/* Search Results Dropdown */}
              <AnimatePresence>
                {serchKey && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-72 max-h-80 overflow-y-auto bg-white rounded-xl shadow-2xl z-50"
                  >
                    {filterProducts.length > 0 ? (
                      filterProducts.map((value, index) => (
                        <Link
                          to={`/singleprodeuct/${value.id}`}
                          key={index}
                          onClick={() => {
                            setserchstat(false);
                            setserchKey('');
                          }}
                          className="block p-3 border-b border-gray-100 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all duration-200"
                        >
                          <p className="text-gray-800 font-semibold text-sm text-right">{`${value.company} ${value.name}`}</p>
                          {/* <p className="text-gray-500 text-xs text-right">{value.level}</p> */}
                        </Link>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm text-center p-4">لا توجد نتائج</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Center - Logo */}
          <a href="#home" className="md:ms-40 md:flex  items-center gap-2">
            <img src={logo} alt="مكتبة الأمل" className="w-12 h-10 md:w-12 h-11 md:w-16 md:h-16 hover:scale-110 transition-transform duration-300" />
            <span className="text-white hidden md:flex font-bold text-xl ">مكتبة الأمل</span>
          </a>

          {/* Right Section - Desktop Nav */}
          <div className="hidden sm:flex items-center gap-6  ">



            <Link
              // key={index}
              to={"/myorder"}
              className="flex items-center gap-2 text-white text-lg md:text-xl font-semibold hover:text-yellow-300 transition-colors duration-300"
            >
              <span className="text-2xl">{<AiOutlineProduct />}</span>
              <span>{'طلباتي'}</span>
            </Link>

            <div className='flex gap-2 flex-row items-center  text-white text-lg md:text-xl font-semibold hover:text-yellow-300 transition-colors duration-300'>

              <span> <IoBookSharp /> </span>
              <a href="#contact" className='inline-block' >تواصل معنا   </a>
            </div>

            <Link
              to={location.pathname === "/" ? "#home" : "/#home"}
              onClick={handleHomeClick}
              className="flex items-center gap-2 text-white text-lg md:text-xl font-semibold hover:text-yellow-300 transition-colors duration-300"
            >
              <span className="text-2xl">{navLinks[2].icon}</span>
              <span>{navLinks[2].name}</span>
            </Link>



            {/* {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="flex items-center gap-2 text-white text-lg md:text-xl font-semibold hover:text-yellow-300 transition-colors duration-300"
              >
                <span className="text-2xl">{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            ))} */}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setmenustat(!menustat)}
            className="sm:hidden text-white text-4xl hover:text-yellow-300 transition-colors duration-300"
          >
            <IoIosMenu />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menustat && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setmenustat(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Menu Panel */}
            <motion.div
              ref={dropMenu}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-80 h-full bg-gradient-to-b from-[#1b4265] to-[#0f2942] shadow-2xl z-50 overflow-y-auto"
            >
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-white/10">
                <button
                  onClick={() => setmenustat(false)}
                  className="text-white text-4xl hover:text-red-400 transition-colors duration-300"
                >
                  <IoMdCloseCircle />
                </button>
                <img src={logo} alt="Logo" className="w-16 h-16" />
              </div>

              {/* Menu Items */}
              <ul className="p-6 space-y-4">
                {mobileMenuLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {link.external ? (
                      <a
                        href={link.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setmenustat(false)}
                        className="flex items-center justify-end gap-3 text-white text-xl font-semibold hover:text-yellow-300 transition-colors duration-300 p-3 rounded-lg hover:bg-white/10"
                      >
                        <span>{link.name}</span>
                        <span className="text-2xl">{link.icon}</span>
                      </a>
                    ) : (
                      <Link
                        to={link.path}
                        onClick={() => setmenustat(false)}
                        className="flex items-center justify-end gap-3 text-white text-xl font-semibold hover:text-yellow-300 transition-colors duration-300 p-3 rounded-lg hover:bg-white/10"
                      >
                        <span>{link.name}</span>
                        <span className="text-2xl">{link.icon}</span>
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>

              {/* Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-white/5 backdrop-blur-sm">
                <p className="text-white text-center text-sm">
                  مكتبة الأمل دائماً في خدمتكم ❤️
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>


      {/* Spacer for fixed navbar */}
      <div className="h-20"></div>
    </>
  );
}

export default Navpar;