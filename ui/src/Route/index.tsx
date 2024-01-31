import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import UserListPage from "../Page/User/List";
import UserAddPage from "../Page/User/Add";
import TaskListPage from "../Page/Task/List";
import TaskUpsertPage from "../Page/Task/Upsert";

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path={"/task"} element={<TaskListPage/>}></Route>
                <Route path={"/task/add"} element={<TaskUpsertPage/>}></Route>
                <Route path={"/task/edit/:taskId"} element={<TaskUpsertPage/>}></Route>
                <Route path={"/user"} element={<UserListPage/>}/>
                <Route path={"/user/add"} element={<UserAddPage/>}/>
            </Routes>
        </Router>
    )
}

export default AppRoutes;