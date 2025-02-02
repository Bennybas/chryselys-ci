import React from 'react';
import Header from './Landing/Header';

const Layout = ({ children }) => {
  return (
    <div >
      <Header />
      <main className="py-4 px-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;