import React from "react";
import We from "../components/svg/We";

export const wrapWe = (text) => {
  const parts = text.split(/(we)/i);
  return parts.map((part, index) => (
    <React.Fragment key={index}>
      {part.toLowerCase() === "we" ? <span className="we"><We /></span> : part}
    </React.Fragment>
  ));
};