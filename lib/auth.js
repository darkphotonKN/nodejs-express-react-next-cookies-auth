import axios from 'axios';
import { defaultCipherList } from 'constants';
import Router from 'next/Router';

axios.defaults.withCredentials = true; // tell axios we are passing over cookie data

const WINDOW_USER_SCRIPT_VARIABLE = '__USER__'; // just a unique recognizable property name on the window object

export const loginUser = async (email, password) => {
  const { data } = await axios.post('/api/login', { email, password });

  console.log('Response Data:', data);

  // if we are on client side
  if (typeof window !== 'undefined') {
    // set window variable to our data, or empty object if there is no data
    window[WINDOW_USER_SCRIPT_VARIABLE] = data || {};
  }
};

export const getUserProfile = async () => {
  const { data } = await axios.get('/api/profile');

  return data;
};

// acquiring token SERVER-SIDE
export const getServerSideToken = (req) => {
  if (!req) {
    // if there is no ctx.req, just return
    console.log('NO CTX.REQ');
    return {};
  }

  let { signedCookies = {} } = req;
  console.log('CTX.REQ PRESENT');

  // if (signedCookies) {
  //   return {};
  // } else if (!signedCookies.token) {
  //   return {};
  // }

  console.log('REQ COOKIES:', req.signedCookies);
  // }
  console.log('REQ SIGNED COOKIES:', signedCookies);

  return { user: signedCookies.token };
};

// acquiring token CLIENT SIDE
export const getClientSideToken = () => {
  // if there is a window object, acquire the __USER__ var we had set
  if (typeof window !== 'undefined') {
    const user = window[WINDOW_USER_SCRIPT_VARIABLE] || {}; // default to empty object
    return { user };
  }

  return { user: {} };
};

export const getUserScript = (user) => {
  return `${WINDOW_USER_SCRIPT_VARIABLE} = ${JSON.stringify(user)};`;
};

export const authInitialProps = (isProtectedRoute) => (ctx) => {
  // is this request coming from the server, or the client?
  // first time the request will come from the server, so
  // we run the getServerSideToken to get the token
  const auth = ctx.req ? getServerSideToken(ctx.req) : getClientSideToken();
  // return an object with auth property as the token

  console.log('ctx.req:', ctx.req);

  console.log('getServerSideToken(ctx.req):', getServerSideToken(ctx.req));
  console.log('getClientSideToken():', getClientSideToken());

  console.log('returning { auth }:', auth);

  // check current path of user is not already at the login page
  const currentPath = ctx.req ? ctx.req.url : window.location.pathname; // get url from request if there is one, else just from window.location

  const user = auth.user; // user object inside auth object
  const isAnonymous = !user || user.type !== 'authenticated'; // check if user is not authenticated

  // if argument "isProtectedRoute" is passed, check also for isAnonymous and currentPath
  if (isProtectedRoute && isAnonymous && currentPath !== '/login') {
    return redirectUser(ctx.res, '/login');
  }

  return { auth: auth };
};

// redirecting user
const redirectUser = (res, path) => {
  // if there is a response, redirect via server
  if (res) {
    res.redirect(302, path); // 302 temporary redirect to the path provided
    res.finished = true; // telling next we are done with the response / request lifecycle and stop writing
    return {}; // getInitialProps needs to return something
  }

  // redirect on the client side
  Router.replace(path);
  return {}; // getInitialProps needs to return something
};

// logs out user
export const logoutUser = async () => {
  // clean out data we have on the window
  if (typeof window !== 'undefined') {
    window[WINDOW_USER_SCRIPT_VARIABLE] = {};
  }

  await axios.post('/api/logout');
  Router.push('/login');
};
