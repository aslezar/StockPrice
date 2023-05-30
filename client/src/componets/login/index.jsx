import { Link, useNavigate } from 'react-router-dom';
import LoginStyles from './Login.module.css';
import { useGoogleLogin } from '@react-oauth/google';
import * as api from '../../api/index.js';
import { useState } from 'react';

const Login = ({ setUser }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	function handleSubmit(e) {
		e.preventDefault();
		if (email !== '' && password !== '') {
			const signin = async (userData) => {
				try {
					const { data } = await api.signIn(userData);

					setUser(data);
					console.log(data);
					navigate('/');
				} catch (err) {
					console.log(err);
				}
			};
			signin({ email, password });
		}
	}

	const navigate = useNavigate();

	function handleGoogleLoginSuccess(tokenResponse) {
		const accessToken = tokenResponse.access_token;

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

		signinGoogle(accessToken);
	}
	const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });

	return (
		<div className={LoginStyles.loginContainer}>
			<div className={LoginStyles.loginContainerv2}>
				<h1>Welcome Back</h1>
				<div className={LoginStyles.inputContainer}>
					<label>EMAIL</label>
					<input
						onChange={(e) => setEmail(e.target.value)}
						placeholder='Enter your email'
						type='email'
						value={email}
					/>
				</div>

				<div className={LoginStyles.inputContainer}>
					<label>PASSWORD</label>
					<input
						onChange={(e) => setPassword(e.target.value)}
						placeholder='Enter your password'
						type='password'
						value={password}
					/>
				</div>

				<div className={LoginStyles.forgetmeContainer}>
					<div>
						{/* to be implemented */}
						Remember Me <input type='checkbox' />
					</div>
					<div>
						{/* to be implemented */}
						{/* <Link to='/account/forgotpassowrd'>Forgot password?</Link> */}
					</div>
				</div>

				<button
					onClick={handleSubmit}
					className={LoginStyles.loginBTN}>
					LOGIN
				</button>
				<span className={LoginStyles.or}>or</span>
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
