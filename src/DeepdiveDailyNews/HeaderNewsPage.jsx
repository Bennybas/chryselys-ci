import React from 'react'
import { ArrowBigLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeaderNewsPage = ({Drug_name,tArea,setIsLoading}) => {
    const navigate = useNavigate();
    const handleNavigation = (path) => {
      setIsLoading(true);
      setTimeout(() => {
        navigate(path);
        setIsLoading(false); 
      }, 800); 
    };
  return (
    <div className='px-8 fixed top-[5rem] left-0 w-full z-10'> 
      <header className="bg-white text-gray-600 flex items-center py-2 border-2 border-gray-200 shadow-sm rounded-b-lg mx-auto -mt-2">
        <div className="flex px-4 space-x-4 items-start">
          
          <ArrowBigLeft className="text-[#c98b27] w-8 h-8
                 cursor-pointer 
                 transform transition-all duration-300 ease-in-out
                 hover:scale-110 hover:-translate-x-2
                 active:scale-90
                 hover:text-[#c98b27]
                 hover:drop-shadow-xl"
          onClick={() => handleNavigation('/daily-news-letter')}
          />
         
        </div>
        <div className="flex-grow flex justify-center items-center">
            <span
              className="text-lg font-large "
              style={{ fontFamily: 'Roboto, sans-serif', color: '#004567', fontSize:'16px' }}
            >
                {`${tArea}(${Drug_name})`}
            </span>
          </div>
      </header>
    </div>
  )
}

export default HeaderNewsPage