import { getAllEvents } from '../../helpers/api-util';
import EventList from '../../components/events/events-list';
import EventsSearch from '../../components/events/events-search';
import { Fragment } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

function AllEventsPage(props) {
	const { events } = props;
	const router = useRouter();

	function findEventsHandler(year, month) {
		const fullPath = `/events/${year}/${month}`;
		router.push(fullPath);
	}

	return (
		<Fragment>
			<Head>
				<title>All Events</title>
			</Head>
			<EventsSearch onSearch={findEventsHandler} />
			<EventList events={events} />
		</Fragment>
	);
}

export async function getStaticProps() {
	const events = await getAllEvents();

	return {
		props: {
			events: events
		},
		revalidate: 60
	};
}

export default AllEventsPage;
