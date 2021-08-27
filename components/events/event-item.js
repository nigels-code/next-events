import Link from 'next/link';
import styles from './event-item.module.css';

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
			<img src={'/' + image} alt={title} />
			<div className={styles.content}>
				<div className={styles.summary}>
					<h2>{title}</h2>
					<div className={styles.date}>
						<time>{prettyDate}</time>
					</div>
					<div className={styles.address}>
						<address>{prettyAddress}</address>
					</div>
				</div>
				<div className={styles.actions}>
					<Link href={exploreLink}>Explore Event</Link>
				</div>
			</div>
		</li>
	);
}

export default EventItem;
