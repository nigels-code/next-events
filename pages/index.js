import { getFeaturedEvents } from '../helpers/api-util';
import EventList from '../components/events/events-list';

function HomePage(props) {
	return (
		<div>
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
