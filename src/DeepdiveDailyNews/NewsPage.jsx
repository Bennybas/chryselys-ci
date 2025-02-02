import React, { useEffect, useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import HeaderNewsPage from './HeaderNewsPage';
import { Info } from 'lucide-react';
import NewsSection from './NewsSection';

const NewsPage = ({setIsLoading}) => {

    const location = useLocation();
    const Drug_name = location.state?.indication || "Error";
    const tArea = location.state?.title || "Error"


    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const[selectCompetitor,getSelctCompetitor] = useState();
    const [selectedOpenSource, setSelectedOpenSource] = useState(null);


    useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch('http://localhost:5001/drug_data');
                    if (!response.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    const data = await response.json();
                    setCards(data);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };
    
            fetchData();
        }, []);
  return (

    <div>
      {/* PageHeader */}

      <HeaderNewsPage Drug_name={Drug_name} tArea={tArea} setIsLoading={setIsLoading}/>


      <div class="flex w-full h-screen mt-[7rem] gap-2">

        {/* Competitor Section */}
        <div class="w-[20%] bg-[#ebf5ff] border border-gray-200 rounded-lg p-2 overflow-y-auto">

          {/* Header */}
          <div className="flex justify-between w-full">
                  <span className="text-gray-700 text-md">Competitors</span>
                  <Info className='w-3 h-3'/>
          </div>
          <div className='py-2'></div>
          {cards.map((competitor, i) => (
          <div className='p-1'>
            <div
            key={i}
            onClick={()=> getSelctCompetitor(competitor)}
            className={`flex items-center border border-gray-400 rounded-lg w-full h-8 cursor-pointer text-gray-600 transition overflow-y-auto py-1
              ${
                selectCompetitor === competitor
                ?`bg-[#004567]/90 text-white hover:bg-[#004567]`
                :`text-gray-600 hover:text-white hover:bg-[#004567]/90 transition overflow-y-auto py-1`
              }
            `}
            
            >
            <span className="text-[13px] font-medium pl-4">{competitor.competitors}</span>
          </div>
         
          </div>
           ))}
        </div>

        
        {/* News Section */}
        <div class="w-[60%] bg-[#edf6ff]/70 border border-gray-200 rounded-lg p-2 overflow-y-auto">
          <NewsSection 
            selectCompetitor={selectCompetitor} 
            selectedOpenSource={selectedOpenSource}
          />
        </div>
        

        {/* OpenSource */}
        <div class="w-[20%] bg-[#ebf5ff] border border-gray-200 rounded-lg p-2">
          <div className="flex justify-between w-full">
                  <span className="text-gray-700 text-md">Open Source</span>
                  <Info className='w-3 h-3'/>
          </div>

          <div className='py-2'></div>
          {[...new Set(cards.map((open_source) => open_source.open_source))].map((source, i) => (
            <div key={i} className="py-1">
              <div 
                className={`flex items-center border border-gray-400 rounded-lg w-full h-8 cursor-pointer text-gray-600 transition overflow-y-auto py-1
                  ${
                    selectedOpenSource === source
                    ?`bg-[#004567]/90 text-white hover:bg-[#004567]`
                    :`text-gray-600 hover:text-white hover:bg-[#004567]/90 transition overflow-y-auto py-1`
                  }
                `}
                
                onClick={() => setSelectedOpenSource(source)}
              >
                <span className="text-[13px] font-medium pl-4">{source}</span>
              </div>
            </div>
          ))}
          </div>
        
      </div>
    </div>

  )
}

export default NewsPage