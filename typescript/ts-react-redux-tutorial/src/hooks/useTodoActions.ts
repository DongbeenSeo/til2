import { toggleTodo, removeTodo } from './../modules/todos';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
export default function useTodoActions(id: number) {
  const dispatch = useDispatch();

  const onToggle = useCallback(() => dispatch(toggleTodo(id)), [dispatch, id]);
  const onRemove = useCallback(() => dispatch(removeTodo(id)), [dispatch, id]);

  return { onToggle, onRemove };
}
