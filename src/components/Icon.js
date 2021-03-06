import React from 'react';

const Icon = ({src, alt}) => {
        return (
            <img 
                src={src} 
                alt={alt} 
                className={`challenge-icon char-${alt} `} 
            />
        );
}

export default Icon;
