import { loginUser } from '../lib/auth';
import Router from 'next/Router';

class LoginForm extends React.Component {
  state = {
    email: 'Telly.Hoeger@billy.biz',
    password: 'elvis.io',

    // state to handle loading
    isLoading: false
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = async (event) => {
    const { email, password } = this.state;

    event.preventDefault();

    // using await

    // try {
    // need to await to make sure login is done before pushing
    // can use .then() to chain on the returned promise instead
    // await loginUser(email, password);
    // } catch (err) {
    //   console.log(err);
    // }
    console.log('Form submitted with:', this.state);

    this.setState({
      isLoading: true
    });

    // using then
    loginUser(email, password)
      .then(() => {
        this.setState({
          isLoading: false
        });
        // redirect to user profile
        Router.push('/profile');
      })
      .catch((err) => {
        this.showError(err);
        console.log(err);
      });
  };

  showError = (err) => {
    const error = (err.response && err.response.data) || err.message;
    this.setState({
      error,
      isLoading: false
    });
  };

  render() {
    const { email, password, error, isLoading } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="login-form">
        <div className="form-group">
          <div>
            <label htmlFor="email">email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={this.handleChange}
              className="form-inp email"
              value={email}
            />
          </div>
          <div>
            <label htmlFor="password">password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
              className="form-inp password"
              value={password}
            />
          </div>
          {error && (
            <div className="error">Email or password was incorrect.</div>
          )}
          <button
            type="submit"
            className={
              isLoading ? 'btn-form-submit disabled' : 'btn-form-submit'
            }
          >
            login
          </button>
        </div>

        <style jsx>{`
          form {
            width: 680px;
            height: 500px;
            border-radius: 12px;
            background-color: #2b3340;
            box-shadow: #2b3340;
            color: #1a1a1a;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          label {
            margin-bottom: 10px;
            font-size: 18px;
            color: rgb(255, 211, 153);
            text-shadow: rgba(255, 211, 153, 0.6) 0px 0px 100px;
          }

          .form-group {
            display: flex;
            flex-direction: column;
          }

          .form-inp {
            width: 100%;
            height: 24px;
            border-radius: 12px;
            border: 1px solid #1a1a1a;
            padding: 10px;
            margin: 12px 0;
          }

          .form-inp .password,
          .btn-form-submit {
            margin-top: 25px;
          }

          .error {
            margin-top: 40px;
            color: #f4b09f;
          }

          .btn-form-submit {
            border-radius: 12px;
            background-color: rgb(255, 211, 153);
            border: 1px solid #1a1a1a;
            padding: 4px 20px;
            cursor: pointer;
            font-size: 14px;
            transition: all 200ms ease-in-out;
          }

          .btn-form-submit:hover {
            background-color: #aaa;
          }

          .btn-form-submit.disabled {
            pointer-events: none;
            color: #aaa;
            background-color: #ddd;
          }
        `}</style>
      </form>
    );
  }
}

export default LoginForm;
