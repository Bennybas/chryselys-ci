import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Modules = ({setIsLoading}) => {
    const navigate = useNavigate();
    const [highlightCards, setHighlightCards] = useState(false);

    const cards = [
        {
            title: 'Daily CI Updates',
            Icon: '/png/1.png',
            path: '/daily-ci-updates',
            shouldHighlight: true,
            description: 'View latest CHMP regulatory updates and decisions'
        },
        {
            title: 'Multi-Alert News Letter',
            Icon: '/png/2.png',
            path: '/multi-alert',
            shouldHighlight: true,
            description: 'Access consolidated alerts and notifications'
        },
        {
            title: 'Daily News Letter',
            Icon: '/png/3.png',
            path: '/daily-news-letter',
            shouldHighlight: true,
            description: 'Read daily industry news and updates'
        },
        {
            "title": "IR Insights",
            "Icon": "/png/conference 1.png",
            "path": "/ir-insights",
            "shouldHighlight": true,
            "description": "Analyze drug efficacy, market trends, and regulatory insights."
        },
        {
            "title": "Regulatory Updates",
            "Icon": "/png/regulatory-compliance 1.png",
            "path": "/regulatory-updates",
            "shouldHighlight": true,
            "description": "Quickly access your latest searches for faster insights."
        }        
    ];

    useEffect(() => {
        const handleClick = (e) => {
            const isOutsideCards = !e.target.closest('.card-container');
            setHighlightCards(isOutsideCards);
            
            if (isOutsideCards) {
                setTimeout(() => {
                    setHighlightCards(false);
                }, 1000);
            }
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);


    const handleNavigation = (path, title) => {
        setIsLoading(true);
        setTimeout(() => {
          navigate(path, { state: { title } });
          setIsLoading(false); 
        }, 800); 
      };

    

    return (
        <div className="flex justify-center space-x-8 flex-wrap mt-[4rem]">
            {cards.map((card, index) => (
                <div
                key={index}
                onClick={() =>  handleNavigation(card.path, card.title)}
                
                className={`card-container w-[12rem] h-[24rem] bg-white shadow-lg rounded-full p-8 cursor-pointer transition-all duration-200 relative flex flex-col justify-between space-y-2
                    ${highlightCards && card.shouldHighlight 
                        ? 'ring-4 bg-[#3fbefc] shadow-lg transform scale-105' 
                        : 'hover:shadow-1xl'}
                    hover:shadow-xlg`}
            >
                {/* Icon Section */}
                <div className="flex items-center justify-center">
                    <div className="bg-gradient-to-br from-[#004567] to-[#c98b27] rounded-full shadow-xl border-[#e3e3e3] border-8 w-[8rem] h-[8rem] flex items-center justify-center overflow-hidden">
                        <img src={card.Icon} alt={card.title} className="w-[50%] h-[50%] object-contain" />
                    </div>

                </div>
            
                {/* Title */}
                <div className="text-center text-lg font-medium text-[#004567] px-1 py-4" 
                     style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight:800 }}>
                    {card.title}
                </div>
            
                {/* Description (Moved to Bottom) */}
                <div className="text-center text-xs text-gray-600 px-2 mt-auto" 
                     style={{ fontFamily: 'Roboto, sans-serif', fontSize: '10px' }}>
                    {card.description}
                </div>
            </div>
            
            ))}
        </div>
    );
};

export default Modules;