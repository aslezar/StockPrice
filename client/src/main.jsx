import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { client_id } from '../config';

//CSS
import './global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<GoogleOAuthProvider clientId={client_id}>
				<App />
			</GoogleOAuthProvider>
		</BrowserRouter>
	</React.StrictMode>
);
