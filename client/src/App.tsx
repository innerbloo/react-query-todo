import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import { RouterProvider } from 'react-router-dom';

import router from '@/routes/router';
import globalStyles from '@/styles/global';
import theme from '@/styles/theme';

import { Global, ThemeProvider } from '@emotion/react';

function App() {
    return (
        <ThemeProvider theme={theme}>
            {/*@ts-ignore*/}
            <Global styles={globalStyles} />
            <RouterProvider router={router} />
            {/*<ReactQueryDevtools />*/}
        </ThemeProvider>
    );
}

export default App;
