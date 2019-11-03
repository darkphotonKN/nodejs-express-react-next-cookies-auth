import Link from 'next/link';

import { logoutUser } from '../../lib/auth';

// import withLogin from '../HOC/withLogin';

class Layout extends React.Component {
  render() {
    const { children, data, auth } = this.props;

    // instead of auth && auth.user && auth.user.email
    // checking auth is there before destructuring, else deaful to empty object
    // if it exists we are destructuring from auth, but if 'user' is not present
    // default the destructure to an empty object
    const { user = {} } = auth || {};

    console.log('Props:', this.props);

    return (
      <div className="app">
        <div className="navbar">
          <span>
            {user ? (
              <span className="user">{user.name}</span>
            ) : (
              <span className="not-logged-in">not logged in</span>
            )}
          </span>

          <Link href="/">
            <a>Home</a>
          </Link>

          {user.email ? (
            // authorized
            <>
              <Link href="/profile">
                <a>Profile</a>
              </Link>

              <a href="javascript:;" onClick={logoutUser}>
                Logout
              </a>
            </>
          ) : (
            // unauthorized
            <Link href="/login">
              <a>Login</a>
            </Link>
          )}
        </div>
        <div className="main-content">{children}</div>
        <style jsx global>
          {`
            @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

            * {
              box-sizing: border-box;
              margin: 0;
              padding: 0;
            }

            body {
              font-family: 'Roboto';
              background-color: #323c4b;
            }

            .app {
              margin: 20px;
            }

            a {
              color: #ddd;
              text-decoration: none;
              transition: color 200ms ease-in-out;
            }

            a:hover {
              color: rgb(255, 211, 153);
            }

            .main-content {
              color: #ddd;
              font-size: 14px;
              padding: 30px;
            }

            .navbar {
              text-align: right;
            }

            .navbar span {
              font-size: 15px;
              color: #ddd;
              margin-right: 5px;
            }

            .navbar span.user {
              color: rgb(255, 211, 153);
              margin-right: 20px;
            }

            .navbar a {
              font-size: 15px;
              margin: 0 12px;
              color: #ddd;
              transition: color 200ms ease-in;
              text-decoration: none;
            }

            .navbar a:hover {
              color: rgb(255, 211, 153);
            }

            .navbar .not-logged-in {
              color: #55b1ee;
            }
          `}
        </style>
      </div>
    );
  }
}

// export default withLogin(Layout);
export default Layout;
