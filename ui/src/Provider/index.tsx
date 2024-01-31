import React, {ReactNode} from "react";
import {WebStorageStateStore} from "oidc-client-ts";
import {AuthProvider} from "react-oidc-context";

interface AuthOidcProviderProps {
    children: ReactNode;
}

const AuthOidcProvider: React.FC<AuthOidcProviderProps> = ({
    children
}): React.JSX.Element => {

    const oidcConfig = {
        redirect_uri: "http://localhost:3000/task",
        authority: "http://localhost:9080/realms/tasks",
        client_id: "task-app-client",
        scope: "openid profile email",
        userStore: new WebStorageStateStore({
            store: window.localStorage
        }),
        automaticSilentRenew: true,
        onSigninCallback() {
            window.history.replaceState(
                {},
                document.title,
                window.location.pathname
            )
        }
    }

    return <AuthProvider {...oidcConfig}>{children}</AuthProvider>
}

export default AuthOidcProvider