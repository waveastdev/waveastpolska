import { BiX } from "react-icons/bi"
import PropTypes from "prop-types"
import "./detailModal.css"

function DetailModal({title, content, showDetailModal, closeDetailModal}) {

    return (
        <div className={`detail__overlay ${showDetailModal ? "" : "detail__overlay--hide"}`}  onClick={(event) => {if (event.target === event.currentTarget) {closeDetailModal();}}} >
            <div className="detail__modal">
                <div className="detail__header">
                    <div className="detail__title">{title}</div>
                    <button className="detail__close" onClick={closeDetailModal} ><BiX /></button>
                </div>
                <div className="detail__content">
                    {content.map((paragraph, index) => {
                        return <p key={index}>{paragraph}</p>
                    })}
                </div>
            </div>
        </div>
    )
}

DetailModal.propTypes = {
    title: PropTypes.any,
    content: PropTypes.any,
    showDetailModal: PropTypes.bool,
    closeDetailModal: PropTypes.func
}

export default DetailModal