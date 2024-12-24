import { Outlet, useLocation } from "react-router-dom"
import Nav from "../nav/Nav"
import ScrollUp from "../scrollUp/ScrollUp"
import Footer from "../footer/Footer"
import CookieConsent from "../cookieConsent/CookieConsent"

function Layout() {

    const location = useLocation()
    const hideConsentBanner = location.pathname === "/privacy"

    return (
        <>
        <Nav />
        <Outlet />
        <ScrollUp />
        <Footer />
        {!hideConsentBanner && <CookieConsent />}
        </>
    )
}

export default Layout