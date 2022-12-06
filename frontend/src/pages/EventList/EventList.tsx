import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectEvents } from 'redux/ApiQuery';

export function EventList() {
    const events = useSelector(selectEvents);

    return (
        <div>
            {events?.map(event => (
                <Link key={event._id} to={`/event/${event._id}`}>
                    <div>{event.title}</div>
                </Link>
            ))}
        </div>
    );
}
