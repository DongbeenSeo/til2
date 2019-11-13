import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO } from './actions';
import { TodosState, TodosAction } from './types';
import { createReducer } from 'typesafe-actions';

const initState: TodosState = [
  {
    id: 1,
    text: 'TypeScript 배우기',
    done: true,
  },
  {
    id: 2,
    text: 'TypeScript 와 Redux 함께 사용해보기',
    done: true,
  },
  {
    id: 3,
    text: 'TodoList 만들기',
    done: false,
  },
];

const todos = createReducer<TodosState, TodosAction>(initState, {
  [ADD_TODO]: (state, { payload: text }) =>
    state.concat({
      id: Math.max(...state.map(todo => todo.id)) + 1,
      text,
      done: false,
    }),
  [TOGGLE_TODO]: (state, { payload: id }) =>
    state.map(todo => (todo.id === id ? { ...todo, done: !todo.done } : todo)),
  [REMOVE_TODO]: (state, { payload: id }) =>
    state.filter(todo => todo.id !== id),
});

export default todos;
