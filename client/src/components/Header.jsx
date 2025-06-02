import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import {
  FaBookOpen,
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { FiX } from "react-icons/fi";

export default function Header({
  selectedSidebar,
  onSelectSidebar,
  selectedSubmenu,
  onSelectSubmenu,
}) {
  const navigate = useNavigate(); 

  const [menuOpen, setMenuOpen] = useState(false);
  const [authDropdownOpen, setAuthDropdownOpen] = useState(false);

  const menuItems = [
    {
      title: "Authentication",
      submenu: ["Server Authentication", "Gateway Authentication"],
    },
    { title: "Devices", submenu: [] },
    { title: "Settings", submenu: [] },
  ];

  const handleMenuClick = (title, submenu) => {
    onSelectSidebar(title);
    if (submenu.length) {
      onSelectSubmenu(submenu[0]);
    } else {
      onSelectSubmenu(null);
    }
    setMenuOpen(false);
    if (title !== "Authentication") {
      setAuthDropdownOpen(false);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleAuthDropdown = (e) => {
    e.stopPropagation();
    setAuthDropdownOpen(!authDropdownOpen);
  };

  const handleAuthSubmenuClick = (sub) => {
    onSelectSubmenu(sub);
    setAuthDropdownOpen(false);
  };

  const handleLogout = () => {
    // Optional: Clear auth state or tokens here
    navigate("/"); 
  };

  return (
    <header className="bg-gray-800 text-yellow-200 relative">
      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white text-gray-800 shadow-lg transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <span className="font-bold text-indigo-700">Menu</span>
          <button onClick={toggleMenu} className="text-xl text-gray-600 hover:text-black">
            <FiX />
          </button>
        </div>
        <nav className="flex flex-col gap-2 p-4">
          {menuItems.map(({ title, submenu }) => (
            <div key={title}>
              <button
                onClick={() => handleMenuClick(title, submenu)}
                className={`w-full text-left font-medium px-3 py-2 rounded transition ${
                  selectedSidebar === title
                    ? "bg-black text-white"
                    : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                }`}
              >
                {title}
              </button>
              {selectedSidebar === title && submenu.length > 0 && (
                <div className="ml-4 mt-1 flex flex-col gap-1">
                  {submenu.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => onSelectSubmenu(sub)}
                      className={`text-sm block px-3 py-1 rounded hover:bg-indigo-100 ${
                        selectedSubmenu === sub ? "bg-indigo-200 font-semibold" : "text-indigo-600"
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Desktop Navbar */}
      <nav className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-4">
          <img
            src="/logo1.png"
            alt="Logo"
            className="h-10 w-auto bg-indigo-100 p-1 rounded shadow"
          />
          <div className="hidden md:flex gap-4 ml-6 relative">
            {menuItems.map(({ title, submenu }) => (
              <div key={title} className="relative">
                <button
                  onClick={() => {
                    if (title === "Authentication") {
                      setAuthDropdownOpen(!authDropdownOpen);
                      onSelectSidebar(title);
                    } else {
                      handleMenuClick(title, submenu);
                      setAuthDropdownOpen(false);
                    }
                  }}
                  className={`px-4 py-2 rounded font-medium transition flex items-center gap-1 ${
                    selectedSidebar === title
                      ? "bg-black text-white"
                      : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                  }`}
                >
                  {title}
                  {title === "Authentication" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleAuthDropdown(e);
                        onSelectSidebar(title);
                      }}
                      className="focus:outline-none"
                      aria-label="Toggle Authentication submenu"
                    >
                      {authDropdownOpen ? (
                        <FaChevronUp className="ml-1 text-indigo-500" />
                      ) : (
                        <FaChevronDown className="ml-1 text-indigo-500" />
                      )}
                    </button>
                  )}
                </button>

                {title === "Authentication" && authDropdownOpen && (
                  <div className="absolute top-full mt-1 bg-white border rounded shadow-md z-10 w-max min-w-[160px]">
                    {submenu.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => handleAuthSubmenuClick(sub)}
                        className="block w-full text-left px-4 py-2 text-indigo-700 hover:bg-indigo-100"
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Side Buttons */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-violet-600 text-white rounded-full hover:bg-violet-700">
              <FaUser /> Admin
            </button>
            <button className="flex items-center gap-2 bg-indigo-500 text-white rounded-full px-3 py-2 hover:bg-indigo-600">
              <FaBookOpen /> User Guide
            </button>
            <button
              onClick={handleLogout} 
              className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-full hover:bg-red-700"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
          <button className="text-white text-2xl md:hidden" onClick={toggleMenu}>
            {menuOpen ? <FiX /> : <FaBars />}
          </button>
        </div>
      </nav>
    </header>
  );
}
