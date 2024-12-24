import React from "react"


export const wrapCompanyName = (text) => {
    const parts = text.split('Waveast');
    return parts.map((part, index) => (
        <React.Fragment key={index}>
            {part}
            {index < parts.length - 1 && <span className="company-name">Waveast</span>}
        </React.Fragment>
    ))
}