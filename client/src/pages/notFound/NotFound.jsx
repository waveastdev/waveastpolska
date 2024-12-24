import { Link as LinkRouter} from "react-router-dom"
import { useTranslation } from "react-i18next"
import "./notFound.css"

function NotFound() {

    const {t} = useTranslation()
    
    return (
        <div className="notfound container">
            <div className="notfound__title">404</div>
            <div>{t(`notFound.pageNotFound`)}</div>
            <div className="notfound__image">
                <svg xmlns="http://www.w3.org/2000/svg" width="653" height="176" viewBox="0 0 653 176" preserveAspectRatio="xMidYMid meet" >
                    <g transform="translate(0.000000,176.000000) scale(0.100000,-0.100000)" fill="var(--moonstone)" stroke="none" >
                        <path d="M1808 1749 c-193 -28 -345 -101 -486 -234 -140 -130 -220 -283 -267 -507 l-5 -27 -484 -3 c-474 -3 -485 -3 -513 -24 -15 -12 -35 -33 -43 -47 -13 -24 -13 -30 0 -54 8 -14 28 -35 43 -47 28 -21 39 -21 513 -24 l484 -3 5 -27 c47 -221 126 -375 261 -503 116 -109 245 -181 397 -221 76 -20 113 -22 493 -25 450 -5 471 -3 531 50 76 67 73 26 73 827 0 670 -2 718 -19 755 -23 51 -79 101 -128 114 -45 13 -769 13 -855 0z" />
                        <path d="M3866 1748 c-51 -14 -118 -81 -134 -134 -7 -24 -12 -98 -12 -172 l0 -131 -277 -3 c-259 -3 -280 -4 -313 -24 -19 -11 -41 -33 -49 -48 -12 -25 -11 -33 3 -63 28 -59 51 -63 361 -63 l275 0 0 -230 0 -230 -275 0 c-310 0 -333 -4 -361 -63 -14 -30 -15 -38 -3 -63 8 -15 30 -37 49 -48 33 -20 54 -21 313 -24 l277 -3 0 -131 c0 -157 11 -199 66 -255 64 -63 84 -66 554 -61 374 4 411 6 482 26 330 91 574 344 644 669 l17 82 483 3 c472 3 483 3 511 24 15 12 35 33 43 47 13 24 13 30 0 54 -8 14 -28 35 -43 47 -28 21 -39 21 -511 24 l-483 3 -17 82 c-70 325 -313 578 -644 669 -72 20 -105 22 -497 24 -277 2 -433 -1 -459 -8z" />
                    </g>
                </svg>
            </div>
            <LinkRouter className="btn btn--primary" to="/">{t(`notFound.goBack`)}</LinkRouter>
        </div>
    )
}

export default NotFound