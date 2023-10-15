import React from 'react';
import './Subtitle.css';

function Subtitle({ className, children }) {
    return (
        <h2 className={`subtitle ${className}`}>{children}</h2>
    );
};

export default Subtitle;