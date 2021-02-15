import Link from 'next/link';
import React, { useRef } from 'react';
import { useDetectOutsideClick } from '../utils/useDetectOutsideClick';

import { useUser } from '../lib/hooks';

const Header = () => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);
  const user = useUser();

  return (
    <header>
      <nav>
        <ul style={{ margin: '7px' }}>
          <li className="logo">
            <Link href="/">
              <img src="/logo.png" />
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link href="/map">
                  <a>Map</a>
                </Link>
              </li>
              <li>
                <Link href="/tree">
                  <a>Family Tree</a>
                </Link>
              </li>
              <li>
                <Link href="/challenges">
                  <a>Challenges</a>
                </Link>
              </li>
              <div className="menu-container">
                <button onClick={onClick} className="menu-trigger">
                  <span>{user.name}</span>
                  <img
                    src={user.image_url || './default-profile.png'}
                    alt="user image"
                    className="profile-pic"
                  />
                </button>
                <nav
                  ref={dropdownRef}
                  className={`menu ${isActive ? 'active' : 'inactive'}`}
                >
                  <ul>
                    <li>
                      <Link href="/collection">
                        <a href="#">Collection</a>
                      </Link>
                    </li>
                    <li>
                      <a href="/api/logout">Logout</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </>
          ) : (
            <>
              <li>
                <Link href="/about">
                  <a>About</a>
                </Link>
              </li>
              <li>
                <Link href="/login">
                  <a>Login</a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <style jsx>{`
        nav {
          // max-width: 42rem;
          margin: 0 auto;
          padding: 0.2rem 1.25rem;
        }
        ul {
          display: flex;
          list-style: none;
          margin-left: 0;
          padding-left: 0;
          align-items: center;
        }
        li {
          margin-right: 1rem;
        }
        li:first-child {
          // margin-left: auto;
        }
        a {
          color: #fff;
          text-decoration: none;
        }
        header {
          color: #fff;
          background-color: #333;
        }
        .logo {
          color: red;
          margin-right: auto;
        }
        .profile-pic {
          height: 2rem;
          width: 2rem;
          object-fit: center;
          border-radius: 50%;
          border: 2px solid #fff;
        }

        .menu-container {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .menu-trigger {
          background: #ffffff;
          border-radius: 90px;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 4px 6px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
          border: none;
          vertical-align: middle;
          transition: box-shadow 0.4s ease;
          margin-left: auto; /* Strictly for positioning */
        }

        .menu-trigger:hover {
          box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
        }

        .menu-trigger span {
          font-weight: 700;
          vertical-align: middle;
          font-size: 14px;
          margin: 0 10px;
        }

        .menu-trigger img {
          border-radius: 90px;
        }

        .menu {
          background: #ffffff;
          border-radius: 8px;
          position: absolute;
          top: 60px;
          right: 0;
          width: 200px;
          box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
          opacity: 0;
          visibility: hidden;
          transform: translateY(-20px);
          transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
        }

        .menu.active {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .menu ul {
          flex-direction: column;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .menu li:not(:last-child) {
          border-bottom: 1px solid #dddddd;
        }

        .menu li a {
          text-decoration: none;
          color: #333333;
          padding: 15px 20px;
          display: block;
        }
      `}</style>
    </header>
  );
};

export default Header;
