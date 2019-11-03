import LoginForm from '../components/LoginForm';
import Layout from '../components/Layout';

import { authInitialProps } from '../lib/auth';

export default function Login(props) {
  console.log('Login Props:', props);

  return (
    <Layout {...props}>
      <section className="login-page">
        <LoginForm />

        <style jsx>{`
          .login-page {
            position: relative;
            height: 100vh;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}</style>
      </section>
    </Layout>
  );
}

Login.getInitialProps = authInitialProps();
