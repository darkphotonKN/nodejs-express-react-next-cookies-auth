import Layout from '../components/Layout';
import withFetchedUsers from '../components/HOC/withFetchedUsers';

const Users = (props) => {
  const { data } = props;
  console.log('Data:', data);
  console.log('PROPS:', props);
  return <Layout>Test</Layout>;
};

export default withFetchedUsers(Users, 'posts');
