import { RouterProvider } from 'react-router-dom';

import { SignUp } from '@/pages/auth';
// import { SignUp } from 'src/pages/auth';
import router from '@/routes/router';

// import router from 'src/routes/router';

function App() {
    return (
        <>
            {/*<RouterProvider router={router} />*/}
            <SignUp />
        </>
    );
}

export default App;
