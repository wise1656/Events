import {useSelector} from "react-redux";
import {selectEvents} from "../../redux/events.slice";

export function Events() {
    const events = useSelector(selectEvents);
    return <div>
        {events.map(e => 
            <div>{e.title}</div> 
        )}
    </div>;
}