import {useRouter} from 'next/router';
import useSWR from 'swr';
import Head from 'next/head';

import {getFilteredEvents, transformFirebaseObjectToArray, filterEvents} from '@/utils/api-util';
import EventList from "@/components/events/EventList";
import ResultsTitle from "@/components/events/ResultsTitle";
import Button from "@/components/ui/Button";
import ErrorAlert from "@/components/ui/ErrorAlert";

const fetcher = (...args) => fetch(...args)
        .then(res => res.json())
        .then(data => transformFirebaseObjectToArray(data))



const FilteredEventsPage = (props) => {
    const router = useRouter();
    const query =  router.query.slug;
    const url = 'https://nextjs-b43b8-default-rtdb.europe-west1.firebasedatabase.app/events.json?print=pretty';
    const {data, error, isLoading} =  useSWR(url, fetcher);


    let pageHeadData = (
        <Head>
            <title>Filtered Events</title>
            <meta name="description" content="A List of filtered events"/>
        </Head>
    );

   if(isLoading || !query) {
       return (
        <>
            {pageHeadData}
            <p className='center'>Loading...</p>
        </>
       )}

    const filteredYear = +query?.at(0);
    const filteredMonth = +query?.at(1);

    pageHeadData = (
        <Head>
            <title>Filtered Events</title>
            <meta name="description" content={`All events for ${filteredMonth}/${filteredYear}`}/>
        </Head>
    );

        if(isNaN(filteredYear) ||
        isNaN(filteredMonth) ||
        filteredYear > 2030 ||
        filteredYear < 2021 ||
        filteredMonth < 1 ||
        filteredMonth > 12 || error){
        return (
            <>
                {pageHeadData}
                <ErrorAlert>
                    <p>Invalid filter!</p>
                </ErrorAlert>
                <div className="center">
                    <Button link='/events'>Show All Events</Button>
                </div>
            </>
        );
    }

    const filteredEvents = filterEvents({year: filteredYear, month: filteredMonth}, data);
    console.log(filteredEvents)
    if(!filteredEvents || filteredEvents.length === 0){
       return (
           <>
               {pageHeadData}
               <ErrorAlert>
                   <p>No events found!</p>
               </ErrorAlert>
               <div className='center'>
                   <Button link='/events'>Show All Events</Button>
               </div>
           </>
       );
   }

    const date = new Date(filteredYear, filteredMonth - 1);

    return (
        <>

            <ResultsTitle date={date}/>
            <EventList items={filteredEvents}/>
        </>
    );
};

// export async function getServerSideProps(context){
//     const {params} = context;
//     const query = params.slug;
//     const filteredYear = +query.at(0);
//     const filteredMonth = +query.at(1);
//
//     if(isNaN(filteredYear) ||
//         isNaN(filteredMonth) ||
//         filteredYear > 2030 ||
//         filteredYear < 2021 ||
//         filteredMonth < 1 ||
//         filteredMonth > 12){
//         return {
//             props: {hasError: true}
//         }
//     }
//
//     const filteredEvents = await getFilteredEvents({year: filteredYear, month: filteredMonth});
//     // const date = new Date(filteredYear, filteredMonth -1);
//
//     return {
//         props: {
//             events: filteredEvents,
//             date: {
//                 year: filteredYear,
//                 month: filteredMonth
//             }
//         }
//     }
// }
//
export default FilteredEventsPage;