// FixedMenu.jsx
import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Users, // Added Users icon
  BookOpen,
  Repeat, // Added Repeat icon for Transfers
  ChevronRight,
  LogOut,
  PenTool,
  LayoutDashboard,
  ShoppingBag,
  PlusCircle,
} from 'lucide-react';
import './../css/fixedmenu.css';
import { UserContext } from '../context/userContext';


const FixedMenu = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const menuRef = useRef(null);
  const { currentUser } = useContext(UserContext);

  // Handle clicking outside the menu to close any open submenu
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setActiveMenu(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // If there is no logged-in user, do not render the menu
  if (!currentUser) {
    return null;
  }

  // Define menu items after ensuring currentUser exists
  const menuItems = [
    {
      icon: <User className="menu-icon" />,
      label: 'Profile',
      submenu: [
        { icon: <User className="submenu-icon" />, label: 'Profile', link: `/profile/${currentUser.id}` },
        { icon: <LogOut className="submenu-icon" />, label: 'Logout', link: `/logout` },
      ],
    },
    {
      icon: <BookOpen className="menu-icon" />,
      label: 'Blog',
      submenu: [
        { icon: <BookOpen className="submenu-icon" />, label: 'All Posts', link: `/posts` },
        { icon: <Users className="submenu-icon" />, label: 'Authors', link: `/authors` },
        { icon: <PenTool className="submenu-icon" />, label: 'Create', link: `/create` },
        { icon: <LayoutDashboard className="submenu-icon" />, label: 'Dashboard', link: `/myposts/${currentUser.id}` },
      ],
    },
    {
      icon: <Repeat className="menu-icon" />, // Changed from Package to Repeat
      label: 'Transfers',
      submenu: [
        { icon: <ShoppingBag className="submenu-icon" />, label: 'All Transfers', link: `/transfers` },
        { icon: <PlusCircle className="submenu-icon" />, label: 'Create', link: `/transfers/create` },
        { icon: <LayoutDashboard className="submenu-icon" />, label: 'Dashboard', link: `/transfers/dashboard` },
      ],
    },
    {
      icon: <Users className="menu-icon" />, // Changed from Package to Users
      label: 'Players',
      submenu: [
        { icon: <ShoppingBag className="submenu-icon" />, label: 'All Players', link: `/players` },
        { icon: <PlusCircle className="submenu-icon" />, label: 'Create', link: `/players/create` },
        { icon: <LayoutDashboard className="submenu-icon" />, label: 'Dashboard', link: `/players/dashboard` },
      ],
    },
  ];

  // Toggle the active menu
  const handleMenuToggle = (label) => {
    setActiveMenu((prev) => (prev === label ? null : label));
  };

  return (
    <div className="fixed-menu" ref={menuRef}>
      {menuItems.map((item, index) => (
        <div
          className={`menu-item-wrapper ${activeMenu === item.label ? 'active' : ''}`} // Add 'active' class here
          key={index}
        >
          <button
            className={`menu-button ${activeMenu === item.label ? 'active' : ''}`}
            onClick={() => handleMenuToggle(item.label)}
            aria-haspopup="true"
            aria-expanded={activeMenu === item.label}
          >
            {item.icon}
            <span className="menu-label">{item.label}</span>
          </button>
          {activeMenu === item.label && (
            <div className="submenu" role="menu">
              {item.submenu.map((subItem, subIndex) => (
                <Link
                  to={subItem.link}
                  className="submenu-item"
                  key={subIndex}
                  onClick={() => setActiveMenu(null)} // Close submenu after clicking on an item
                  role="menuitem"
                >
                  {subItem.icon}
                  <span className="submenu-label">{subItem.label}</span>
                  <ChevronRight className="submenu-chevron" />
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FixedMenu;
