import Image from 'next/image';
import styles from './event-item.module.css';
import Button from '../ui/button';
import DateIcon from '../icons/date-icon';
import AddressIcon from '../icons/address-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';

function EventItem(props) {
	const { title, image, date, location, id } = props;
	const prettyDate = new Date(date).toLocaleDateString('en-UK', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	});
	const prettyAddress = location.replace(', ', '\n');
	const exploreLink = `/events/${id}`;

	return (
		<li className={styles.item}>
			<Image src={'/' + image} alt={title} width={250} height={160} />
			<div className={styles.content}>
				<div className={styles.summary}>
					<h2>{title}</h2>
					<div className={styles.date}>
						<DateIcon />
						<time>{prettyDate}</time>
					</div>
					<div className={styles.address}>
						<AddressIcon />
						<address>{prettyAddress}</address>
					</div>
				</div>
				<div className={styles.actions}>
					<Button link={exploreLink}>
						<span>Explore Event</span>
						<span className={styles.icon}>
							<ArrowRightIcon />
						</span>
					</Button>
				</div>
			</div>
		</li>
	);
}

export default EventItem;
