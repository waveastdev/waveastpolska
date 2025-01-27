import { useState, useEffect } from "react"
import { FaCheck } from "react-icons/fa"
import useBodyOverflow from "./useBodyOverflow"

const useInform = (title, message, okay) => {
    
    const [promise, setPromise] = useState(null)

    const inform = () => new Promise((resolve) => {
        setPromise({ resolve })
    })

    const handleClose = () => {
        setPromise(null)
    }

    const handleOkay = () => {
        promise?.resolve(false)
        handleClose()
    }

    useBodyOverflow(promise !== null)

    useEffect( () => {
        if(promise !== null) {
            document.body.classList.add("body--overflow-hidden")
        } else {
            document.body.classList.remove("body--overflow-hidden")
        }
    }, [promise])

    const InformationDialog = () => (
        promise !== null &&
        <div className="modal__backdrop" onClick={(e) => {
            if (e.target === e.currentTarget) {
                handleOkay()
            }
        }} >
            <div className="modal__box">
                <div className="modal__text">
                    <div className="modal__title">{title}</div>
                    <p className="modal__para">{message}</p>
                </div>
                <div className="btns-center">
                    <button className="btn btn--primary" onClick={handleOkay}>{okay} <FaCheck/></button>
                </div>
            </div>
        </div>
    )
    return [InformationDialog, inform]
}

export default useInform