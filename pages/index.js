import Head from 'next/head';

import {getFeaturedEvents} from '@/utils/api-util';
import EventList from "@/components/events/EventList";
import NewsletterRegistration from "@/components/input/NewsletterRegistration";

const HomePage = props => {
    return (
        <div>
            <Head>
                <title>NextJS Events</title>
                <meta name="description" content="Find plenty of great events!"/>
            </Head>
            <NewsletterRegistration />
            <EventList items={props.events}/>
        </div>
    )
}

export default HomePage;

export async function getStaticProps(){
    const featuredEvents = await getFeaturedEvents();
    return {
        props: {
            events: featuredEvents
        },
        revalidate: 60
    }
}