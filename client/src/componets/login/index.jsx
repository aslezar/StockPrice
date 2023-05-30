import { Link, useNavigate } from 'react-router-dom';
import LoginStyles from './Login.module.css';
import { useGoogleLogin } from '@react-oauth/google';
import * as api from '../../api/index.js';
import { useState } from 'react';
import googleBtn from '../../assests/google_signin_buttons/web/vector/btn_google_light_normal_ios.svg';
import { AiOutlineUser, AiOutlineCopy } from 'react-icons/ai';

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

	function copyToClipboard(text) {
		if (window.navigator && window.navigator.clipboard) {
			window.navigator.clipboard
				.writeText(text)
				.then(() => {
					console.log('Text copied to clipboard');
				})
				.catch((error) => {
					console.error('Error copying text to clipboard:', error);
				});
		} else {
			console.error('Clipboard API not supported');
		}
	}

	return (
		<div className={LoginStyles.login}>
			<div className={LoginStyles.dummyLogin}>
				<b>
					<i>For Demo login use -&gt;</i>
				</b>
				<span onClick={() => copyToClipboard('123@abc.com')}>
					Email: 123@abc.com <AiOutlineCopy />
				</span>
				<span onClick={() => copyToClipboard('123456')}>
					Password: 123456 <AiOutlineCopy />
				</span>
			</div>
			<div className={LoginStyles.loginContainer}>
				<div className={LoginStyles.loginContainerv2}>
					<h1>Welcome Back</h1>
					<form onSubmit={handleSubmit}>
						<div className={LoginStyles.inputContainer}>
							<label htmlFor='email'>Email</label>
							<input
								id='email'
								onChange={(e) => setEmail(e.target.value)}
								placeholder='Enter your email'
								type='email'
								value={email}
							/>
						</div>

						<div className={LoginStyles.inputContainer}>
							<label htmlFor='password'>Password</label>
							<input
								id='password'
								onChange={(e) => setPassword(e.target.value)}
								placeholder='Enter your password'
								type='password'
								value={password}
							/>
						</div>

						<div className={LoginStyles.forgetmeContainer}>
							<div>
								<label htmlFor='rememberMe'>Remember Me</label>
								<input
									id='rememberMe'
									type='checkbox'
								/>
							</div>
							<div>
								<a href='/account/forgotpassword'>Forgot password?</a>
							</div>
						</div>

						<button
							type='submit'
							className={LoginStyles.loginBTN}>
							<AiOutlineUser />
							LOGIN
						</button>
					</form>
					<span className={LoginStyles.or}>or</span>
					<button
						className={LoginStyles.googleBTN}
						onClick={login}>
						<img
							src={googleBtn}
							alt='Sign in with google'
						/>
						<span>Sign in with Google</span>
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
		</div>
	);
};

export default Login;
