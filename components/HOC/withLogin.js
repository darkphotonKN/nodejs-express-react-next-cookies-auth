import { getUserProfile } from '../../lib/auth';

const withLogin = (WrappedComponent) => {
  return class extends React.Component {
    state = {
      user: null
    };

    async componentDidMount() {
      // using async-await
      try {
        getUserProfile()
          .then((user) => {
            this.setState({
              user
            });
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.log('Error fetching user profile:', err);
      }

      // using promise instead
      // getUserProfile().then((user) => this.setState({ user })); // gets user profile
    }

    render() {
      return <WrappedComponent data={this.state.user} {...this.props} />;
    }
  };
};

export default withLogin;
