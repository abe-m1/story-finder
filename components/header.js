import Link from 'next/link';
import { useUser } from '../lib/hooks';

const Header = () => {
  const user = useUser();

  return (
    <header>
      <nav>
        <ul>
          <li className="logo">
            <Link href="/">
              <a>Home</a>
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
              <li>
                <a href="/api/logout">Logout</a>
              </li>
              <li>{user.name}</li>
              <li>
                <img
                  src={user.image_url}
                  alt="user image"
                  className="profile-pic"
                />
              </li>
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
      `}</style>
    </header>
  );
};

export default Header;
