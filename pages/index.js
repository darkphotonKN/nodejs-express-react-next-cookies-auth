import Layout from '../components/Layout';
import Link from 'next/link';

import { authInitialProps } from '../lib/auth';

const Index = (props) => {
  console.log('Index Props:', props);

  return (
    <Layout {...props}>
      <Link href="/profile">
        <a>Go to profile</a>
      </Link>
    </Layout>
  );
};

// using getInitialProps without using a class
Index.getInitialProps = authInitialProps();

export default Index;
