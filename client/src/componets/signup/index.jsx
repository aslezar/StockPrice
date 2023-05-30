import SignUp from './Signup.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import * as api from '../../api/index.js';

function Signup({ setUser }) {
	const navigate = useNavigate();
	const signupGoogle = async (accessToken) => {
		try {
			// signup user
			const { data } = await api.signUpGoogle(accessToken);
			setUser(data?.data);
			navigate('/');
		} catch (err) {
			console.log(err);
		}
	};

	function handleGoogleLoginSuccess(tokenResponse) {
		const accessToken = tokenResponse.access_token;
		signupGoogle(accessToken);
	}

	const signup = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });
	return (
		<div className={SignUp.loginContainer}>
			<div className={SignUp.loginContainerv2}>
				<h1>Sign Up</h1>
				<button
					onClick={signup}
					className={SignUp.googleBTN}>
					<i className='fa-brands fa-google'></i> Sign up with google
				</button>
				<span className={SignUp.notreg}>
					Already registered{' '}
					<Link
						className={SignUp.singupBTN}
						to='/account/login'>
						Login
					</Link>
				</span>
			</div>
		</div>
	);
}

export default Signup;
