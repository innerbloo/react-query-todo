import CommentIcon from '@mui/icons-material/Comment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ButtonGroup } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios/index';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import styled from 'styled-components';

import { TOKEN } from '@/constants/common';
import { CONTENT, EMAIL, PASSWORD, TITLE } from '@/constants/name';
import { MAIN_URL } from '@/constants/url';
import { useInputs } from '@/hooks/form';
import { LoginData } from '@/interfaces/common';

import api from '../../api/api';

const theme = createTheme();

export default function TodoList() {
    const [checked, setChecked] = useState([0]);
    const [expanded, setExpanded] = useState<string | false>(false);
    const [editState, setEdit] = useState('');
    const [inputStates, handleInput] = useInputs({
        [TITLE]: '',
        [CONTENT]: '',
    });
    const [editInputStates, handleEditInput] = useInputs({
        [TITLE]: '',
        [CONTENT]: '',
    });

    const { data: todos } = useQuery(['todos'], () => api.get('/todos'));

    const postMutation = useMutation(
        (data: any) => {
            return api.post('todos', data);
        },
        {
            onError: (error: any, variable, context) => {
                alert(error?.response?.data?.details);
            },
        },
    );

    const putMutation = useMutation(
        (data: any) => {
            return api.put(`todos/${data.id}`, data.data);
        },
        {
            onError: (error: any, variable, context) => {
                alert(error?.response?.data?.details);
            },
            onSuccess: (data, variables, context) => {
                handleEdit('');
            },
        },
    );

    const deleteMutation = useMutation(
        (id: string) => {
            return api.delete(`todos/${id}`);
        },
        {
            onError: (error: any, variable, context) => {
                alert(error?.response?.data?.details);
            },
            onSuccess: (data, variables, context) => {
                handleEdit('');
            },
        },
    );

    const handleSubmit = () => {
        postMutation.mutate({
            [TITLE]: inputStates[TITLE],
            [CONTENT]: inputStates[CONTENT],
        });
    };

    const handleUpdate = () => {
        putMutation.mutate({
            id: editState,
            data: {
                [TITLE]: editInputStates[TITLE],
                [CONTENT]: editInputStates[CONTENT],
            },
        });
    };

    const handleDelete = (id: string) => {
        if (window.confirm('삭제하시겠습니까?')) {
            deleteMutation.mutate(id);
        }
    };

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleChange =
        (panel: string) =>
        (event: React.SyntheticEvent, isExpanded: boolean) => {
            handleEdit('');
            setExpanded(isExpanded ? panel : false);
        };

    const handleEdit = (panel: any) => {
        handleEditInput({
            name: TITLE,
            value: panel.title,
        });
        handleEditInput({
            name: CONTENT,
            value: panel.content,
        });
        setEdit(panel.id ?? '');
    };

    return (
        <TodoListContainer>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="sm">
                    <CssBaseline />
                    <Box sx={{ mb: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id={TITLE}
                            label={TITLE}
                            name={TITLE}
                            autoComplete={TITLE}
                            autoFocus
                            onChange={handleInput}
                            value={inputStates[TITLE]}
                        />
                        <TextField
                            fullWidth
                            id={CONTENT}
                            label={CONTENT}
                            name={CONTENT}
                            autoComplete={CONTENT}
                            autoFocus
                            onChange={handleInput}
                            value={inputStates[CONTENT]}
                        />
                    </Box>
                    <Button onClick={handleSubmit} variant="contained">
                        등록
                    </Button>
                    <List
                        sx={{
                            width: '100%',
                            bgcolor: 'background.paper',
                        }}
                    >
                        {todos?.data.data.map((item: any) => {
                            const labelId = `checkbox-list-label-${item}`;

                            return (
                                <ListItem
                                    key={item.id}
                                    disablePadding
                                    sx={{
                                        border: `${
                                            editState === item.id &&
                                            '1px dashed rgba(0, 0, 0, 0.23)'
                                        }`,
                                    }}
                                >
                                    <ListItemButton role={undefined} dense>
                                        <ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                checked={
                                                    checked.indexOf(item) !== -1
                                                }
                                                onClick={handleToggle(item)}
                                                tabIndex={-1}
                                                disableRipple
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                            />
                                        </ListItemIcon>
                                        {editState === item.id ? (
                                            <Box>
                                                <TextField
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id={TITLE}
                                                    label={TITLE}
                                                    name={TITLE}
                                                    autoComplete={TITLE}
                                                    autoFocus
                                                    onChange={handleEditInput}
                                                    value={
                                                        editInputStates[TITLE]
                                                    }
                                                />
                                                <TextField
                                                    fullWidth
                                                    id={CONTENT}
                                                    label={CONTENT}
                                                    name={CONTENT}
                                                    autoComplete={CONTENT}
                                                    onChange={handleEditInput}
                                                    value={
                                                        editInputStates[CONTENT]
                                                    }
                                                />
                                            </Box>
                                        ) : (
                                            <Accordion
                                                expanded={expanded === item.id}
                                                onChange={handleChange(item.id)}
                                                sx={{ width: '100%' }}
                                            >
                                                <AccordionSummary
                                                    expandIcon={
                                                        <ExpandMoreIcon />
                                                    }
                                                    aria-controls="panel4bh-content"
                                                    id="panel4bh-header"
                                                >
                                                    <Typography
                                                        sx={{
                                                            width: '33%',
                                                            flexShrink: 0,
                                                        }}
                                                    >
                                                        {item.title}
                                                    </Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Typography>
                                                        {item.content}
                                                    </Typography>
                                                </AccordionDetails>
                                            </Accordion>
                                        )}

                                        <ButtonGroup
                                            variant="contained"
                                            aria-label="outlined primary button group"
                                            sx={{
                                                ml: 5,
                                            }}
                                        >
                                            {editState === item.id ? (
                                                <Button onClick={handleUpdate}>
                                                    확인
                                                </Button>
                                            ) : (
                                                <Button
                                                    onClick={() =>
                                                        handleEdit(item)
                                                    }
                                                >
                                                    수정
                                                </Button>
                                            )}

                                            {editState === item.id ? (
                                                <Button
                                                    onClick={() =>
                                                        handleEdit('')
                                                    }
                                                >
                                                    취소
                                                </Button>
                                            ) : (
                                                <Button
                                                    onClick={() =>
                                                        handleDelete(item.id)
                                                    }
                                                >
                                                    삭제
                                                </Button>
                                            )}
                                        </ButtonGroup>
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </Container>
            </ThemeProvider>
        </TodoListContainer>
    );
}

const TodoListContainer = styled.div`
    //background: red;
`;
