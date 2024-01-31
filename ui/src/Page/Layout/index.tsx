import React, {ReactNode} from "react";
import {Button, Layout, Menu, theme} from "antd";
import {useAuth} from "react-oidc-context";
import {useNavigate} from "react-router-dom";

interface LayoutProps {
    children: ReactNode;
}

const {Header, Content} = Layout

const AppLayout: React.FC<LayoutProps> = ({children}) => {
    const auth = useAuth()
    const navigate = useNavigate()

    const {
        token: {colorBgContainer, borderRadiusLG}
    } = theme.useToken()

    const logoutHandler = () => {
        void auth.signoutRedirect()
        void auth.removeUser()
    }

    const onChangePageHandler = (link: string) => {
        navigate(link)
    }

    return (
        <Layout>
            <Header style={{
                position: "sticky",
                top: 0,
                zIndex: 1,
                width: "100%",
                display: "flex",
                alignItems: "center"
            }}>
                <Menu theme="dark"
                      mode="horizontal"
                      items={[
                          {
                              key: "tasks_page",
                              label: "Tasks",
                              onClick: () => onChangePageHandler("/task")
                          },
                          {
                              key: "user_page",
                              label: "Users",
                              onClick: () => onChangePageHandler("/user")
                          }
                      ]}
                      style={{flex: 1, minWidth: 0}}
                />
                <Button onClick={logoutHandler}>Logout</Button>
            </Header>
            <Content style={{padding: "24px 48px"}}>
                <div style={{
                    padding: 24,
                    minHeight: 1024,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG
                }}>
                    {children}
                </div>
            </Content>
        </Layout>
    )

}

export default AppLayout