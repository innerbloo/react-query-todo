import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from 'react-query';

import { postTodo } from '@/hooks/queries/useTodosQuery';
import type { TodoForm, TodosReadSuccess } from '@/interfaces/list';

const useTodoMutation = () => {
    const queryClient = useQueryClient();
    return useMutation(postTodo, {
        onMutate: async (newTodo: TodoForm) => {
            await queryClient.cancelQueries({ queryKey: ['todos'] });
            const previousTodos = queryClient.getQueryData<
                AxiosResponse<TodosReadSuccess>
            >(['todos']);
            if (previousTodos) {
                queryClient.setQueryData(['todos'], {
                    ...previousTodos,
                    data: {
                        data: [
                            ...previousTodos.data.data,
                            {
                                ...newTodo,
                                id: 'loading',
                                createdAt: Date.now().toString(),
                                updatedAt: Date.now().toString(),
                            },
                        ],
                    },
                });
            }
            return { previousTodos };
        },
        onError: (err, newTodo, context) => {
            if (context?.previousTodos) {
                queryClient.setQueryData(['todos'], context.previousTodos);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
    });
};

export default useTodoMutation;
