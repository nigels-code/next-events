import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import EventList from '../../components/events/events-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

function FilteredEventsPage(props) {
	const [loadedEvents, setLoadedEvents] = useState();
	const router = useRouter();
	const filterData = router.query.slug;

	const fetcher = (url) => axios.get(url).then((res) => res.data);

	const { data, error } = useSWR(
		'https://nextevents-4cfe2-default-rtdb.europe-west1.firebasedatabase.app/events.json',
		fetcher
	);

	useEffect(() => {
		if (data) {
			const events = [];
			for (const key in data) {
				events.push({
					id: key,
					...data[key]
				});
			}
			setLoadedEvents(events);
		}
	}, [data]);

	if (!loadedEvents) {
		return <p className='center'>Loading...</p>;
	}

	const filterYear = parseInt(filterData[0]);
	const filterMonth = parseInt(filterData[1]);

	if (
		isNaN(filterYear) ||
		isNaN(filterMonth) ||
		filterYear > 2030 ||
		filterYear < 2021 ||
		filterMonth < 1 ||
		filterMonth > 12 ||
		error
	) {
		return (
			<Fragment>
				<ErrorAlert>
					<p>Invalid Filter - Try Again</p>
				</ErrorAlert>
				<div className='center'>
					<Button link='/events'>Show All Events</Button>
				</div>
			</Fragment>
		);
	}

	const filteredEvents = loadedEvents.filter((event) => {
		const eventDate = new Date(event.date);
		return (
			eventDate.getFullYear() === filterYear &&
			eventDate.getMonth() === filterMonth - 1
		);
	});

	if (!filteredEvents || filteredEvents.length === 0) {
		return (
			<Fragment>
				<ErrorAlert>
					<p>No events found for the chosen filter!</p>
				</ErrorAlert>
				<div className='center'>
					<Button link='/events'>Show All Events</Button>
				</div>
			</Fragment>
		);
	}

	const date = new Date(filterYear, filterMonth - 1);

	return (
		<Fragment>
			<ResultsTitle date={date} />
			<EventList events={filteredEvents} />
		</Fragment>
	);
}

export default FilteredEventsPage;
