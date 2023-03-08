import Image from 'next/image';

import Button from "@/components/ui/Button";
import classes from './EventItem.module.css';
import DateIcon from "@/components/icons/DateIcon";
import AddressIcon from "@/components/icons/AddressIcon";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";

const EventItem = props => {
    const {id, title, image, date, location} = props;
    const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
    const formattedAddress = location.replace(', ', '\n');

    return (
        <li className={classes.item}>
            {/*<img src={`/${image}`} alt={title} />*/}
            <Image src={`/${image}`} alt={title} width={250} height={160}/>
            <div className={classes.content}>
                <div>
                    <h2>{title}</h2>
                    <div className={classes.date}>
                        <DateIcon />
                        <time>{humanReadableDate}</time>
                    </div>
                    <div className={classes.address}>
                        <AddressIcon />
                        <address>{formattedAddress}</address>
                    </div>
                </div>
                <div className={classes.actions}>
                    <Button link={`/events/${id}`}>
                        <span>Explore Event</span>
                        <span className={classes.icon}><ArrowRightIcon /></span>
                    </Button>
                </div>
            </div>
        </li>
    );
}

export default EventItem;