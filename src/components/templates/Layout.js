import React from 'react';
import Header from '../molecules/Header';
import Chatbot from '../organisms/Chatbot';

const Layout = ({ children }) => {
    return (
        <div>
            <Header />
            <div>{children}</div>
            <Chatbot />
        </div>
    );
};

export default Layout;
