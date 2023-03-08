import {useRouter} from "next/router";
import Head from 'next/head';

import EventList from "@/components/events/EventList";
import EventsSearch from "@/components/events/EventsSearch";
import {getAllEvents} from "@/utils/api-util";

const EventsPage = props => {
    const {events} = props;
    const router = useRouter();

    const findEventsHandler = (year, month) => {
        const fullPath = `/events/${year}/${month}`
        router.push(fullPath);
    };
  return (
    <>
        <Head>
            <title>All Events</title>
            <meta name="description" content="Find plenty of great events!"/>
        </Head>
        <EventsSearch onSearch={findEventsHandler}/>
        <EventList items={events}/>
    </>
  )
}


export async function getStaticProps() {
    const allEvents = await getAllEvents();
    return {
        props: {
            events: allEvents,
        },
        revalidate: 10
    }
}

export default EventsPage;
