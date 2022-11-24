import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectEvents } from 'redux/events.slice';
import {useEffect} from "react";
import {getEvents} from "../../redux/events.actions";
import {useAppDispatch} from "../../redux/hooks";

export function EventList() {
    const events = useSelector(selectEvents);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getEvents());
    }, []);

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
