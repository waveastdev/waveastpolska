import { useState, useEffect, useRef, memo, useContext } from "react"
import { Link as LinkRouter, NavLink } from "react-router-dom"
import { BiGlobe, BiSolidSun, BiMoon, BiX, BiMenu } from "react-icons/bi"
import { useTranslation } from "react-i18next"
import { availableLanguages } from "../../data/availableLanguages"
import { LanguageContext } from "../../contexts/LanguageContext"
import useBodyOverflow from "../../hooks/useBodyOverflow"
import "./nav.css"

const navLinks = [
    {id: 1, nameKey:"nav.navLinks.0", path:"/"},
    {id: 2, nameKey:"nav.navLinks.1", path:"/about"},
    {id: 3, nameKey:"nav.navLinks.2", path:"/services"},
    {id: 4, nameKey:"nav.navLinks.3", path:"/projects"},
    {id: 5, nameKey:"nav.navLinks.4", path:"/contact"}
]

const Nav = memo(function Nav() {

    const [isMenuShown, setIsMenuShown] = useState(false)
    const [isLanguageBoxShown, setIsLanguageBoxShown] = useState(false)
    const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("dark-mode")) || false)
    const languageBoxRef = useRef(null);
    const timeoutRef = useRef(null);

    const {t} = useTranslation()
    const {currentLanguage, handleCurrentLanguageChange} = useContext(LanguageContext)

    const handleLanguageIconClick = () => {
        setIsLanguageBoxShown(prevState => !prevState)
    }

    const handleLanguageIconOver = () => {
        setIsLanguageBoxShown(true)
    }
    
    const handleLanguageIconOut = () => {
        clearTimeout(timeoutRef.current)
    
        timeoutRef.current = setTimeout(() => {
          setIsLanguageBoxShown(false)
        }, 300)
    }
    
    const handleLanguageBoxMouseEnter = () => {
        clearTimeout(timeoutRef.current)
    }
    
    const handleLanguageBoxMouseLeave = () => {
        handleLanguageIconOut();
    }
    
    useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current)
        }
    }, [])

    const handleLanguageChange = (ID) => {
        const selectedLanguage = availableLanguages.find(language => language.id === ID)
        
        if (selectedLanguage) {
            handleCurrentLanguageChange(selectedLanguage.symbol)
            localStorage.setItem("lng", selectedLanguage.symbol)
        }
        setIsLanguageBoxShown(false)
    }

    const handleEnter = (e) => {
        if (e.keyCode === 13) {
            setIsMenuShown(prevIsMenuShown => !prevIsMenuShown)
        }
    }

    const handleClick = () => {
        setIsMenuShown(prevIsMenuShown => !prevIsMenuShown)
    }

    useBodyOverflow(isMenuShown);

    useEffect(() => {
        function windowResize() {
            setIsMenuShown(false)
        }
        window.addEventListener("resize", windowResize)
        return () => {
            window.removeEventListener("resize", windowResize)
        }
    }, [])

    function handleThemeChange() {
        setDarkMode(!darkMode)
    }

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("body--dark")
        } else {
            document.body.classList.remove("body--dark")
        }
        localStorage.setItem("dark-mode", JSON.stringify(darkMode))
    }, [darkMode])

    return (
            <header className="header">
                <nav className="nav nav__container">
                    <LinkRouter className="nav__logo" to="/">
                        <svg className="nav__logo-img" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={t(`nav.logoLabel`)} viewBox="0 0 420 169">
                            <path d="M319 26c4.15 3.521 8.1 7.205 12 11l1.787 1.725a949 949 0 0 1 5.463 5.337l1.738 1.699c1.377 1.374 2.7 2.802 4.012 4.239v2h2c1.305 1.293 1.305 1.293 2.875 3.188 3.306 3.88 6.68 7.681 10.125 11.437.518.565 1.035 1.13 1.569 1.71 2.76 2.975 5.549 5.761 8.681 8.353L372 79v2l1.637.781c2.808 1.448 5.474 3.082 8.176 4.719 9.58 5.574 15.37 5.866 26.187 3.5.313 3.25.313 3.25 0 7-3.332 3.517-6.29 4.726-11.008 5.203-14.816.328-26.904-7.765-37.387-17.648L357 82l-1.58-1.538c-5.905-5.763-11.731-11.562-17.053-17.876-1.365-1.638-1.365-1.638-3.047-3.172C334 58 334 58 334 56h-2v-2h-2a402 402 0 0 1-3.477-4.238C323.674 46.467 320.36 43.76 317 41l-2.879-2.387C301.636 28.503 286.591 18.923 270 19c-3.846.533-7.515 1.257-11 3l2.492.262c12.82 1.613 20.718 5.54 28.695 15.738 5.113 6.69 6.014 13.718 5.813 22-2.14 12.496-8.873 21.621-19 29-16.359 10.506-35.818 9.26-54.016 5.418-10.482-2.381-20.78-5.527-31.066-8.634-2.96-.795-5.889-1.33-8.918-1.784l-.043 1.793c-.263 4.36-.5 6.626-3.27 10.144-6.54 5.02-12.605 4.781-20.687 4.063-5.312-1.365-10.131-3.51-15-6l-.625 1.813c-2.054 3.268-3.704 3.88-7.375 5.187-9.587 1.539-18.265 1.939-26.375-3.875-2.671-2.1-4.89-4.182-6.625-7.125.313-2.25.313-2.25 1-4l2.012.84 2.675 1.097 2.637 1.09c6.84 2.487 14.673 3.224 21.676 1.035 3.05-3.146 3.922-6.883 5-11.062 3.325.619 5.406 1.831 8.125 3.813C153.892 88.097 160.579 90.608 170 90c.553-2.076 1-3.844 1-6q-2.374-.72-4.75-1.437l-2.672-.81A141 141 0 0 0 157 80v-3q2.087-1.23 4.188-2.437l2.355-1.372C175.536 67.376 190.958 71.412 203 75q4.567 1.346 9.137 2.687 3.091.913 6.176 1.85c17.024 5.102 34.133 7.54 50.507-1.01 6.887-4.347 11.324-9.852 13.868-17.629 1.02-5.34-.32-10.135-2.688-14.898-4.07-4.928-8.572-8.253-15-9-7.476-.498-13.703.305-19.652 5.168a189 189 0 0 0-5.086 4.871c-2.21 1.917-3.41 2.582-6.262 2.961-3.06-6.12-1.52-16.599.5-22.875 4.056-9.478 10.414-14.66 19.57-19.031C276.994-.465 301.22 12.124 319 26" fill="var(--moonstone)" />
                            <path d="M129 107q4.125-.08 8.25-.125l2.355-.05c7.946-.069 7.946-.069 10.395 2.175a53 53 0 0 1 2.063 7.313l.49 2.148q.499 2.19.977 4.385c.445 2.04.911 4.072 1.388 6.103q1.059 4.522 2.082 9.051l.975-1.462 1.369-2.054 1.518-2.277 3.286-4.927c2.468-3.702 4.936-7.404 7.395-11.112l2.144-3.23 1.887-2.848C177 108 177 108 178 107a98 98 0 0 1 5.346-.114h3.458l3.762.016 3.83.005q5.047.007 10.096.024 5.147.014 10.295.02 10.106.017 20.213.049c-.875 7.75-.875 7.75-2 10l-24 1-3 10h17c-1 7-1 7-2 11h-18l-1 8 16 1v-3h9c.503 5.286-.653 7.91-4 12-3.861 2.829-8.35 2.252-12.922 2.195l-2.606-.008c-2.74-.011-5.481-.037-8.222-.062q-2.79-.016-5.582-.027-6.834-.035-13.668-.098c.611-5.703 1.64-11.105 3.066-16.656l.601-2.387q.943-3.73 1.895-7.457l1.288-5.094A5809 5809 0 0 1 190 115h-4l-.734 2.094c-1.484 3.407-3.423 6.355-5.516 9.406l-2.684 3.953-1.476 2.174a570 570 0 0 0-5.188 7.92l-1.864 2.861a786 786 0 0 0-3.627 5.621l-1.712 2.612-1.505 2.329c-2.083 2.496-3.712 3.704-6.694 5.03-2.696.21-5.135.287-7.812.188l-2.1-.042A384 384 0 0 1 140 159a9939 9939 0 0 1-3.418-16.87 4013 4013 0 0 0-1.164-5.738q-.839-4.125-1.668-8.251l-.53-2.59-.486-2.425-.43-2.126c-.304-2-.304-2-.304-6h-5c.875-5.75.875-5.75 2-8" fill="var(--moonstone)" />
                            <path d="M8 107c2.75-.081 5.499-.14 8.25-.187l2.355-.077c3.48-.044 5.768-.07 8.88 1.588 3.255 3.6 2.833 8.267 3.078 12.864l.13 2.271q.158 2.77.307 5.541l1.086-1.912q2.423-4.264 4.852-8.525l1.708-3.01 1.631-2.862 1.508-2.65C43 108 43 108 44 107a99 99 0 0 1 5.813-.187l3.207-.043c2.927.226 4.555.62 6.98 2.23 1.09 2.178 1.28 3.72 1.535 6.133l.239 2.2.288 2.792L63 129l12-22h12c-.525 4.58-1.686 7.607-4.125 11.5-2.578 4.259-4.94 8.526-7.125 13-4.588 9.343-9.687 18.408-14.75 27.5-2.083.054-4.166.093-6.25.125l-3.516.07c-3.08-.186-4.713-.478-7.234-2.195-1.174-2.349-1.115-3.738-1.098-6.352l.01-2.578.026-2.695.013-2.719q.018-3.328.049-6.656h-2l-.766 2.55c-1.343 3.754-3.045 7.17-4.984 10.637l-.977 1.866C31.848 155.39 29.696 157.388 25 159c-3.43.293-3.43.293-6.875.188l-3.492-.083L12 159c-.8-5.602-1.137-11.002-1.098-16.656l.005-2.387c.005-2.486.018-4.971.03-7.457q.009-2.547.014-5.094.017-6.202.049-12.406H8zm337 5c1 1 1 1 1.063 4.563L346 120a418 418 0 0 1-3.812 2l-2.145 1.125C338 124 338 124 335 124l-1-5c-3.688-1.18-7.151-1.21-11-1l-3 2v2l3.543 1.355 4.644 1.832 2.33.885c4.764 1.902 8.295 3.734 11.483 7.928 1.02 4.67.623 9.351-1.062 13.813-7.018 7.923-14.547 11.723-25.172 12.39-8.756.117-15.646-.176-22.829-5.453-2.437-3.46-2.343-5.607-1.937-9.75 1.264-.7 2.537-1.384 3.813-2.062l2.144-1.16C299 141 299 141 302 142l.875 1.938c.984 2.224.984 2.224 3.25 3.312 4.515 1.178 8.783 1.394 13.313 0 1.982-1.586 2.232-2.776 2.562-5.25l-2.621-.855C302.708 135.497 302.708 135.497 299 130c-1.42-4.276-1.183-7.364.063-11.687C302.62 112.23 307.43 109.266 314 107c10.996-1.92 21.872-2.074 31 5" fill="var(--moonstone)" />
                            <path d="M252 107c3.25-.058 6.5-.094 9.75-.125.92-.017 1.84-.034 2.79-.05l2.694-.02 2.476-.032c2.642.262 4.121.684 6.29 2.227 2.182 4.05 2.854 8.594 3.727 13.074l.462 2.319q.48 2.413.953 4.828.728 3.704 1.467 7.406l.93 4.697.445 2.241C285 148.767 285 148.767 285 151h4l-1 8c-2.73.081-5.457.14-8.187.188l-2.33.076c-4.597.059-7.888-.056-11.483-3.264-.926-2.48-.926-2.48-1.312-5.187l-.426-2.731L264 146c-8.591-.478-8.591-.478-17 1-3.454 3.23-5.193 6.674-7 11-1 1-1 1-3.723 1.098l-3.34-.036-3.347-.027L227 159c.46-5.372 3.441-9.238 6.313-13.625l3.253-5.059 1.704-2.632c2.86-4.436 5.667-8.905 8.48-13.371l4.339-6.87L252 116l-1-1c.176-2.69.618-5.329 1-8m7 20c-2.937 3.652-2.937 3.652-4 8h7l-2-8z" fill="var(--moonstone)" />
                            <path d="m106.313 106.75 2.63-.062 2.545-.016 2.33-.028c2.877.47 4.133 1.28 6.182 3.356.973 2.66.973 2.66 1.633 5.848l.754 3.525.738 3.69.762 3.607c.722 3.44 1.419 6.884 2.113 10.33l.624 2.96.556 2.661.484 2.29C128 147 128 147 128 151h5c-.875 6.875-.875 6.875-2 8-2.598.154-5.15.232-7.75.25l-2.172.063c-4.513.033-7.647-.264-11.078-3.313-.961-3.372-.862-6.463-1-10H91c-1.446 3.608-1.446 3.608-2.832 7.238-1.166 2.467-2.066 3.992-4.168 5.762-4.405.7-8.577.466-13 0 .565-4.338 2.115-7.102 4.535-10.719l2.205-3.328 2.323-3.453a3204 3204 0 0 0 4.472-6.719l1.113-1.671c3.94-5.942 7.657-12.014 11.352-18.11h-2c1.165-9.15 2.786-8.2 11.313-8.25M103 126l-5 9h8l-.375-3.937c-.07-.731-.14-1.462-.21-2.215L105 127z" fill="var(--moonstone)" />
                            <path d="M400 103c1.945-.293 1.945-.293 4.125-.187L408 103c-.278 5.366-.664 8.571-4.393 12.792-3.031 2.28-6.286 1.836-9.92 1.583l-2.244-.082A220 220 0 0 1 386 117l-.332 1.969c-1.263 7.238-2.875 14.345-4.668 21.469-.26 1.061-.52 2.123-.79 3.216l-.772 3.092-.692 2.771c-1.104 3.674-1.967 5.893-5.058 8.233-5.52 1.871-10.913 1.481-16.688 1.25 1.467-9.214 3.753-18.176 6.125-27.187l1.129-4.33Q365.62 122.238 367 117l-9 1-1 3h-9c.466-4.754 1.127-8.133 4-12 3.09-2.06 3.76-2.251 7.256-2.271l2.589-.031 2.784-.007 5.822-.076q4.596-.044 9.191-.071c2.954-.022 5.908-.061 8.862-.103h2.79l2.58-.04 2.273-.016c2.266-.245 2.266-.245 3.853-3.385" fill="var(--moonstone)" />
                        </svg>
                    </LinkRouter>
                    <div className={`nav__overlay ${isMenuShown ? "nav__overlay--show" : ""}`} onClick={handleClick}></div>
                    <ul className={`nav__menu ${isMenuShown ? "nav__menu--show" : ""}`}>
                        {navLinks.map((navLink) => (
                            <li className="nav__list" key={navLink.id}>
                                <NavLink className={({ isActive }) => (isActive ? "nav__link nav__link--active" : "nav__link")} to={navLink.path} onClick={() => setIsMenuShown(false)}>
                                    {t(navLink.nameKey)}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    <div className="nav__settings">
                        <div className="nav__mode">
                            <BiSolidSun />
                            <input className="nav__checkbox-item" onClick={handleThemeChange} name="dark-mode" type="checkbox" aria-label={t(`nav.darkInputAriaLabel`)} />
                            <BiMoon />
                        </div>
                        <div className="nav__language">
                            <div className="nav__language-icon" onMouseEnter={handleLanguageIconOver} onMouseLeave={handleLanguageIconOut} onKeyDown={handleLanguageIconClick} tabIndex={0}><BiGlobe /></div>
                            <div className={`nav__language-box ${!isLanguageBoxShown ? "nav__language-box--hidden" : ""}`} ref={languageBoxRef} onMouseEnter={handleLanguageBoxMouseEnter} onMouseLeave={handleLanguageBoxMouseLeave} >
                                {availableLanguages.map(language => (
                                    <div key={language.id} className={`nav__language-radios ${currentLanguage === language.symbol ? "nav__language-radios--active" : ""}`} >
                                        <input 
                                            className="nav__language-radio" 
                                            aria-label={t(`nav.langIconAriaLabel`)}
                                            type="radio" 
                                            name="language" 
                                            id={`languageNav-${language.id}`} 
                                            value={language.id} 
                                            checked={currentLanguage === language.symbol} 
                                            onChange={() => handleLanguageChange(language.id)} 
                                            required 
                                        />
                                        <label htmlFor={`languageNav-${language.id}`}>{language.name}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="nav__humberger" onClick={handleClick} onKeyDown={handleEnter} tabIndex={0}>
                        <BiMenu className={`nav__open ${isMenuShown ? "nav__open--hide" : ""}`} />
                        <BiX className={`nav__close ${!isMenuShown ? "nav__close--hide" : ""}`} />
                    </div>
                </nav>
            </header>
    )
})

export default Nav