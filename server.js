const next = require('next');
const express = require('express');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3002;
const app = next({ dev });
const handle = app.getRequestHandler();

const AUTH_USER_TYPE = 'authenticated';
const COOKIE_SECRET = '1asdj1290'; // usually best to keep this in environment variables
const COOKIE_OPTIONS = {
  // domain: "", // only valid in this domain
  httpOnly: true, // cannot be accessed by js
  secure: !dev, // not https is dev but in production
  signed: true // verifies the sourrsce of the cookie
};

const authenticate = async (email, password) => {
  let response;
  try {
    response = await axios.get('https://jsonplaceholder.typicode.com/users');
  } catch (err) {
    console.log('Authenticate Fetch user Error:', err);
  }

  // console.log('Data Was:', data);
  console.log('Email:', email);
  console.log('Password:', password);

  return response.data.find(
    (user) => user.email === email && user.website === password
  );
};

app.prepare().then(() => {
  const server = express();

  server.use(cors());

  server.use(express.json());

  server.use(cookieParser(COOKIE_SECRET));

  server.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    // find user based on login details
    const user = await authenticate(email, password); // authenticated with custom authenticate function

    // no user found
    if (!user) {
      return res.status(403).send('Invalid email or password');
    }

    const userData = {
      name: user.name,
      email: user.email,
      type: AUTH_USER_TYPE
    };

    // create a cookie( name, data, optionalOptions )
    res.cookie('token', userData, COOKIE_OPTIONS);

    res.json(userData);
  });

  server.get('/api/profile', async (req, res) => {
    // if no signed cookies we default it to an empty object
    const { signedCookies = {} } = req;
    const { token } = signedCookies;

    // if we have a token and there's an email property on that token
    if (token && token.email) {
      const { data } = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
      );

      const userProfile = data.find((user) => user.email === token.email);

      // important to return to stop the function here if user found
      return res.json({
        user: userProfile
      });
    }
    res.sendStatus(404); // error in getting user profile
  });

  server.post('/api/logout', (req, res) => {
    res.clearCookie('token', COOKIE_OPTIONS); // clear the cookies on log out
    res.sendStatus(204);
  });

  server.get('*', (req, res) => {
    handle(req, res); // let next handle our request and response
  });

  server.listen(port, () => console.log(`Listening on port ${port}`));
});
