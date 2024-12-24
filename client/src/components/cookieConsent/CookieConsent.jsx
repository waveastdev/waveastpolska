import { useEffect, useState, memo } from "react"
import { getUserCookies, setUserCookies } from "../../utils/manageUserCookies"
import FirstBanner from "./FirstBanner"
import SecondBanner from "./SecondBanner"

const CookieConsent = memo(function CookieConsent() {

  const [isVisible, setIsVisible] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [preferences, setPreferences] = useState({essential: true, analytics: false, targeting: false})

  useEffect(() => {
    const consent = getUserCookies()
    if (!consent) {
        setIsVisible(true)
    }
  }, [])

  const handleAcceptAll = () => {
    setUserCookies({essential: true, analytics: true, targeting: true})
    setIsVisible(false)
  }

  const handleRejectAll = () => {
    setUserCookies({essential: true, analytics: false, targeting: false})
    setIsVisible(false)
  }

  const handleShowPreferences = () => {
    setShowModal(true)
    setIsVisible(false)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setIsVisible(true)
  }

  const handleCloseModalEnter = (e) => {
    if (e.keyCode === 13) {
      handleCloseModal()
    }
  }

  const handleSaveSettings = () => {
    setUserCookies(preferences)
    setIsVisible(false)
    setShowModal(false)
  }

  const handleCheckboxChange = (name, checked) => {
    setPreferences((prev) => ({ ...prev, [name]: checked }))
  }

  return (

  <>
    {isVisible && <FirstBanner handleShowPreferences={handleShowPreferences}
                                handleAcceptAll={handleAcceptAll} 
                                handleRejectAll={handleRejectAll} />
    }

    {showModal && <SecondBanner preferences={preferences} 
                                handleCloseModal={handleCloseModal} 
                                handleCloseModalEnter={handleCloseModalEnter} 
                                handleCheckboxChange={handleCheckboxChange} 
                                handleSaveSettings={handleSaveSettings} />

      }
  </>
  )
})

export default CookieConsent