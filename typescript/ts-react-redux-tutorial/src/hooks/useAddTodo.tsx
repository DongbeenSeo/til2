import { useDispatch } from 'react-redux';
import { addTodo } from '../modules/todos';
import { useCallback } from 'react';

export default function useAddTodo() {
  const dispatch = useDispatch();
  return useCallback(
    text => {
      dispatch(addTodo(text));
    },
    [dispatch]
  );
}
