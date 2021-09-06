import { getFeaturedEvents } from '../helpers/api-util';
import EventList from '../components/events/events-list';
import Head from 'next/head';
import NewsletterRegistration from '../components/input/newsletter-registration';

function HomePage(props) {
	return (
		<div>
			<Head>
				<title>NextEvents</title>
			</Head>
			<NewsletterRegistration />
			<EventList events={props.events} />
		</div>
	);
}

export async function getStaticProps() {
	const featuredEvents = await getFeaturedEvents();
	return {
		props: {
			events: featuredEvents
		},
		revalidate: 600
	};
}

export default HomePage;
