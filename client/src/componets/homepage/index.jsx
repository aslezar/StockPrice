import { useState, useEffect } from 'react';
import { stock_data } from '../../api/index.js';
import HomeStyle from './Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {
	const [stock, setStock] = useState([]);
	const getStock = async () => {
		try {
			const res = await stock_data();
			setStock(Array.from(res));
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getStock();
	}, []);
	return (
		<div>
			<h1>Stock Price List</h1>
			<div className={HomeStyle.stocks}>
				{stock.map((item) => (
					<Card
						{...item}
						key={item.identifier}
					/>
				))}
			</div>
		</div>
	);
};
function Card({ symbol: name, open: price, pChange: increase }) {
	const [isCopied, setIsCopied] = useState(false);
	const msg = `The stock price of ${name} on the 15th of May is ${price}`;
	const handleEmailClick = () => {
		const subject = 'Stock Price';
		const mailtoLink = `mailto:?subject=${encodeURIComponent(
			subject
		)}&body=${encodeURIComponent(msg)}`;

		window.open(mailtoLink, '_blank');
	};
	const handleWhatsappClick = async () => {
		const inputPhoneNumber = await prompt(
			'Enter the phone number for WhatsApp:'
		);
		if (inputPhoneNumber) {
			// const whatsappMsg = `${msg}%0AContact me at: ${inputPhoneNumber}`;
			const whatsappMsg = `https://wa.me/${inputPhoneNumber}?text=${msg}`;

			window.open(whatsappMsg, '_blank');
		}
	};
	return (
		<div className={HomeStyle.stock}>
			<div className={HomeStyle.details}>
				<span className={HomeStyle.name}>{name}</span>
				<span className={HomeStyle.price}>{price}</span>
				<span
					className={increase >= 0 ? HomeStyle.increase : HomeStyle.decrease}>
					{increase >= 0 ? `+${increase}%` : `%{increase}$`}
				</span>
				<button
					className={HomeStyle.btn}
					onClick={handleEmailClick}>
					<FontAwesomeIcon icon={faEnvelope} /> Email
				</button>
				{isCopied && <span>Copied to clipboard</span>}
				<button
					className={HomeStyle.btn}
					onClick={handleWhatsappClick}>
					{' '}
					Whatsapp
				</button>
			</div>
		</div>
	);
}

export default HomePage;
