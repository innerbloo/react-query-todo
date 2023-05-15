import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import {
    LOGIN_URL,
    LOGOUT_URL,
    MAIN_URL,
    SIGN_UP_URL,
} from '@/constants/index';
import { Login, Root, SignUp } from '@/pages/index';
import { logoutLoader, mainLoader } from '@/routes/index';

const router = createBrowserRouter([
    {
        path: MAIN_URL,
        element: <Root />,
        errorElement: <></>,
        children: [
            { index: true, loader: mainLoader },
            {
                path: LOGOUT_URL,
                loader: logoutLoader,
            },
            {
                path: LOGIN_URL,
                element: <Login />,
            },
            {
                path: SIGN_UP_URL,
                element: <SignUp />,
            },
        ],
    },
]);

export default router;
