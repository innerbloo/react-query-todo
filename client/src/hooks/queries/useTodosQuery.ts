import { useQuery } from 'react-query';

import type {
    Todo,
    TodoCreateSuccess,
    TodoDeleteSuccess,
    TodoForm,
    TodoUpdateSuccess,
} from '@/interfaces/list';

import api from '../../api/api';
import { getTodos } from '../../api/list';

export const postTodo = ({ title, content }: TodoForm) =>
    api.post<TodoCreateSuccess>('/todos', { title, content });

const useTodosQuery = () => useQuery(['todos'], getTodos);

export const deleteTodo = (id: string) =>
    api.delete<TodoDeleteSuccess>(`todos/${id}`);

export const updateTodo = ({ title, content, id }: Todo) =>
    api.put<TodoUpdateSuccess>(`todos/${id}`, { title, content });

export default useTodosQuery;
