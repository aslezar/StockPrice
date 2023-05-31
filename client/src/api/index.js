import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });
// const API = axios.create({ baseURL: 'http://stockprice-eh6m.onrender.com' });

API.interceptors.request.use((req) => {
	if (
		localStorage.getItem('user_info') &&
		JSON.parse(localStorage.getItem('user_info')) !== null
	) {
		req.headers.Authorization = `Bearer ${
			JSON.parse(localStorage.getItem('user_info')).token
		}`;
	}

	return req;
});

export const signIn = (data) => API.post('/users/signin', data);
export const signUp = (data) => API.post('/users/signup', data);

export const signInGoogle = (accessToken) =>
	API.post('/users/signin', {
		googleAccessToken: accessToken,
	});

export const signUpGoogle = (accessToken) =>
	API.post('/users/signup', {
		googleAccessToken: accessToken,
	});

export const stock_data = async (list) => {
	const response = await axios.request({
		method: 'GET',
		url: 'https://latest-stock-price.p.rapidapi.com/any',
		headers: {
			'X-RapidAPI-Key': 'cd04dd6e07msha571732ea90c040p1f99a2jsn7500a0100515',
			'X-RapidAPI-Host': 'latest-stock-price.p.rapidapi.com',
		},
	});
	const data = response.data.slice(0, list);
	console.log(data);
	return data;
};
