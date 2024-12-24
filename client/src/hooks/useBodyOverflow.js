import { useEffect } from "react";

const useBodyOverflow = (showModal) => {
    useEffect(() => {
        if (showModal) {
            document.body.classList.add("body--overflow-hidden");
        } else {
            document.body.classList.remove("body--overflow-hidden");
        }
    }, [showModal]);
};

export default useBodyOverflow;