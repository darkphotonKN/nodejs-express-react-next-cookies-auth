import Layout from '../components/Layout';

import { getUserProfile, authInitialProps } from '../lib/auth';

export default class Profile extends React.Component {
  state = {
    user: null
  };

  // async componentDidMount() {
  //   // using promise instead
  //   // getUserProfile().then((user) => this.setState({ user })); // gets user profile

  //   // using async-await
  //   const user = await getUserProfile();

  //   this.setState({
  //     user
  //   });
  // }

  render() {
    // const { user } = this.state;
    console.log('Profile Props:', this.props);

    return (
      <Layout {...this.props}>
        <div style={{ textDecoration: 'underline', marginBottom: '40px' }}>
          Profile Details:
        </div>
        {/* Using state */}
        {/* {user ? (
          JSON.stringify(user, null, 2)
        ) : (
          <div>Profile Data Loading...</div>
        )} */}
      </Layout>
    );
  }
}
// passing in "true" for our isProtectedRoute argument
Profile.getInitialProps = authInitialProps(true);
