import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { deleteTodo } from '@/hooks/queries/useTodosQuery';
import { TodosReadSuccess } from '@/interfaces/list';

const useTodoDeleteMutation = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation(deleteTodo, {
        onMutate: async (targetId) => {
            await queryClient.cancelQueries({ queryKey: ['todos'] });
            const previousTodos = queryClient.getQueryData<
                AxiosResponse<TodosReadSuccess>
            >(['todos']);
            if (previousTodos) {
                queryClient.setQueryData(['todos'], {
                    ...previousTodos,
                    data: {
                        data: [
                            ...previousTodos.data.data.filter(
                                (todo) => todo.id !== targetId,
                            ),
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
        onSuccess: () => {
            navigate('/');
        },
    });
};

export default useTodoDeleteMutation;
