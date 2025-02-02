import React, { useEffect, useState } from 'react';
import { CircleX } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import HeaderDailyNews from './HeaderDailyNews';
import { fetchNewsletters } from '../api/newsletterApi';

const DailyNewsLetter = ({ setIsLoading }) => {
    const navigate = useNavigate();
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [flipped, setFlipped] = useState({});

    const location = useLocation();
    const [title, setTitle] = useState(localStorage.getItem("pageTitle") || "Error");

    useEffect(() => {
        if (location.state?.title) {
            setTitle(location.state.title);
            localStorage.setItem("pageTitle", location.state.title);
        }
    }, [location.state]);

    useEffect(() => {
        const loadNewsletters = async () => {
            try {
                setLoading(true);
                const data = await fetchNewsletters();
                setCards(data);
                setError(null);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching newsletters:', err);
            } finally {
                setLoading(false);
            }
        };

        loadNewsletters();
    }, []);

    const handleDrugClick = (drug, e, title) => {
        e.stopPropagation();
        setIsLoading(true);
        setTimeout(() => {
            navigate('/daily-news-letter/newspage', { 
                state: { indication: drug, title: title } 
            });
            setIsLoading(false);
        }, 800);
    };

    const handleCloseClick = (index, e) => {
        e.stopPropagation();
        setFlipped(prev => ({ ...prev, [index]: false }));
    };

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <div>
            <div>
                <HeaderDailyNews title={title} setIsLoading={setIsLoading} />
            </div>

            <div className="flex flex-col gap-4 px-8 w-full pt-[7.5rem]">
                {cards.length > 0 ? (
                    [0, 1].map((rowIndex) => (
                        <div key={rowIndex} className="flex justify-center gap-4">
                            {cards.slice(rowIndex * 3, (rowIndex + 1) * 3).map((card, index) => {
                                const cardIndex = rowIndex * 3 + index;
                                return (
                                    <div
                                        key={cardIndex}
                                        className="relative w-full max-w-[250px] min-h-[16rem]"
                                        style={{ perspective: '1000px' }}
                                    >
                                        <div 
                                            onClick={() => setFlipped(prev => ({ 
                                                ...prev, 
                                                [cardIndex]: !prev[cardIndex] 
                                            }))}
                                            className={`relative w-full h-full transition-transform duration-500 cursor-pointer`}
                                            style={{ 
                                                transformStyle: 'preserve-3d',
                                                transform: flipped[cardIndex] ? 'rotateY(180deg)' : 'rotateY(0deg)'
                                            }}
                                        >
                                            {/* Front Side */}
                                            <div 
                                                className="absolute w-full h-full backface-hidden bg-white border border-gray-300 rounded-xl p-4 flex flex-col items-center justify-between"
                                                style={{ backfaceVisibility: 'hidden' }}
                                            >
                                                <div className="flex items-center justify-center h-[150px] w-full">
                                                    <img
                                                        src={card.icon}
                                                        alt={card.title}
                                                        className="max-w-[50%] max-h-[100%] object-contain"
                                                    />
                                                </div>
                                                <div className="text-center w-full">
                                                    <h2 className="text-lg" style={{ fontSize: '15px', fontWeight: 500 }}>
                                                        {card.title}
                                                    </h2>
                                                </div>
                                            </div>

                                            {/* Back Side */}
                                            <div 
                                                className="absolute w-full h-full bg-[#a0d8ef] border border-gray-300 rounded-xl p-4"
                                                style={{ 
                                                    backfaceVisibility: 'hidden',
                                                    transform: 'rotateY(180deg)'
                                                }}
                                            >
                                                <CircleX 
                                                    className="absolute top-2 right-2 w-4 h-4 cursor-pointer hover:text-gray-700"
                                                    onClick={(e) => handleCloseClick(cardIndex, e)}
                                                />
                                                <div className="h-full overflow-y-auto mt-6">
                                                    <div className="flex flex-col gap-2">
                                                        {card.drugs.map((drug, i) => (
                                                            <button
                                                                key={i}
                                                                className="bg-[#004567]/70 text-white px-4 py-2 rounded-md shadow-md hover:bg-[#004567]/90 transition"
                                                                onClick={(e) => handleDrugClick(drug, e, card.title)}
                                                                style={{fontSize: '12px'}}
                                                            >
                                                                {drug}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))
                ) : (
                    <p className="text-center">No data available</p>
                )}
            </div>
        </div>
    );
};

export default DailyNewsLetter;
