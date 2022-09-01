import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from 'redux/store';

const getTodo = createAsyncThunk<
  {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  },
  number,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('app/getTodo', async (id) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);

  return await response.json();
});

export default getTodo;
