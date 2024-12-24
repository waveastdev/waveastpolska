import { useState, useEffect, memo } from "react"
import { FaArrowUp } from "react-icons/fa"
import { useTranslation } from "react-i18next"
import "./scrollUp.css"

const ScrollUp = memo(function ScrollUp() {

    const [isPageOnScroll, setIsPageOnScroll] = useState(false)
    const {t} = useTranslation()

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    useEffect(() => {
        function handlePageOnScroll() {
            window.scrollY > "700" ? setIsPageOnScroll(true) : setIsPageOnScroll(false)
        }
        window.addEventListener("scroll", handlePageOnScroll)
        return () => {
            window.removeEventListener("scroll", handlePageOnScroll)
        }
    }, [])
    
    return (
        <>
        {
            isPageOnScroll && 
            <button className="scrollup" onClick={handleScrollToTop} aria-label={t(`scrollUpAriaLabel`)} >
                <span className="scrollup__icon"><FaArrowUp /></span>
            </button>
        }
        </>
    )
})

export default ScrollUp