import { useState, useEffect } from 'react';
import { stock_data } from '../../api/index.js';
import HomeStyle from './Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {
	const [stock, setStock] = useState([]);
	const [selectedOption, setSelectedOption] = useState(20);
	const getStock = async (list) => {
		try {
			const res = await stock_data(list);
			setStock(Array.from(res));
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getStock(selectedOption);
	}, [selectedOption]);
	return (
		<div>
			<div className={HomeStyle.header}>
				<h1>Stock Price List</h1>
				<Dropdown
					options={[10, 20, 50, 75, 100]}
					selectedOption={selectedOption}
					onSelect={setSelectedOption}
				/>
			</div>
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
	const currentDate = new Date();
	const month = currentDate.toLocaleString('default', { month: 'long' });
	const date = currentDate.getDate();

	const msg = `The stock price of ${name} on ${date}th ${month} is ${price}`;

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
					{increase >= 0 ? `+${increase}%` : `${increase}%`}
				</span>
				<button
					className={HomeStyle.btn}
					onClick={handleEmailClick}>
					<FontAwesomeIcon icon={faEnvelope} /> Email
				</button>
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

const Dropdown = ({ options, selectedOption, onSelect }) => {
	const handleOptionSelect = (option) => {
		onSelect(option);
	};

	return (
		<select
			value={selectedOption}
			onChange={(e) => handleOptionSelect(e.target.value)}>
			<option value=''>Select an option</option>
			{options.map((option) => (
				<option
					key={option}
					value={option}>
					{option}
				</option>
			))}
		</select>
	);
};

export default HomePage;
