import React from 'react';
import {useAuth} from "react-oidc-context";
import AppRoutes from "./Route";

const App: React.FC = () => {
    const auth = useAuth();

    if (auth.isLoading) {
        return <div>Loading...</div>
    }

    if (auth.error) {
        return <div>Error: {auth.error.message}</div>
    }

    if (!auth.isAuthenticated) {
        void auth.signinRedirect();
        return null;
    }

    return (
        <>
            <AppRoutes/>
        </>
    );
}

export default App;
