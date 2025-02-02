import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import Modules from './Landing/Modules';
import Layout from './Layout';
import DailyCIUpdates from './Daily_CI_Updates/DailyCIUpdates';
import DailyNewsLetter from './Daily_NewsLetter/DailyNewsLetter';
import NewsPage from './DeepdiveDailyNews/NewsPage';
import LoadingSpinner from './LoadingSpinner';

function App() {
  const [isLoading, setIsLoading] = useState(false); 

  return (
    <BrowserRouter>
      {isLoading && <LoadingSpinner />} 
      <Layout>
        <Routes>
          <Route path="/" element={<Modules setIsLoading={setIsLoading} />} />
          <Route path='/daily-ci-updates' element={<DailyCIUpdates setIsLoading={setIsLoading} />} />
          <Route path='/daily-news-letter' element={<DailyNewsLetter setIsLoading={setIsLoading} />} />
          <Route path='/daily-news-letter/newspage' element={<NewsPage setIsLoading={setIsLoading} />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
