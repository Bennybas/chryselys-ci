import React, { useState, useEffect } from 'react';
import { Info, CalendarCog } from 'lucide-react';

const NewsSection = ({ selectCompetitor, selectedOpenSource }) => {
  const [selectedSources, setSelectedSources] = useState({
    Competitor: false,
    'Google Competitor': false,
    Events: false
  });

  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('http://localhost:5001/drug_data');
        const data = await response.json();
        if (data) {
          console.log('Fetched news data:', data);
          setNewsData(data);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
        setNewsData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  useEffect(() => {
    if (selectCompetitor) {
      console.log('Selected competitor:', selectCompetitor);
    }
  }, [selectCompetitor]);

  const handleSourceChange = (source) => {
    setSelectedSources(prev => ({
      ...prev,
      [source]: !prev[source]
    }));
  };

  // Filter news based on both competitor and open source
  const filteredNews = newsData.filter(news => {
    if (selectCompetitor) {
      console.log('Comparing:', {
        newsCompetitor: news.competitors,
        selectedCompetitor: selectCompetitor.competitors
      });
    }

    // Check if the selected competitor matches the news competitor
    const competitorMatch = selectCompetitor
      ? news.competitors === selectCompetitor.competitors
      : true;

    // Check if the selected open source matches
    const openSourceMatch = selectedOpenSource 
      ? news.open_source === selectedOpenSource 
      : true;

    const sourceSelected = Object.values(selectedSources).some(value => value);
  
    const sourceMatch = !sourceSelected || selectedSources[news.source];

    return competitorMatch && openSourceMatch && sourceMatch;
  });

  console.log('Filtered news:', filteredNews);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <span className="text-gray-500">Loading news...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between gap-4">
      <div className="flex justify-between w-full">
        <span className="text-gray-700 text-md">Latest News</span>
        <Info className="w-3 h-3" />
      </div>

      {(selectCompetitor || selectedOpenSource) ? (
        <div className="flex flex-col justify-between gap-4">
          <div className="justify-start w-full">
            <span className="text-gray-700 text-md" style={{ fontWeight: 500, fontSize: '15px' }}>
              {selectCompetitor?.competitors || selectedOpenSource}
            </span>
          </div>
          
          {/* Source Selection Boxes */}
          <div className="flex flex-row justify-between gap-2">
            {/* Competitor Source Box */}
            <div className="flex bg-white items-center justify-between border border-gray-300 rounded-xl w-full h-16 p-2">
              <div className="flex flex-col justify-between h-full w-full">
                <span className="text-gray-700 text-[12px]">Source</span>
                <div className="flex items-center space-x-1">
                  <div className="flex justify-between w-full">
                    <span className="text-[14px] font-medium">Competitor</span>
                    <input 
                      type="checkbox"
                      checked={selectedSources.Competitor}
                      onChange={() => handleSourceChange('Competitor')}
                      className="w-4 h-4 text-blue-600 border-gray-200 rounded focus:ring-green"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Google Competitor Source Box */}
            <div className="flex bg-white items-center justify-between border border-gray-300 rounded-xl w-full h-16 p-2">
              <div className="flex flex-col justify-between h-full w-full">
                <span className="text-gray-700 text-[12px]">Source</span>
                <div className="flex items-center space-x-1">
                  <div className="flex justify-between w-full">
                    <span className="text-[14px] font-medium">Google Competitor</span>
                    <input 
                      type="checkbox"
                      checked={selectedSources['Google Competitor']}
                      onChange={() => handleSourceChange('Google Competitor')}
                      className="w-4 h-4 text-blue-600 border-gray-200 rounded focus:ring-green"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Events Source Box */}
            <div className="flex bg-white items-center justify-between border border-gray-300 rounded-xl w-full h-16 p-2">
              <div className="flex flex-col justify-between h-full w-full ml-1">
                <span className="text-gray-700 text-[12px]">Source</span>
                <div className="flex items-center space-x-1">
                  <div className="flex justify-between w-full">
                    <span className="text-[14px] font-medium">Events</span>
                    <input 
                      type="checkbox"
                      checked={selectedSources.Events}
                      onChange={() => handleSourceChange('Events')}
                      className="w-4 h-4 text-blue-600 border-gray-200 rounded focus:ring-green"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* News Items */}
          {filteredNews.length > 0 ? (
            filteredNews.map((news, index) => (
              <div key={index} className="flex flex-row justify-between">
                <div className="flex flex-col bg-white items-center justify-between border border-gray-300 rounded-xl w-full h-full p-2">
                  <div className="flex flex-row justify-between h-full w-full">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-medium">{news.news_topic}</span>
                      <div className="flex rounded-xl border border-gray-200 bg-gray-200 py-1 px-2 cursor-pointer hover:bg-gray-400" onClick={() => window.open(news.source_link, "_blank")}>
                        <span className="text-[9px] font-medium">{news.source}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <CalendarCog className="w-3 h-3 text-green-500" />
                      <span className="text-gray-700 text-[12px]">{news.news_date}</span>
                    </div>
                  </div>

                  <div className="px-2 py-4">
                    <div className="flex flex-row w-full items-start gap-[1rem]">
                        
                        <div className="w-4 flex justify-start">
                            <div
                            className="w-3 h-3 rounded-full border-[3px] bg-white"
                            style={{ borderColor: '#0aa311' }}
                            ></div>
                        </div>

                        <div className="ml-2 flex-1">
                            <h3 className="text-gray-700 font-medium text-[12px] leading-tight">
                            {news.summary}
                            </h3>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px w-full bg-gray-300 mt-2"></div>
                </div>

                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-32">
              <span className="text-gray-500">No news found for selected filters</span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center h-32">
          <span className="text-gray-500">Select a competitor or open source to view news</span>
        </div>
      )}
    </div>
  );
};

export default NewsSection;