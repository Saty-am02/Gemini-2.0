import React, { useState, useEffect } from 'react';
import { svgbg } from '../../assets/svgbg';

const BGtheme = () => {
    const [selectedBg, setSelectedBg] = useState(null);

    const handleClick = (bg) => {
        setSelectedBg(bg);
    };

    // Update the CSS variable when selectedBg changes
    useEffect(() => {
        document.documentElement.style.setProperty('--selected-bg', selectedBg ? `url(${selectedBg})` : 'none');
    }, [selectedBg]);

    return (
        <section className="absolute flex flex-col justify-center items-center backdrop:inset-0 bg-mainBG-200 h-42 overflow-scroll w-48 rounded-xl p-3 border-white border-2">
            <div className="grid grid-cols-3 gap-3">
                {Object.entries(svgbg).map(([key, value]) => (
                    <img
                        key={key}
                        src={value}
                        className="h-10 border border-white rounded w-10"
                        alt=""
                        onClick={() => handleClick(value)}
                        none
                    />
                ))}
            </div>
        </section>
    );
};

export default BGtheme;
