import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div id="page-top" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <div style={{ flex: '1', padding: '20px 0' }}>
                <div className="container-fluid">
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
