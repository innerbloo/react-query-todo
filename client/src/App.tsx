import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import { RouterProvider } from 'react-router-dom';

import { router } from '@/routes';
import { GlobalStyle } from '@/styles';

function App() {
    return (
        <>
            <GlobalStyle />
            <RouterProvider router={router} />
            <ReactQueryDevtools
                initialIsOpen={false}
                position={'bottom-right'}
            />
        </>
    );
}

export default App;
