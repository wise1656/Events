import {useEffect} from 'react';
import { useAppDispatch} from 'redux/hooks';
import './App.scss';
import {getEvents} from "./redux/events.actions";
import {Events} from "./components/Events/Events";

function App() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getEvents());
    }, [])
    
    return (
        <div className='App'>
            <Events/>
        </div>
    );
}

export default App;
