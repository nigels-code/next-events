import { getAllEvents } from '../../dummy-data';
import EventList from '../../components/events/events-list';
import EventsSearch from '../../components/events/events-search';
import { Fragment } from 'react';
import { useRouter } from 'next/router';

function AllEventsPage() {
	const events = getAllEvents();
	const router = useRouter();

	function findEventsHandler(year, month) {
		const fullPath = `/events/${year}/${month}`;
		router.push(fullPath);
	}

	return (
		<Fragment>
			<EventsSearch onSearch={findEventsHandler} />
			<EventList events={events} />
		</Fragment>
	);
}

export default AllEventsPage;
