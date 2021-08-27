import { getFeaturedEvents } from '../dummy-data';
import EventList from '../components/events/events-list';

function HomePage() {
	const featuredEvents = getFeaturedEvents();

	return (
		<div>
			<EventList events={featuredEvents} />
		</div>
	);
}

export default HomePage;
