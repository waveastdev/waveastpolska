import React from "react";

export const wrapWe = (text) => {
    const parts = text.split(/(we)/i); 
    return parts.map((part, index) => (
        <React.Fragment key={index}>
            {part.toLowerCase() === 'we' ? <span className="we">we</span> : part}
        </React.Fragment>
    ));
};