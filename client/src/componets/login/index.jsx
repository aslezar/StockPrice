import { Link, useNavigate } from 'react-router-dom';
import LoginStyles from './Login.module.css';
import { useGoogleLogin } from '@react-oauth/google';
import * as api from '../../api/index.js';

const Login = ({ setUser }) => {
	const navigate = useNavigate();

	const signinGoogle = async (accessToken) => {
		try {
			// login user
			const { data } = await api.signInGoogle(accessToken);
			setUser(data);
			console.log(data);
			navigate('/');
		} catch (err) {
			console.log(err);
		}
	};

	function handleGoogleLoginSuccess(tokenResponse) {
		const accessToken = tokenResponse.access_token;
		signinGoogle(accessToken);
	}
	const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });

	return (
		<div className={LoginStyles.loginContainer}>
			<div className={LoginStyles.loginContainerv2}>
				<h1>Welcome Back</h1>
				<button
					onClick={() => login()}
					className={LoginStyles.googleBTN}>
					<i className='fa-brands fa-google'></i> Sign in with google
				</button>

				<span className={LoginStyles.notreg}>
					Not registered yet?{' '}
					<Link
						className={LoginStyles.singupBTN}
						to='/account/signup'>
						Signup
					</Link>
				</span>
			</div>
		</div>
	);
};

export default Login;
