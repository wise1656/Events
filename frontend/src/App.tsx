import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectNumber, setNumber } from 'redux/appSlice';
import Button from 'components/shared/Button';
import './App.scss';
import getTodo from 'services/getTodo';

function App() {
    const [inputValue, setInputValue] = useState(0);
    const [todo, setTodo] = useState<{
        userId: number;
        id: number;
        title: string;
        completed: boolean;
    } | null>(null);

    const number = useAppSelector(selectNumber);

    const dispatch = useAppDispatch();

    const onClickGetTodo = async () => {
        const result = await dispatch(getTodo(number));

        if (getTodo.fulfilled.match(result)) {
            setTodo(result.payload);
        }
    };

    return (
        <div className='App'>
            <div>{number}</div>
            <input
                type='text'
                onChange={(event) => setInputValue(Number(event.currentTarget.value))}
            />
            <Button
                onClick={() => {
                    dispatch(setNumber(inputValue));
                }}
            >
                Set number
            </Button>
            <Button onClick={onClickGetTodo}>GetTodo</Button>
            {todo && (
                <div>
                    <div>Id: {todo.id}</div>
                    <div>Title: {todo.title}</div>
                    <div>UserId: {todo.userId}</div>
                    <div>Completed: {todo.completed}</div>
                </div>
            )}
        </div>
    );
}

export default App;
