import Head from "next/head";

import {getFeaturedEvents, getEventById} from '@/utils/api-util';
import EventContent from "@/components/event-details/EventContent";
import EventSummary from "@/components/event-details/EventSummary";
import EventLogistics from "@/components/event-details/EventLogistics";
import ErrorAlert from "@/components/ui/ErrorAlert";
import Button from "@/components/ui/Button";
import Comments from "@/components/input/Comments";

const EventDetailPage = (props) => {
    // const router = useRouter();
    // console.log(router.query.eventId)
    const event = props.selectedEvent;
    if (!event) {
        return (
            <>
                <div className="center">
                    <p>Loading...</p>
                </div>
                {/*<div className='center'>*/}
                {/*    <Button link='/events'>Show All Events</Button>*/}
                {/*</div>*/}
            </>
        );
    }

    return (
        <>
            <Head>
                <title>{event.title}</title>
                <meta name="description" content={event.description}/>
            </Head>
            <EventSummary title={event.title}/>
            <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
            <Comments eventId={event.id}/>
        </>
    );
};

export async function getStaticPaths(){
    const events =  await getFeaturedEvents();
    const paths = events.map(item => ({params: {eventId: item.id}}));
    return {
        paths: paths,
        fallback: true
    }
}

export async function getStaticProps(context){
    const eventId = context.params.eventId;
    const event =  await getEventById(eventId);
    return {
        props: {
            selectedEvent: event
        },
        revalidate: 10
    }
}

export default EventDetailPage;
