import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { Intro } from './pages/intro';
import { Login } from './pages/login';
import { Join } from './pages/join';
import { UserAccount } from './pages/account';
import { InqMain } from './pages/inq-main';
import { CustomerInqForm } from './pages/inq-form';
import {
    CustomerInqTableList,
    SalesManagerInqTableList,
    QualityManagerInqTableList,
} from './pages/inq-list';
import {
    CustomerInqItem,
    SalesManagerInqItem,
    QualityManagerInqItem,
} from './pages/inq-item';
import { VocMain } from './pages/voc-main';
import { VocQuestionList, VocColList } from './pages/voc-list';
import { VocQuestionForm, VocAnswerForm, VocColForm } from './pages/voc-form';
import { DashBoard } from './pages/dashboard';
import Error404 from './pages/error/Error404'

import { AuthProvider } from './context/auth/AuthContext';
import Layout from './components/templates/Layout';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
    typography: {
        fontFamily: 'Pretendard-Regular',
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <Router>
                    <Layout>
                        <Routes>
                            <Route index path="" element={<Intro />} />

                            <Route path="login" element={<Login />} />
                            <Route path="join" element={<Join />} />
                            <Route path="account" element={<UserAccount />} />

                            <Route path="inq-main" element={<InqMain />} />
                            <Route path="inq-form/customer" element={<CustomerInqForm />} />
                            <Route path="inq-list/customer" element={<CustomerInqTableList />} />
                            <Route path="inq-list/sales" element={<SalesManagerInqTableList />} />
                            <Route path="inq-list/quality" element={<QualityManagerInqTableList />} />
                            <Route path="inq-list/customer/:id" element={<CustomerInqItem />} />
                            <Route path="inq-list/sales/:id" element={<SalesManagerInqItem />} />
                            <Route path="inq-list/quality/:id" element={<QualityManagerInqItem />} />

                            <Route path="voc-main" element={<VocMain />} />
                            <Route path="voc-form/question" element={<VocQuestionForm />} />
                            <Route path="voc-form/answer" element={<VocAnswerForm />} />
                            <Route path="voc-form/collaboration" element={<VocColForm />} />
                            <Route path="voc-list/question" element={<VocQuestionList />} />
                            <Route path="voc-list/collaboration" element={<VocColList />} />

                            <Route path="dashboard" element={<DashBoard />} />

                            <Route path="*" element={<Error404 />} />
                        </Routes>
                    </Layout>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
