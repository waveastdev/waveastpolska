import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const ScrollToTop = () => {
    const { pathname, hash } = useLocation()

    useEffect(() => {
        if (!hash) {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
        } else {
            const targetElement = document.querySelector(hash)
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
        }
    }, [pathname, hash])

    return null
};

export default ScrollToTop