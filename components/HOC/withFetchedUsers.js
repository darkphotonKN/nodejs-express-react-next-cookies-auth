// Higher Order Component that provides wrapped component with the users list from jsonapi

const withFetchedUsers = (WrappedComponent, type) => {
  return class extends React.Component {
    state = {
      users: null
      // fiveGroupData: null
    };

    async componentDidMount() {
      const usersRes = await fetch(
        `https://jsonplaceholder.typicode.com/${type}`
      );

      const users = await usersRes.json();

      this.setState({
        users
      });
    }

    // showTopUsers = () => {
    //   const users = [...this.state.users];

    //   this.setState({ fiveGroupData: users.splice(0, 5) });
    // };

    render() {
      return <WrappedComponent data={this.state} {...this.props} />;
    }
  };
};

export default withFetchedUsers;
