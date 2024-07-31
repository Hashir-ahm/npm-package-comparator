import React from 'react';
import './navbar.css';
import { HomeFilled} from '@ant-design/icons';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
        <HomeFilled />  
        <h2 className="nav-heading">NPM Package Comparator</h2>
        <p className="nav-paragraph">Compare & Recommend The Best NPM Package</p>
    </nav>
  );
}

export default Navbar;
