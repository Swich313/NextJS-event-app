export const transformFirebaseObjectToArray = (object) => {
    const dataArray = [];
    for(const key in object) {
        dataArray.push({
            id: key,
            ...object[key]
        })
    }
    return dataArray;
}

export async function getAllEvents() {
    const res = await fetch('https://nextjs-b43b8-default-rtdb.europe-west1.firebasedatabase.app/events.json?print=pretty');
    const resData = await res.json();
    return  transformFirebaseObjectToArray(resData);
}

export async function getFeaturedEvents() {
    const events = await getAllEvents();
    return events.filter((event) => event.isFeatured);
}

export async function getFilteredEvents(dateFilter) {
    // const { year, month } = dateFilter;
    const events = await getAllEvents();
    // return events.filter((event) => {
    //     const eventDate = new Date(event.date);
    // //     return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    // });
    return filterEvents(dateFilter, events);
}

export async function getEventById(id) {
    const events = await getAllEvents();
    return events.find((event) => event.id === id);
}

export function filterEvents(dateFilter, data) {
    const { year, month } = dateFilter;

    let filteredEvents = data.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    });

    return filteredEvents;
}