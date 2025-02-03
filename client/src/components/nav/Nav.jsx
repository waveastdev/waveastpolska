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
                        {/* <svg className="nav__logo-img" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={t(`nav.logoLabel`)} viewBox="0 0 420 169">
                            <path d="M319 26c4.15 3.521 8.1 7.205 12 11l1.787 1.725a949 949 0 0 1 5.463 5.337l1.738 1.699c1.377 1.374 2.7 2.802 4.012 4.239v2h2c1.305 1.293 1.305 1.293 2.875 3.188 3.306 3.88 6.68 7.681 10.125 11.437.518.565 1.035 1.13 1.569 1.71 2.76 2.975 5.549 5.761 8.681 8.353L372 79v2l1.637.781c2.808 1.448 5.474 3.082 8.176 4.719 9.58 5.574 15.37 5.866 26.187 3.5.313 3.25.313 3.25 0 7-3.332 3.517-6.29 4.726-11.008 5.203-14.816.328-26.904-7.765-37.387-17.648L357 82l-1.58-1.538c-5.905-5.763-11.731-11.562-17.053-17.876-1.365-1.638-1.365-1.638-3.047-3.172C334 58 334 58 334 56h-2v-2h-2a402 402 0 0 1-3.477-4.238C323.674 46.467 320.36 43.76 317 41l-2.879-2.387C301.636 28.503 286.591 18.923 270 19c-3.846.533-7.515 1.257-11 3l2.492.262c12.82 1.613 20.718 5.54 28.695 15.738 5.113 6.69 6.014 13.718 5.813 22-2.14 12.496-8.873 21.621-19 29-16.359 10.506-35.818 9.26-54.016 5.418-10.482-2.381-20.78-5.527-31.066-8.634-2.96-.795-5.889-1.33-8.918-1.784l-.043 1.793c-.263 4.36-.5 6.626-3.27 10.144-6.54 5.02-12.605 4.781-20.687 4.063-5.312-1.365-10.131-3.51-15-6l-.625 1.813c-2.054 3.268-3.704 3.88-7.375 5.187-9.587 1.539-18.265 1.939-26.375-3.875-2.671-2.1-4.89-4.182-6.625-7.125.313-2.25.313-2.25 1-4l2.012.84 2.675 1.097 2.637 1.09c6.84 2.487 14.673 3.224 21.676 1.035 3.05-3.146 3.922-6.883 5-11.062 3.325.619 5.406 1.831 8.125 3.813C153.892 88.097 160.579 90.608 170 90c.553-2.076 1-3.844 1-6q-2.374-.72-4.75-1.437l-2.672-.81A141 141 0 0 0 157 80v-3q2.087-1.23 4.188-2.437l2.355-1.372C175.536 67.376 190.958 71.412 203 75q4.567 1.346 9.137 2.687 3.091.913 6.176 1.85c17.024 5.102 34.133 7.54 50.507-1.01 6.887-4.347 11.324-9.852 13.868-17.629 1.02-5.34-.32-10.135-2.688-14.898-4.07-4.928-8.572-8.253-15-9-7.476-.498-13.703.305-19.652 5.168a189 189 0 0 0-5.086 4.871c-2.21 1.917-3.41 2.582-6.262 2.961-3.06-6.12-1.52-16.599.5-22.875 4.056-9.478 10.414-14.66 19.57-19.031C276.994-.465 301.22 12.124 319 26" fill="var(--moonstone)" />
                            <path d="M129 107q4.125-.08 8.25-.125l2.355-.05c7.946-.069 7.946-.069 10.395 2.175a53 53 0 0 1 2.063 7.313l.49 2.148q.499 2.19.977 4.385c.445 2.04.911 4.072 1.388 6.103q1.059 4.522 2.082 9.051l.975-1.462 1.369-2.054 1.518-2.277 3.286-4.927c2.468-3.702 4.936-7.404 7.395-11.112l2.144-3.23 1.887-2.848C177 108 177 108 178 107a98 98 0 0 1 5.346-.114h3.458l3.762.016 3.83.005q5.047.007 10.096.024 5.147.014 10.295.02 10.106.017 20.213.049c-.875 7.75-.875 7.75-2 10l-24 1-3 10h17c-1 7-1 7-2 11h-18l-1 8 16 1v-3h9c.503 5.286-.653 7.91-4 12-3.861 2.829-8.35 2.252-12.922 2.195l-2.606-.008c-2.74-.011-5.481-.037-8.222-.062q-2.79-.016-5.582-.027-6.834-.035-13.668-.098c.611-5.703 1.64-11.105 3.066-16.656l.601-2.387q.943-3.73 1.895-7.457l1.288-5.094A5809 5809 0 0 1 190 115h-4l-.734 2.094c-1.484 3.407-3.423 6.355-5.516 9.406l-2.684 3.953-1.476 2.174a570 570 0 0 0-5.188 7.92l-1.864 2.861a786 786 0 0 0-3.627 5.621l-1.712 2.612-1.505 2.329c-2.083 2.496-3.712 3.704-6.694 5.03-2.696.21-5.135.287-7.812.188l-2.1-.042A384 384 0 0 1 140 159a9939 9939 0 0 1-3.418-16.87 4013 4013 0 0 0-1.164-5.738q-.839-4.125-1.668-8.251l-.53-2.59-.486-2.425-.43-2.126c-.304-2-.304-2-.304-6h-5c.875-5.75.875-5.75 2-8" fill="var(--moonstone)" />
                            <path d="M8 107c2.75-.081 5.499-.14 8.25-.187l2.355-.077c3.48-.044 5.768-.07 8.88 1.588 3.255 3.6 2.833 8.267 3.078 12.864l.13 2.271q.158 2.77.307 5.541l1.086-1.912q2.423-4.264 4.852-8.525l1.708-3.01 1.631-2.862 1.508-2.65C43 108 43 108 44 107a99 99 0 0 1 5.813-.187l3.207-.043c2.927.226 4.555.62 6.98 2.23 1.09 2.178 1.28 3.72 1.535 6.133l.239 2.2.288 2.792L63 129l12-22h12c-.525 4.58-1.686 7.607-4.125 11.5-2.578 4.259-4.94 8.526-7.125 13-4.588 9.343-9.687 18.408-14.75 27.5-2.083.054-4.166.093-6.25.125l-3.516.07c-3.08-.186-4.713-.478-7.234-2.195-1.174-2.349-1.115-3.738-1.098-6.352l.01-2.578.026-2.695.013-2.719q.018-3.328.049-6.656h-2l-.766 2.55c-1.343 3.754-3.045 7.17-4.984 10.637l-.977 1.866C31.848 155.39 29.696 157.388 25 159c-3.43.293-3.43.293-6.875.188l-3.492-.083L12 159c-.8-5.602-1.137-11.002-1.098-16.656l.005-2.387c.005-2.486.018-4.971.03-7.457q.009-2.547.014-5.094.017-6.202.049-12.406H8zm337 5c1 1 1 1 1.063 4.563L346 120a418 418 0 0 1-3.812 2l-2.145 1.125C338 124 338 124 335 124l-1-5c-3.688-1.18-7.151-1.21-11-1l-3 2v2l3.543 1.355 4.644 1.832 2.33.885c4.764 1.902 8.295 3.734 11.483 7.928 1.02 4.67.623 9.351-1.062 13.813-7.018 7.923-14.547 11.723-25.172 12.39-8.756.117-15.646-.176-22.829-5.453-2.437-3.46-2.343-5.607-1.937-9.75 1.264-.7 2.537-1.384 3.813-2.062l2.144-1.16C299 141 299 141 302 142l.875 1.938c.984 2.224.984 2.224 3.25 3.312 4.515 1.178 8.783 1.394 13.313 0 1.982-1.586 2.232-2.776 2.562-5.25l-2.621-.855C302.708 135.497 302.708 135.497 299 130c-1.42-4.276-1.183-7.364.063-11.687C302.62 112.23 307.43 109.266 314 107c10.996-1.92 21.872-2.074 31 5" fill="var(--moonstone)" />
                            <path d="M252 107c3.25-.058 6.5-.094 9.75-.125.92-.017 1.84-.034 2.79-.05l2.694-.02 2.476-.032c2.642.262 4.121.684 6.29 2.227 2.182 4.05 2.854 8.594 3.727 13.074l.462 2.319q.48 2.413.953 4.828.728 3.704 1.467 7.406l.93 4.697.445 2.241C285 148.767 285 148.767 285 151h4l-1 8c-2.73.081-5.457.14-8.187.188l-2.33.076c-4.597.059-7.888-.056-11.483-3.264-.926-2.48-.926-2.48-1.312-5.187l-.426-2.731L264 146c-8.591-.478-8.591-.478-17 1-3.454 3.23-5.193 6.674-7 11-1 1-1 1-3.723 1.098l-3.34-.036-3.347-.027L227 159c.46-5.372 3.441-9.238 6.313-13.625l3.253-5.059 1.704-2.632c2.86-4.436 5.667-8.905 8.48-13.371l4.339-6.87L252 116l-1-1c.176-2.69.618-5.329 1-8m7 20c-2.937 3.652-2.937 3.652-4 8h7l-2-8z" fill="var(--moonstone)" />
                            <path d="m106.313 106.75 2.63-.062 2.545-.016 2.33-.028c2.877.47 4.133 1.28 6.182 3.356.973 2.66.973 2.66 1.633 5.848l.754 3.525.738 3.69.762 3.607c.722 3.44 1.419 6.884 2.113 10.33l.624 2.96.556 2.661.484 2.29C128 147 128 147 128 151h5c-.875 6.875-.875 6.875-2 8-2.598.154-5.15.232-7.75.25l-2.172.063c-4.513.033-7.647-.264-11.078-3.313-.961-3.372-.862-6.463-1-10H91c-1.446 3.608-1.446 3.608-2.832 7.238-1.166 2.467-2.066 3.992-4.168 5.762-4.405.7-8.577.466-13 0 .565-4.338 2.115-7.102 4.535-10.719l2.205-3.328 2.323-3.453a3204 3204 0 0 0 4.472-6.719l1.113-1.671c3.94-5.942 7.657-12.014 11.352-18.11h-2c1.165-9.15 2.786-8.2 11.313-8.25M103 126l-5 9h8l-.375-3.937c-.07-.731-.14-1.462-.21-2.215L105 127z" fill="var(--moonstone)" />
                            <path d="M400 103c1.945-.293 1.945-.293 4.125-.187L408 103c-.278 5.366-.664 8.571-4.393 12.792-3.031 2.28-6.286 1.836-9.92 1.583l-2.244-.082A220 220 0 0 1 386 117l-.332 1.969c-1.263 7.238-2.875 14.345-4.668 21.469-.26 1.061-.52 2.123-.79 3.216l-.772 3.092-.692 2.771c-1.104 3.674-1.967 5.893-5.058 8.233-5.52 1.871-10.913 1.481-16.688 1.25 1.467-9.214 3.753-18.176 6.125-27.187l1.129-4.33Q365.62 122.238 367 117l-9 1-1 3h-9c.466-4.754 1.127-8.133 4-12 3.09-2.06 3.76-2.251 7.256-2.271l2.589-.031 2.784-.007 5.822-.076q4.596-.044 9.191-.071c2.954-.022 5.908-.061 8.862-.103h2.79l2.58-.04 2.273-.016c2.266-.245 2.266-.245 3.853-3.385" fill="var(--moonstone)" />
                        </svg> */}

                        <svg className="nav__logo-img" role="img" aria-label={t(`nav.logoLabel`)} viewBox="0 0 3556 1334" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" >
                            <g clipPath="url(#a)">
                                <mask id="wave-shape" style={{maskType: "luminance"}} maskUnits="userSpaceOnUse" x={852} y={0} width={2704} height={824} >
                                    <path fill="#fff" d="M2272.49 3.658c-88.52 12.68-165.69 57.324-211.81 122.527-45.69 64.525-60.16 147.208-41.85 239.112l.28.645.5 1.193c.76 1.142 1.94 1.97 3.31 2.235l2.05.016.48-.199 1.38-.596 1.27-1.225.18-.166v-.049h.02c46.61-69.06 104.53-108.225 177.05-119.729a275.222 275.222 0 0 1 43.37-3.427c56.91 0 110.56 17.679 146.47 49.594 48 42.674 72.15 115.077 60.07 180.165-10.88 58.4-53.35 116.121-116.55 158.365-54.33 36.334-120.18 57.953-190.5 62.588-10.16.695-20.37 1.009-30.51 1.009-60.98 0-120.45-11.223-171.87-22.662-58.56-13.077-119.68-29.629-198.11-53.78l-15.61-4.851c-60.75-18.804-123.52-38.254-186.37-42.574-8.64-.596-17.15-.894-25.59-.894-66.02 0-124.8 18.39-175.02 54.757l-.45.48-.06.05-1.03 1.324-.3.812-.24 1.042-.09.298.12.713.15.959.48 1.043.25.563.21.199.81.761.71.546 1.01.348.9.248.33.083c90.91 4.354 117.91 36.533 124.55 62.77 6.48 25.558-7.64 38.883-20.58 45.587-10.15 5.231-22.81 7.814-38.42 7.814-5.18 0-10.73-.281-16.57-.861-18.29-1.804-37.38-5.993-58.32-12.862-17.56-5.761-35.83-13.16-55.83-22.645-17.33-8.227-35.33-17.728-53.5-28.289-17.08-9.915-33.89-20.411-50.9-39.083l-.35-.165-3.01-1.407-.5-.066-.46-.066-2.83 1.258-.29.116-.06.182-1.49 3.161-.07.447-.03.53c2.96 34.282-10.05 67.156-33.95 85.811-22.3 17.414-52.16 20.08-81.11 20.378-1.72.033-3.43.049-5.15.049-30.01 0-57.539-2.747-83.892-8.326-24.896-5.297-49.08-13.458-105.46-41.383l-.547-.148-1.092-.298-.844-.018-1.093.133-.944.364-.562.216-.282.248-.761.761-.612.795-.266.298-.149.579-.281 1.043-.033.977.149.977.397 1.025.199.513c14.848 23.655 39.695 50.24 63.299 67.737 22.96 17 45.091 26.137 78.893 32.56 21.671 4.105 42.911 6.174 63.551 6.174 18.62 0 36.81-1.671 54.37-5.065 54.23-10.395 87.75-34.564 100.25-71.527 6.44 3.592 12.95 7.168 19.53 10.611a762.714 762.714 0 0 0 27.12 13.458c9.22 4.304 18.47 8.426 27.87 12.233 9.75 3.989 19.35 7.598 28.59 10.71 9.87 3.343 19.82 6.307 29.5 8.74 10.39 2.665 20.56 4.75 30.26 6.224 10.79 1.638 21.29 2.532 31.18 2.748 1.46.033 2.92.065 4.41.065 9.38 0 18.5-.661 27.26-1.919 10.94-1.606 21.42-4.238 31.14-7.83 10.34-3.791 20.09-8.79 28.9-14.765 9.32-6.291 17.58-13.674 24.58-21.884 7.53-8.806 13.41-18.374 17.53-28.372 2.14-5.33 3.79-10.76 4.88-16.172 1.1-5.38 1.69-11.009 1.74-16.753.14-10.925-1.54-22.032-5.01-33.023-1.11-3.477-2.44-6.903-3.88-10.313 2.62.133 5.22.198 7.83.413 12.19.911 24.58 2.434 37.91 4.685 11.87 2.02 24.5 4.569 38.52 7.813 13.18 3.079 26.3 6.456 39.35 10.032a1556.64 1556.64 0 0 1 19.94 5.495 7796.75 7796.75 0 0 1 38.14 10.793l20.64 5.91c23.76 6.836 47.53 13.656 71.35 20.294 33.83 9.469 60.04 16.404 84.92 22.595 33.02 8.194 60.8 14.203 87.33 18.937 32.03 5.694 61.51 9.336 90.1 11.107 13.34.828 26.62 1.258 39.71 1.258 17.88 0 35.44-.761 52.51-2.317 31.78-2.831 62.59-8.376 91.55-16.421 21.01-5.844 41.55-13.127 61.02-21.652 29.45-12.944 57.13-28.984 82.17-47.656a389.96 389.96 0 0 0 36.58-30.839c11.67-11.223 22.71-23.241 32.76-35.772 10.23-12.829 19.62-26.369 27.89-40.29 8.41-14.153 15.81-28.886 21.92-43.734 6.29-15.345 11.37-31.087 15.05-46.714 3.8-16.437 6.12-32.907 6.87-48.997.74-16.619-.15-33.421-2.7-49.908-2.5-16.04-6.62-32.246-12.28-48.187-5.57-15.493-12.55-30.706-20.78-45.256-8.19-14.435-17.73-28.29-28.3-41.168-10.63-13.011-22.4-25.127-35.01-36.019-12.52-10.81-26.22-20.725-40.61-29.432-14.05-8.443-29.03-15.991-44.59-22.281-15.22-6.257-31.16-11.405-47.36-15.361-15.98-3.94-32.4-6.705-48.75-8.31a342.547 342.547 0 0 0-32.99-1.589c-7.09 0-14.17.232-21.22.678-11.56.729-23.29 2.285-35.03 4.238 44.73-46.896 102.03-63.101 159.79-63.101 48.78 0 97.89 11.538 140.12 25.956 94.12 32.163 185.35 88.874 287.18 178.542 85.7 75.5 165.27 161.577 239.45 243.284l6.73 7.432c72.51 79.853 147.44 162.454 247.9 221.996 47.78 28.339 112.7 58.283 173.66 58.283h.02c14.63 0 29.05-1.754 42.92-5.627 34.93-9.783 63.19-32.329 84.16-67.058v-16.966l-.28.016-1.14.397-.45.15c-33.93 19.234-67.87 27.726-101.59 27.726-124.18 0-245.33-114.913-352.65-228.535-31.17-32.974-61.19-65.864-90.25-97.713-90.74-99.369-176.45-193.226-279.27-272.02C2589.74 57.075 2448.12 0 2325.07 0c-17.93 0-35.48 1.209-52.58 3.658Z" />
                                </mask>
                                <g mask="url(#wave-shape)">
                                    <path fill="var(--moonstone)" transform="matrix(1 0 0 -1 838.827 831.096)" d="M0 0h2729.74v843.109H0z" />
                                </g>
                                <mask id="letter-W" style={{maskType: "luminance"}} maskUnits="userSpaceOnUse" x={-1} y={888} width={699} height={441}>
                                    <path fill="#fff" d="M608.506 888.79a765911.995 765911.995 0 0 1-139.594 254.31l-6.257-197.764c0-25.806-14.517-56.546-83.726-56.546h-48.584a1012570.74 1012570.74 0 0 0-138.881 253.63c-2.086-65.73-4.189-131.47-6.274-197.167-.364-25.773-15.196-56.463-83.71-56.463H12.92C8.6 906.072 4.28 923.353-.008 940.618H28c9.485 0 9.65 2.797 9.734 3.708 3.393 127.954 6.753 255.914 10.163 383.874h54.295c50.736 0 84.852-15.81 101.322-46.87 38.04-68.33 76.062-136.64 114.069-204.96 2.532 67.13 5.048 134.23 7.564 201.36 0 33.48 27.231 50.47 80.896 50.47h50.024c80.465-146.47 160.931-292.95 241.379-439.41h-88.94Z" />
                                </mask>
                                <g mask="url(#letter-W)">
                                    <path fill="var(--moonstone)" transform="matrix(1 0 0 -1 -11.198 1335.58)" d="M0 0h718.716v456.108H0z"/>
                                </g>
                                <mask id="letter-A" style={{maskType: "luminance"}} maskUnits="userSpaceOnUse" x={569} y={888} width={535} height={441} >
                                    <path fill="#fff" d="M796.739 888.79c-4.32 17.282-8.673 34.563-13.01 51.828h23.058c6.522 0 9.138.679 9.965.778-.198.579-.695 1.722-1.92 3.575-81.856 127.739-163.695 255.479-245.551 383.229h89.603l77.022-118.29h164.092c5.728 25.72 11.472 51.48 17.199 77.18 5.529 27.28 34.117 41.11 85.013 41.11h88.55c4.32-17.29 8.64-34.53 12.96-51.82h-28.04c-8.96 0-9.59-3.07-9.87-4.42-23.54-112.59-47.06-225.19-70.597-337.781-6.042-30.127-34.597-45.389-85.001-45.389H796.739Zm63.548 128.14 25.774 119.96H781.295l78.992-119.96Z" />
                                </mask>
                                <g mask="url(#letter-A)">
                                    <path fill="var(--moonstone)" transform="matrix(1 0 0 -1 555.484 1335.58)" d="M0 0h559.769v456.108H0z" />
                                </g>
                                <mask id="letters-VE" style={{maskType: "luminance"}} maskUnits="userSpaceOnUse" x={1077} y={888} width={933} height={441}>
                                    <path fill="#fff" d="M1658.7 888.79h-134.27c-68.08 103.706-136.16 207.41-204.25 311.12-18.75-89.95-37.46-179.87-56.2-269.836-5.01-27.395-33.37-41.284-84.33-41.284h-89.23c-4.32 17.282-8.65 34.563-12.97 51.828h28.04c8.94 0 9.55 2.997 9.85 4.371 25.84 127.741 51.67 255.461 77.48 383.211h61.7c50.17 0 83.72-13.88 99.63-40.96 75.4-115.54 150.78-231.1 226.17-346.622h46.86c4.02 0 6.9.845 8.54 2.566.58.596 1.75 1.821.68 5.811-31.44 126.405-62.89 252.815-94.32 379.205h297.63c24.1 0 44.61-7.37 60.91-21.9 16.06-14.29 27.5-34.72 34.02-60.77 1.7-6.9 3.39-13.77 5.11-20.69h-59.6c-1.38 6.16-2.77 12.28-4.13 18.37-1.45 5.94-4.76 11.95-18.47 11.95H1704.4c9-35.7 17.99-71.39 26.96-107.13h149.75c6.25-24.32 12.51-48.68 18.77-73.02h-150.54c9.44-37.94 18.94-75.843 28.37-113.799h213.24c6.28-24.135 12.55-48.286 18.82-72.421H1658.7Z" />
                                </mask>
                                <g mask="url(#letters-VE)">
                                    <path fill="var(--moonstone)" transform="matrix(1 0 0 -1 1066.88 1335.58)" d="M0 0h953.681v456.108H0z" />
                                </g>
                                <mask id="letter--A" style={{maskType: "luminance"}} maskUnits="userSpaceOnUse" x={1952} y={888} width={536} height={441} >
                                    <path fill="#fff" d="M2180.24 888.791c-4.32 17.282-8.64 34.563-12.96 51.828h23.04c6.52 0 9.14.679 9.95.778-.21.579-.66 1.721-1.92 3.575-81.87 127.738-163.68 255.488-245.53 383.228h89.6c25.64-39.43 51.35-78.86 77.02-118.29h164.06c5.78 25.72 11.52 51.46 17.27 77.17 5.51 27.29 34.11 41.12 84.98 41.12h88.49c4.36-17.28 8.69-34.53 13.05-51.82h-28.08c-8.94 0-9.61-3.07-9.9-4.41-23.52-112.6-47.02-225.19-70.55-337.79-6.04-30.127-34.63-45.389-85-45.389h-113.52Zm63.62 128.119 25.75 119.98h-104.8l79.05-119.98Z" />
                                </mask>
                                <g mask="url(#letter--A)">
                                    <path fill="var(--moonstone)" transform="matrix(1 0 0 -1 1944.54 1335.58)" d="M0 0h552.858v456.108H0z" />
                                </g>
                                <mask id="letter-S" style={{maskType: "luminance"}} maskUnits="userSpaceOnUse" x={2520} y={883} width={470} height={451} >
                                    <path fill="#fff" d="M2668.16 916.073c-41.17 22.181-67.36 54.244-77.82 95.467-5.68 23.14-3.66 43.81 6.04 61.41 9.5 17.26 23.66 30.62 42.08 39.78 17.35 8.6 36.53 16.95 56.96 24.84 20.56 7.93 39.86 14.87 57.36 20.73 16.37 5.43 29.38 13.16 38.73 22.96 8.41 8.79 10.98 18.9 7.81 31.02-3.79 15.29-14.26 27-32.09 35.75-17.17 8.46-37.55 12.7-60.94 12.7-1.9 0-3.79-.04-5.72-.09-24.52-1.17-48.11-7.43-70.11-18.62-20.89-10.59-32.04-24.41-34.13-42.17-.41-3.22-.76-6.38-1.16-9.59-13.69 5.45-27.36 10.88-41.05 16.32-17.48 6.92-28.09 17.42-31.55 31.12-3.44 13.73-1.27 24.73 6.46 32.66 15.59 22.02 38.65 38.34 68.54 48.64 22.17 7.64 45.95 12.36 70.75 14.28h60.42c55.17-3.49 101.89-16.09 139.23-37.61 45.82-26.37 74.32-60.58 84.77-101.6 5.63-21.62 5.3-41.1-.93-57.81-6.19-16.7-16.35-30.11-30.12-39.87-12.97-9.14-28.05-17.45-44.83-24.72-16.59-7.13-33.5-13.45-50.31-18.75-16.38-5.15-31.43-10.51-44.72-15.88-12.42-5-22.05-11.35-28.61-18.93-5.79-6.67-7.45-14.01-5.15-23.078 2.34-9.65 10.52-18.473 24.26-26.253 13.83-7.863 31.76-11.836 53.38-11.836 21.92.066 42.48 4.254 60.4 13.722 16.19 8.575 25.05 21.238 27.15 38.655.41 3.13.78 6.22 1.16 9.35 13.7-5.16 27.41-10.38 41.12-15.56 17.89-7.35 28.75-18.043 32.18-31.716 4.47-17.712-1.96-27.661-7.15-31.948-30.38-37.228-83.42-56.099-157.66-56.099-62.29 0-114.38 11.008-154.75 32.726Z" />
                                </mask>
                                <g mask="url(#letter-S)">
                                    <path fill="var(--moonstone)" transform="matrix(1 0 0 -1 2511.22 1342.49)" d="M0 0h490.662v469.93H0z" />
                                </g>
                                <mask id="letter-T" style={{maskType: "luminance"}} maskUnits="userSpaceOnUse" x={3024} y={858} width={514} height={471} >
                                    <path fill="#fff" d="M3478.89 858.465c-1.72 6.142-3.42 12.283-5.18 18.408-1.39 5.892-4.72 11.917-18.47 11.917h-330.92c-48.85 0-80.51 28.025-94.22 83.28-1.72 6.886-3.43 13.788-5.15 20.708h58.92c1.37-6.092 2.73-12.133 4.08-18.175 1.61-5.943 5.24-12.78 19.24-12.78h91.79c-30.68 122.127-61.33 244.247-92.01 366.377h50.14c62.03 0 98.76-20.86 109.19-62.01 25.46-101.46 50.88-202.91 76.31-304.367h95.53c48.8 0 80.51-27.792 94.2-82.666 1.69-6.886 3.41-13.789 5.1-20.692h-58.55Z" />
                                </mask>
                                <g mask="url(#letter-T)">
                                    <path fill="var(--moonstone)" transform="matrix(1 0 0 -1 3015.7 1335.58)" d="M0 0h532.126v490.662H0z" />
                                </g>
                            </g>
                            {/* <defs>
                                <pattern id="c" patternContentUnits="objectBoundingBox" width={1} height={1} >
                                    <use xlinkHref="#p" transform="scale(.00253 .0082)" />
                                </pattern>
                                <pattern id="e" patternContentUnits="objectBoundingBox" width={1} height={1} >
                                    <use xlinkHref="#q" transform="scale(.00962 .01515)" />
                                </pattern>
                                <pattern id="g" patternContentUnits="objectBoundingBox" width={1} height={1} >
                                    <use xlinkHref="#r" transform="scale(.00725 .01515)" />
                                </pattern>
                                <pattern id="i" patternContentUnits="objectBoundingBox" width={1} height={1} >
                                    <use xlinkHref="#s" transform="scale(.01408 .0147)" />
                                </pattern>
                                <pattern id="k" patternContentUnits="objectBoundingBox" width={1} height={1} >
                                    <use xlinkHref="#t" transform="scale(.01299 .01408)" />
                                </pattern>
                                <pattern id="m" patternContentUnits="objectBoundingBox" width={1} height={1} >
                                    <use xlinkHref="#u" transform="scale(.01235 .01515)" />
                                </pattern>
                                <pattern id="o" patternContentUnits="objectBoundingBox" width={1} height={1} >
                                    <use xlinkHref="#v" transform="scale(.0125 .01515)" />
                                </pattern>
                                <image id="p" data-name="image4.png" width={395} height={122} xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYsAAAB6CAYAAABOWX+DAAAABHNCSVQICAgIfAhkiAAADaRJREFUeJztnWty47gOhanUbOzufHYwO4ruj44Tx21ReD/I83W5ZrotkpAt4ggAKR//+/e/c4CWHMTjPqgHXvbL64A53O+2wsaHatQYziGbaqdihvKbnpO/zflkHAyn04+PbAOADC/X2E0ojq8/HZDaKhXQP2PqWnDac25Kenxj4Jl/sg0AvugmcIxQcJ1hF3G44tl+arTx+IwkUcYxuHfyv1tw2n8cvAgD9AFi0RCP9FOGUGSKhEVPFj7xcU4c0VhFMPg2gUwgFs3YUSi0IhGXspM7P45oSKOMSMGQjQAqg5rF5lQWCnGO/+UViXZszjnLajy6Fl6LKkB9EFk0wn+i+goFRyS4VPVNz3Zx7qCpkYYkytBGGFSQjloLRBZN8E8/9RSKjOhBisRWryhDtWpN0Rb0BWKxKZHOguLIuCmnTiLxCtd26mfjKxi+6aiu3+VOIA3VAP+JyXPSHKhC4TW+XydfKPInDzOoXRzjIKWl/FJSsoI30lFrALHYnjyhCBEJ71vW1/6Fy1qpTasJBtgHpKGK4xtV1BcKUbopaynU69iCtBClCSUtFVXDQDpqHyAWC+A9ETOEQiUSlRCKBu24LMHActodgVgUxndu+fRuJRT0AUdNkXiFaScnypi+7/a5+H3g1b/KXYFYNKdS+ilUKDoIxBVM0bg/xk4wqqSjQD0gFkWxnFMR6SetUJD9Z2eReMUwysgRDEQXOwGxaIzsLo1eWCb3aCAUtIGoBzbCMMrIFgxEF2uDpbMFqRBVkPuPEArnk+B077ZolLh+9m7h6t3SWulTa6lYLqzFIt1aILJoSoWooqNQvK5sZa/0UrYnDaA8xOpR7p7pKEQX/YBYFMMvqrBPP837UQqFkSd2dexeYzgLhnfBGzqwJhCLhlS4K5s5HBOhUJJZBzcZm9BJlGDQ8IkuClzq4AuIxaJ4RhVVhcI7guBiYk8BwUB0AcaAWJSCMsEqRBVSvISikkBcobJRKRhxILpYGYjFglSMKjyFohMZgoHoAlgAsShC5sTqKBQdookrxLYnCwaNrt8KuANi0Qh+yB4zcTOEYgU8BMMTr+gCqageYFPe5lhEFe6Dyw6/RXOn9Glkw+OcWJvPjusGk7fGbMOe7Wa9mRWgKxCLAnQubIujigShsAyjX/vSigfbvToIhnJYdyBBuSANtRDcFJRnVFFJKD6G/4VuMQb7PKc1JMH4TrWLzjdD4AdEFmCKZk/FRSPPw7/Jugt6HlcSbUTcPXeOLkAeiCyS8SkA+t+mqYra5DFkVLmopXawzlsYXVx9f14/loTooj+ILDaFMi8z008Sv6FOA00GlRZ/HzZxowzW3buwfqGB1q/96Ihq8oBYADbe6Sdu7xKRYP8+9ZvjOQLyMZwFQ8BVOsr7MeagJ1UidnCBRwrKK9q36NdTKI7j52UBtz9JEZxsqnGxWznk26OQZeoNxCKRypPnygF6RhVeQmEpEBZjuE060VcTW7u4Axv06gKxACZET2DKhRshEtIxWRGR2BrbPsDeQCya45GCqh5VUIUikzTBMDxvyjlAhPYBYlGYLksJtWZaCoU0mjgIL3afBFsiI4yr9lY/w0oZGUto+wKxSGKL+WB8khShoCIRAql4WAoGbUDrDuuxwSmWA2KxER4pqKiowkoopFGCti8rwYiOLpCKAg8gFo3h1itCCTSH6tA8l5BqhNiFYpcDltD2B2JRlB3ythZRxZ0D9hSJd2PdHjM5KCq6AEACxAJ8Y5aCMvRmWqGIhiJOFoJBNob+zwGFbjo73Cx1A4/7SCDLiVVCnXs3FArOsdSnYByMYyV49/9rrOP+8R+R9oAcEFksQTUpsMHzqa3SJbHc1VOX70VFFwuz5lVfF1yXTYnLw9unoDyjCqpQaCEXtWfvKQ0hNWemonxBkbszEAswxsjf8fzK1YWpEQqPYjepRiHoN2tiVqpbgFpALAqC4p49cXuUme2afNdd7AR+QCw2IGyeG6WgrKMKdl3iOL5frHaGNoxBfAaWoF8vrG3BTVMtsBoKsKk2h7VOeiYKr++dN8uCZquCrt5z/7Ghi4GxgglwgFgEY+9o/Vx39/z1/X4H/vk92sxEA04YrAjSUA3p6sI9UlDyWoHuU5S2v9wQd/FGxgT1vUmw7bvrXOgIxAIsWbycL1m1OeFp+spkBKIdgWOBfYFYABuaeCwrofDqrzLWp7rPJ7cGEAtQHm4KSuOEjjcvTV+sf++T/QEbArEALDx9jvfFeJc2mjn3iLQWAJWBWCwO3Ng9Fs968gSTFFQA1yFYiusUD/MZV0n9R1PdPlAHiEUxVt216vFMJlAPfC/rArEAIAE4VdANiAXYFvGGPlMrAOgBxAIAAMAtEAsAmOC5T2BHIBZgWzKdPgQHdANiAUKwdo5wtjXB97IuEItifGK2qeB+fFbHXz2yHF8nWAWIBdiC2e9PUB36io5/xXMCPkAsFqdT+ufTse877s4r06lmfi4APIBYgPJwf3KUmyp6bnf1mtvHS0Fd23czkAaEEEAJxALYkOCMJEPeCUZ2fwBUBWIBlmTmwq0cvEUdxMSOqHGMB4LM9gJi0RDzOkTQrPUYRtqnVjCk7bkpqIx6xenqxo0jO9PewAyIRTD2F7ffdPF1Gu+5co4S30ypNXCdPqUNHBhYEYgFYFPNGU5TTpT2FAEgCovWlkiq2QNq80+2AWAhzmHySNbP8f4u5jxlv1NNNUudmpK2U6SgSGM2TjOCOiCy2IBKk9jLlux9EtnjrwieZlALiEVBMiZJlxWgMzuzHLZm3EqF7TGu61Rdrg/gB8QCTLl0Hqo+75E6S4rjtvJ7pA17s/eUhmhSUDm+/3zzf6ALEIumnJO/pRJgyp2TJRW1icdp2kr7x+M9QEVQ4AZluSp0j3Ff7CYXtd/823HzPoX7ZbvCjon9R5NhT7XPYHUQWSRQdWJdOTB2KoowGPUzmN1lW0QYV+20kcf0/ckBplEFMwWFegWYAbEoClaC0PASDAm0hw7ajLM6uP7rAbFoTPf5ZBFdjEETjOyls2Pc2xkRVeSB4nZ3IBbLoNtd/H1MYCqKcZhaMB5jWTsqcrHbSCi09nukoOD89wBiAdpgIRhj2NQkOO1DI4pNgEDFg9VQSVBW63yeY3wYPD7Dm8tzIS5J4jwlZLZCagz+I0Hc01OGQkG2tdTeCj6oV9QEkUVzuPstPFJR0VAijOwVPBQbIoVi3sQ7BYV6xQpALIAvxrWLB6SH7CV4JqpQRaee4KSBFogFYCF6/EeyYEREGpwxuEJRNarIorBpSwOxSIRy0VPyt5GpKG2/1n2wUjkOosHt000onPuQ98tLQaFeURcUuAGbc5zj4P5wBaOKzSl4j3Ff9P6r/xeHxCqIC52ZJO3EGsowqgDgHRALcInkx4amjt5ZMMaQhcreKZdMoZCcGvZWgHcgDZVM5VTUvL2/u5CM8Dnq7FuQ2hLhiGOiCvsUFEQqD4gFmGJeu2D2J3UOmaKhGZt9vglRBdgTiMWy5EYXFQRjjFjR0I4VJRTaqAJ7K/YEYlGA6iH6/KdMhaMGCsYYP47cUjg+h12/FYQiM6pACqo+KHBvDreQbNo3c3ArW68c++zOyTM6sRQKsQ1Oe2HAOkAsFuO3Q7WTgtnKqNlSWmsxejgrD4Frsav6ppFn+okO9lasCNJQRcicVNRupekoy/qFslkZKglFh6ii+/e9AhCLBeEuo43gVjCEq65qnB0dsc0KoYgFhe1VgVg0o2t0YWrEm2bVHZPKRqVQVI4qUNjuA8SiEJaTQhJdpKajuEZcNK3mWNQ2tRIKRBUrA7FoSPWCYKZgPJpnf0QmNhQQCk+qX8fgNxCLYqwQXfzpJ1cwHl1ECcc5jMdzFApDM94e6XcNg0ywdLYpFX5yVfKgwe+2X/+93YdxexBvvGc03bo5MYMc/p1QeKafqCCq6AfEoiCWexMk+y4440v3X7DGst6s8dRtKQoJhRREFeuCNFRjZHdntumoMfQrpMhpqVW9B/HcIoUCUQV4BWJRlAp3aOUE43HgKs6GcS41hcKmnXdfwAaIRXOod2mSYrcl59ef+TGbiAZTJOqmnvhFbUQVfYFYFMZ3XsWmo376M4wyHgd3cUBMWymHWguFZ/opv2egAWKxALLogk6WYCwhGoL1tNTDrR8M6H19IKroDcSiOBWiC96RdoLBHfe7QbZwKGygNqFEFH51Cn76yccOEAnEYhHk0UUPwRAv/IoSD+U4nGgiL/XEP/oBoor+YJ9FA85B22ZA3ahH7U/Lw2nNNu49HN/dfow/x371JzZo8h6lUweHxxJgSvouUCis00/Qk9pALDblt2DQ5UMiNJSd3pQNfM82DIEdpE6D4A7nIRQa4Nj3A2moJvgXEX3XwVDTUpyibYXyBAeJvdTPRCIUldJPXb7DnYFYLEi1+sV3G7JdPNF42FPV4Uhs43wG0UKB9NOeIA3VCI9aw999+qekxqA9gJCTmnq26ZmMZy1qnZ+nSPzpX340HPu+ILJohkc6KjrCGMM3yvjd3j9dZTVGRDQRJRSIKtYDkcXCcB5jrolapG25UcYYtFVT835qwU63hUQTf7fwEArQC0QWDYmZi3E1A97msZN1B14VUV0mTCjk7XURLagMxKIp1dJR8hZf7U7JHoFeoiEVOsln8zNmXKtaIwBr/g/pj8ANX6PsjQAAAABJRU5ErkJggg==" />
                                <image id="q" data-name="image5-3.png" width={104} height={66} xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGgAAABCCAYAAAC7K5PxAAAABHNCSVQICAgIfAhkiAAABR5JREFUeJztm2uW2yAMhS853Vh33h10R6E/EsZCSELYAeTp3J45SQDLtj5fHglNv//8zfhRWD12X8CPbP3afQGfUDLq7t493A6QBcPb/k7QbgFoFMpIvOiwQgOywDxOUHsKNEqYqKBCAtJyfwaKdjyHFRVUKEBnwZyZJGiwooEKA0hKsgYmGZ/ktke6pcSX83BQESCFAMRTLIFJwrszZ6DAOIBHigdpO6AenGtg7LMmARR30+4ubysgmvJRMGdwtUm2QUVw07avevpwEiQMcqn/nFZUv5vXaYuDfHDk9mK8ToPsXv8kJGTTSau1HNAn4PSAWO05rLbrSk2XRyGt7uqWAhqB4wHTdkq6ii9KjGyufV4YKIxdkEL83NCDk1INJ73/SXG0MYofw2O2522jPJJVO0fLHKS5xwPnqPOPTdq32CUGdRR3E3USH5NWa4mDrsKhT7/okmT8Cc2amB0n2dc/VyG6OEkUzldZ1QAihDZQ2y5V1dcgzdZ0QGfcY8L5xEIIrZvoeUdDztQWB43AqXgI2bB6N5Wl4CYJUgQXLQPkuSHJOUdl+9GbI7HtKUh6/FmaOouTp7t1jWsm1kmY9ZQ9hXiZFgxN0dbP6pY46Ix7PHAe6N+A1KaZbOCci1Z0c2G+ze41kOB81RmByhrngdZN3Ek+Q8mths3o1DQHebq3tr7X4qVy0e03DO14Q9t4b7Y3q1s4y46xDhITobiHwqH1PIQEih7P4/ayvqubmw7It6+gXw7ocMqrNL2u3jucxMei3QrhIEBPiGeWdwb2SJudCgPIq2O2x15Tav7kdq9X8cal5VdvpTtZiwG1N9Ybf4rMbokESUL5jHQ6L/uybucgKmliIJVr7b1xd+rWgCxFSvIVfVtAVxaNuzcrUt0aUElkzscmjww9wZES79ViQG2KpC1RUiafbRGLI8WWt/h64vXkvOzL2r71d1Q5v2Z+r/0Fx+urToDEX60sCnVy+3VenO4g76Y/7Ut8Wlqe+pI0mnx+dEYLpxffcz2rtW0M6o4TbrD1ew6rev/+YHVvo+PX7F2nSwGpN9+5Sc1F1EnaHz8HhVOdNoZhGk0DpN+vVcMG9UzrDlVJzjZgWq/CYWVf16GMP99u6+8zy99q0wHeI9q+JLs8YRak7oxtwMFX2pzR8jGo181ZLpKOf5I/Lqm8mVA0Ew7LPSz+AitNBeTp5qRxYhRS0RM2sOY4BY5+zPq53TIH0adt5CYtSN44YlsGp6oadM9MaBsXqseIUi82y0I0I/H6kolURxk+rXCs1LXtdg+wwEHV7Ku5eV9Xx+uH7KMccwXOKvcAixzkna1pTgLKlkG835MDwAtZQKOoegD+t3WQJstF/FP9RNduEscUbZUqFFlworgHWDgGVWsYsi56ldce404CWjeVduPXYbsmEhxg4yRhBBIggwJ826PE6XN36h7j69KlgKyxyAMJqEG92vjTqI0zHjg73ANscJDW1R11LSRAB1Uk7Q4a+RKWlkaBA2zq4nyQAA+or/qBzGlgpLqdcICNYxCHBNRjEmCDqkt957NqpfrdcIDNP3nzMUZyEyCDovXXrsB2zWfOc17bd/X0klPaZPbu2hnz+19sOECQTSOSk4D2NyS6VPVttdcXwVzag7FbIQAB8iRAA0Xbe0otRQVTFAZQkQUK+Mx/mLJ+aIsEBwgIqEibVvPkeoB5fvmMBqYoLKCi3vrnys/OUaFQhQdUdHb9Y8W5g24DiOpuSb6i7eugH9n6Bym0Btx2Z5DyAAAAAElFTkSuQmCC" />
                                <image id="r" data-name="image6-4.png" width={138} height={66} xlinkHref="data:image/png;base64,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" />
                                <image id="s" data-name="image7-2.png" width={71} height={68} xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEcAAABECAYAAADTJCixAAAABHNCSVQICAgIfAhkiAAABCVJREFUeJztm1EO4yoMRU01G3s7nx3Mjsr7SN0Yc20CmKQfXKlVAgTwqW1Ioqb//v7LtAX1enoCv6wNx9GG42jDcbThONpwHG04jjYcRxuOoz9PDZw62j61hb8VTg8Q77q7YN0CB0F5dZB6Kxp86WpIS+Fo+3uAWNdJUKshLYFzBUpdJEtKc+UZ96UhrQAUDkeaaENpuVACZ1l815BWAAqF44FpQWknXdlDhpCiwywMjgXGgtLnO9rgRAl4UrQXhcC5CsYCkkBFbq5Q3HuGgCI0DWcUDALi1WfhFUQlJAQownvCwqoEcw1KagbXoUz5e12GobMG0BQcNq32GHB8EZ5WFu0Z0hVAsv9RQMM3nsioVH1/yhPXp6+hSbZJ4KOq+Hru7+yznAH6wUY1fVf+Kibpg+G6JA/MLF3Wn6epgKTHs+fWryE4eDCwXAMwqKnjOGUDUafzlQzUAKchoknPQb/Md/IXwHQ4TnGtBIRXvf59FdLSh10WGG30C3zKfuoTHLr1NTO5pxuOHhTlmpTq9sgoDUIm2qoOTYIig6jWMs9JhAjVAzOQAqgBqdozUXlNWXYejSbmgE2gPaRljATj9vCpkLcS332L2MDgHc7cHkfOc1oopGRFVVwl1zoJ6xD0xl2hLjg436B29pRRHjnBJkopVXXmfZjeEkzua7QeeTWjE7aEQp9zrpOyco8z0tgE1Xjhak0LRV8RUspdWnfxK7Rf6jn6GTh6Vcn6adcDWganZZqsZxBZlxdtYubVo659zvFs5XiQNLMtz/nMIdyn5Smy9K3L1CXcxVk8R3TKc6yh0YaMS96gLIPjosyxcaVDBYRV+RagMgTM/k3lr5xBU91f5TU3aOnrYA4Z85y3/wkbrcFUnX8P/ZB85/L8qqbhaIOJPkalTPx2KYlG37z1afsiP2xQGBIwNjrfEA3AwUn5KK09JZ+3EgAQkeEVxrjo3PKaCK1bygu31wf1sm32o9uBcEJeMxtSRINw8MBlYj7bqnK9/DY+uuFZV4JZoTDP8VYaCOiqUaKtDiXoncBrRjWckL3cI494w3dOWdxxX5x8Cd4DY6x614apFOI5KLzkUc7Yi2D4iGvLPVBugpFnM7mGNbWUw2WcynVLtqm96HwwZhkh2+r8osFEhRMrbJ8jw6sFiKVBmWO4UI4SBGaWUegOuQWICO+Qe2R5C4+P240pJOd4E8wqq3h5xuu/vmYtGKJAz5GhwxOtvYhI+s6YEXUgrgBDFBxW2nwdZkednP7Vh0J4g8lj6PGjtOSuvOVFsmULj2WwXpFWbJSXPbJAXkRUP0HsMQot0QvvHtb/90HvhbSBrcet1p5lJRTWLX8M8bJM74btDiis2/9vpY3zHOdOEEiP/RmN9TQATz/zUu8XteE42nAcbTiONhxHG46jDcfRhuPof+pgncy1TJQ9AAAAAElFTkSuQmCC" />
                                <image id="t" data-name="image8.png" width={77} height={71} xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE0AAABHCAYAAABCksrWAAAABHNCSVQICAgIfAhkiAAABIBJREFUeJztmmuy4ygMhUVqNtY7nx3MjkL/cIiFOBIvQTxVnC7ftkEG8UW8QsKff/+LdNSl168d+D/qQBvQgTagA21AB9qADrQBHWgDOtAG9M+vHUAK4vlpq++fQpNweux+CfIn0FpgvT5Gb4UOL2M3wK3QEKxXhaCWz2Emk13wtkCT7a6BahEvIwHcBW8ptFZYwXi6FcFdXi6HtxLcMmg1YEG1rJd43UX2965jR9QtgcYxYFg2qLYlRyoph7cj6tyhacC0yGqJMxviDc+KOk9wrjsCG1ggic4CFsJ1afWU74fPP8sHH7lFWh1YafdNM1qE8qJYbsjI41G3IuLcu2cPsJDZ1mMhoUjvRXXQ18F5yAVacroVmAXLWnBw20gRwtPA8fJn+U2PabC7iRwEjI9AeIwqy+Q22fvq2HVj9hzf3LpnvrSoA5N5zS2JeXdM8RSCFnG5jx7ddCrS9CgD9xqwWoihCsJ9m5WpLHFqfvbKZcnxyhpRumMC43aVqzAmG1xhTE773tEXa3V/G9MArDXYCjsFHPLRc502HWm1KLtSbWDSIXTl5ZUP2uyM3nqBd3q05IxARhlP04BxOGk3wHcFEp42ieyItiFofeO2Fn2lE9rWScLT/KhHm4+mIg0tM0xfQbfgwFKeNgkgcLLs61bzAkxSlr+KXLonnNIbFpMIWPq/ACZsXyId1SXL5fczs+i+c0/FSQTsSg8UQlDyFvjXoaXQUDf5ftIgjQMjcW9x0tZ9q/S4E3YOCUJktpbzLd+ajOox0LSlwY97ItRjoGl62k8SiB70W47rG4v7PsuLGN3bLG8d7qWRhhxPKW+QRnQB4pDSfQS2xfubwnJf91QaxIMoMjMOTwJTAm+bXKDBTz/a+UR3tMUogImLl5HK1bpmHrUgLdU9AX4KWl5xeeKtidtwcCkPXdwGdu3sQ9K80IeLHg1B66ko5q2BZWQRBwrn6dpY2OvXjJbOnjHeW57v7MimST5jvun+BBE42R1BkH9uY1YG6pqzmob2jtfm9wLA/96KFCnwdANcixAwNJZpb73BOz0aHtNqFcpx6BsBoIBIbQ0o7ETj5Vi2qru6Ljm0qaAFXHq0LlBZAUyLMo9ZM2kKWs0RPP0DcH0zSxOw2lg2w84t0vJx4napBq6A1xBu2TKkAgyNZbOahqZ/inVwEp7VpmLNxt83gHlHGZHzkiPNpET5bHo/f/I+XodwNyswO0scgxy/LGCzMyaXC7Rs2dAIjgjDa6oPmLYA85JbpPWAI8LwkuQZgLVBB3O1CsyLnWv3rIMjsuB9y2loHYIl01cAI1qwjbLAEZX7BdkY7ettu9Fl514FjGjR3lMDl/KIIoOTY+oY2aC9HL+8gREt3LBLcEQIHu+2RHqcybcwjB3AiFZ/y/H5vwWefNLOC5B2wUracrAilxq8kdrPA2oNR8uI1bCStp1GabMlarwEWVtn7YKVtP0Ir2UEa12M7oaV9NNzT9TosSXHXj3msDjpSXA0Pf5nCU/UgTagA21AB9qADrQBHWgDOtAGdKAN6C+xs9DBO3/d5gAAAABJRU5ErkJggg==" />
                                <image id="u" data-name="image9.png" width={81} height={66} xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABCCAYAAAAvzToDAAAABHNCSVQICAgIfAhkiAAABGJJREFUeJztnG2SpCAMhkPXXGxvvjfYGzX7Q2lCeBOwCWBN+U45o3yJjwmhxZ7w5++/SI+G9Nrdgd+gB6KDHogOeiA66IHooAeig352d0BTUNLvOB+7BUQNWG/Z3WC3QmzBe4kCb4UWL7YD6BaICJ4EhoTKSLCpyEqYSyFKBj3gUj0NCm+DA7XqeGsZRM5Lgxe6jyLYy+0mmKuscjrElvUFtWRfq+FE1II5E+RUiJb1teD1T3EC+x0rmCtAToPYBmi5a1+7RBJMqGCuADkFogbwKrwgMiMggMe9QGEhyKnufBWghCZlQa1hrgPpDjFdjAXQghc6HTtS/NSTMFeDdIWILt8CaMFrBRY++kmYvSC9NOUpTrLCHoDh/En5gXSAqExRv7J+YqVwWx5yg4jcGOUTlQBTXuAFezaqYfK25Tk5yN5PSr2a9jwxVL/PdADws3N1vl1YfA/IrFew86/IBSK+w3X3TICiZsMIq9P0gewNW9c0xRKDsn8c6wB7jbEq1wGy1d6IhqNzbwegZShu17qzb1EnpoOYI3MZk3nEzjlekdrNElFE1qxQZmoAQ6g3WUacoGqv1xpHtGShyhroEUAOTLpuynvx8kqDV0bAEdbLVvs0K5QdUeGJNGlh1s2p0/Kex3RnCCI+P3ZllPaJ6um4ChA4Kl8ZP3m7Vl9G5GKJ1pyrO0ICgEd6oBDyjbHGOxyw5g+K6xfvO66JAyS2Xxyz8rvfQNh2/pa7S+uz5p67tfsmmh24GyxN2yG+jbyo7N9N6yHG4g/KOvZjXsWLIO1Ocn0oe3zc+rJuzNE2tRPBokoUf4myNeMbMx+5iyWiz5/Zeuq0qj6qB8rJPLRwZZ5okoYg4r72X4EsGYWrR7EVeeeONqaWQ8NIL9taNiYWbgWu4OOSDCTaeBlkwRYd9PLJO8qU61oC0XJpOLbFvMl2TIDieMV4SOQIsbyjOIpq1ihBFoBiDU8FWLQZP/Vludst3vdG5BR94+eRaVlZtmPNH/m55UEbUO3Ko5rizpo1QrcWaZHaIKoyVUDSrVDv7/dygZg6od1Zza0LkHL8MzbUuAYQn9l3Ad/dEtHYyJWtI5ewYEIJohZAHpGtueeI3D6xoLHxSOO/z/RifExLR3TuU/eVlcHCAljK+zWSKW+FvSN+7C5BEukwk3gz2JKYrakAsRt7sXR152Kqori19NjywmPldGgsjOwntdEDUOvrqNwtseXWqFzxalzQLhucCwQjmYJurLemuHMCxN06WSRfxirGwVT3ywu9AvB2k+2WUudfxaS6tkqi64/RMIzajmcCJJoIUYJpWSWvM3LG1QCJFlgitzkZtUuYRNdtkbdSSo5/swASLfpGlQRJhGAeezXGUJWq62WthJe07GtpMmojmKlcKwXJero+W0u/IIkCCL/4q+/F9H5Wn60tX9XVovHoPG41vKStXxrnF/31KqFHRwZ1i39fQHQPGN9q+xsQv0EPRAc9EB30QHTQA9FBD0QH/Qdz+sik6FFgigAAAABJRU5ErkJggg==" />
                                <image id="v" data-name="image10-1.png" width={80} height={66} xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABCCAYAAADAD1E9AAAABHNCSVQICAgIfAhkiAAABFJJREFUeJztm2uypCAMhcPUbGx2PjuYHZn5YdOGcAJRAnqrPFXea0NU+PrwEO305+8/pleX9evuAvx0vQAH9QIc1AtwUC/AQb0AB/X77gIgJSP9ifOtRwC0gHni7oZ6G8AetF8qYDNIybA7YC4HiMBpWEhWjASbQ1aCXAbwKrhEbSD5HHeBXAJQc0LgkvsTgz0b5GyI0wHKymtwCUb5z7jvsfhbg5wNcRrAlut64M5NY9LnL1eOXAFxCsC+62pEHg/qGFa52ZHSjbMhTm3CPde1oCWQyYoAHixS4cbZEMMB5krV8FoDAwZWnVvFsABDJOGsgxgKEDHQ8HrgkqMxZzT5WIZw1kAMA4j6PS88Da2FkFU8E1NK5yFGKXw1xpocy+SUanhJbC3pmO/xsL+VEWX5zkycWgpxYK/panh7GugZvbXist/7IkqfOSG3nSgvN2rIUAdaTTcrBF6OTdVupys4PnluIb0adqCnyZWfFTzz7sTW1zXChtJNVp84YxoT5kDkPtR0i3SV5jVGFVe4se4T0ZFRfeGaxQTRdC14Uq1vdVPHFG78uq7s8Wa6cAggmjTb97dW+iEJzroTyTESpARiNeVZCh1EEthvNV0ET05xqnOKPFjw4jhrCIltxuufyoHSSng5pBxd1WcFsR6oxD64XuAgvAYgar72XcnxX29FvkUhko5DlwG2ejR7Yt0uQA0pfTeUL4/H15xPc9iBrUmpZ4VFx0l4Zcxiazn1yDcTpOP0/LDXv6G4s7ln9BiAz/RXX48BuPaheNzVhgFGr68RETEfT9ry9s0r4hrniC8W1OU7kX0ZqZ3H7BtIZNxxrI1A5mxm1BoFN2FfpaU2EKNdh9I0X3T+egUwXkv6wKIiXPw7kkG6bsIaInTf4jeMpgPkml31eVOxbGw5hhk7F322vpgohQDczhYSZEqIeSsOEWkmvOLLskpwpKNyn9UQQHxhK5Vhrm6SBRyuwfXgeUfpKIUvqMrRWY/GTHzcn4pAudhJ5BtZW/C0+1jsPXZJf7PaUk5BfSEYSXsVrGIMeD33RTRfogAHovkgciHRp1KJP0vuu5K2H52olAPeTPcRBY/Clgvrfo/rPtFjPxDrg4fLGQE0pA+0XXjkyP6QqOwTCxM6a1WO+D14h/se+2oHKqAed/H8rHSjnvfJY6s5oTzWAQ+Vd1RTHmtufCy0Wk4kqt2YlUSsVjXCgoHIip6x8BEKUMLxQiQqQe75/ZqiUdYLL5Lj1HlgDyIRBnnlmjplBTyiSffC7cLXk9wrlcJ95Z6yCh7RxFc7Wk4k4ur53Vjl0FczHx7R5HdjLIg57wBJVE+EvFdog0P5kZr+cpGGSIRA7nv243fUy2GthEe06O0sPWAgkDKulYKEpiezwWUt/bWmnr7Iil95a/ROcFnLf+4qK2jBHD3vSt36i3UL5pXj79IjfvJP9AwYV/SYNxN+ql6Ag3oBDuoFOKgX4KBegIP6D4kB2Hvj5VRfAAAAAElFTkSuQmCC" />
                                <clipPath id="a">
                                    <path fill="#fff" d="M0 0h3555.32v1333.28H0z" />
                                </clipPath>
                            </defs> */}
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