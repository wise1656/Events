import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectEvents } from 'redux/events.slice';

export function EventList() {
    const events = useSelector(selectEvents);

    return (
        <div>
            {events?.map((e, i) => (
                <div key={i}>{e.title}</div>
            ))}
            <div>
                <Link to='empty'>Go to empty</Link>
            </div>
        </div>
    );
}
