import React, { useState, useEffect } from 'react';
import { svgbg } from '../../assets/svgbg';

const BGtheme = () => {
    const [selectedBg, setSelectedBg] = useState(null);
    const [setColor, setShowColor] = useState(null);
    const [isOpen, setIsOpen] = useState(true);

    const handleClick = (bg, index) => {
        setSelectedBg(bg);
        if (index > Object.keys(svgbg).length - 6) {
            setShowColor('white');
            document.body.setAttribute('dark-theme', 'image');
        } else {
            setShowColor('black');
            document.body.setAttribute('dark-theme', 'light');
        }
    };

    useEffect(() => {
        document.documentElement.style.setProperty('--selected-bg', selectedBg ? `url(${selectedBg})` : 'none');
    }, [selectedBg]);

    useEffect(() => {
        document.documentElement.style.setProperty('--recent-color', setColor);
    }, [setColor]); 

    const toggleProfile = () => {
        setIsOpen(prev => !prev); 
      };

    return (
        <section className={`absolute flex flex-col justify-center items-center theme_box overflow-scroll w-48 rounded-xl p-3 ${isOpen ? 'block' : 'hidden'}`}>
             <div className='rounded-full flex justify-center items-center rotate-45 h- absolute right-0 top-1 cursor-pointer'>
         <div className='add dimension' onClick={toggleProfile} alt='code_icon' />
      </div>
            <div className="grid grid-cols-3 gap-3">
                {Object.entries(svgbg).map(([key, value], index) => (
                    <img
                        key={key}
                        src={value}
                        className="h-10 border border-white rounded w-10"
                        alt=""
                        onClick={() => handleClick(value, index)}
                    />
                ))}
            </div>
        </section>
    );
};

export default BGtheme;
