import { useRef, memo, useState, useEffect } from "react"
import { Link as LinkRouter } from "react-router-dom"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { useTranslation } from "react-i18next"
import SpecialHeading from "../specialHeading/SpecialHeading"
import servicesItems from "../../data/servicesItems"
import "./servicesMain.css"

const ServicesMain = memo(function ServicesMain() {
    const {t} = useTranslation()
    const carousel = useRef()
    const [currentSlide, setCurrentSlide] = useState(0)
    const [totalSlides, setTotalSlides] = useState(1)
    const itemWidth = 220 

    useEffect(() => {
        const updateSlideInfo = () => {
            if (!carousel.current) return
            const containerWidth = carousel.current.offsetWidth
            const itemsPerView = Math.floor(containerWidth / (itemWidth + 32)) 

            if (itemsPerView <= 0) {
                setTotalSlides(0)
                return
            }

            const slides = Math.ceil(servicesItems.length / itemsPerView)
            setTotalSlides(slides)
        }

        updateSlideInfo()
        window.addEventListener('resize', updateSlideInfo)
        return () => window.removeEventListener('resize', updateSlideInfo)
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            if (!carousel.current) return
            const scrollPosition = carousel.current.scrollLeft
            const itemsPerView = Math.floor(carousel.current.offsetWidth / (itemWidth + 32))
            const slideWidth = itemsPerView * (itemWidth + 32)
            const newSlide = Math.round(scrollPosition / slideWidth)
            setCurrentSlide(newSlide)
        }

        const carouselElement = carousel.current
        carouselElement?.addEventListener('scroll', handleScroll)
        return () => carouselElement?.removeEventListener('scroll', handleScroll)
    }, [])

    const handleLeftClick = (e) => {
        e.preventDefault()
        if (!carousel.current) return
        const itemsPerView = Math.floor(carousel.current.offsetWidth / (itemWidth + 32))
        const slideWidth = itemsPerView * (itemWidth + 32)
        carousel.current.scrollLeft -= slideWidth
    }

    const handleRightClick = (e) => {
        e.preventDefault()
        if (!carousel.current) return
        const itemsPerView = Math.floor(carousel.current.offsetWidth / (itemWidth + 32))
        const slideWidth = itemsPerView * (itemWidth + 32)
        carousel.current.scrollLeft += slideWidth
    }

    const scrollToSlide = (index) => {
        if (!carousel.current) return
        const itemsPerView = Math.floor(carousel.current.offsetWidth / (itemWidth + 32))
        const slideWidth = itemsPerView * (itemWidth + 32)
        carousel.current.scrollLeft = index * slideWidth
    }

    return (
        <div className="services">
            <div className="section__padding--block container">
                <SpecialHeading title={t(`sectionHeadings.services.title`)} subtitle={t(`sectionHeadings.services.subTitle`)} />
                <div className="main__services-items" ref={carousel}>
                    {servicesItems.map((service) => (
                        <div key={service.id} className="main__services-item-wrapper">
                            <LinkRouter className="main__services-item" to={`/services#${service.idTag}`} >
                                <div className="main__services-icon">
                                    <span className="main__services-hidden"></span>
                                    {service.icon}
                                </div>
                                <div className="main__services-title">{t(service.titleKey)}</div>
                            </LinkRouter>
                        </div>
                    ))}
                </div>
                <div className="carousel-control">
                    <button className="carousel-button" aria-label={t(`carouselBtnAriaLabel.left`)} onClick={handleLeftClick} disabled={currentSlide === 0} >
                        <FaChevronLeft />
                    </button>
                    {totalSlides > 1 && (
                        <div className="carousel-dots">
                            {[...Array(totalSlides)].map((_, index) => (
                                <button
                                    key={index}
                                    className={`carousel-dot ${currentSlide === index ? 'active' : ''}`}
                                    onClick={() => scrollToSlide(index)}
                                    aria-label={`Go to slide ${index + 1}`}
                                    aria-current={currentSlide === index}
                                />
                            ))}
                        </div>
                    )}
                    <button className="carousel-button" aria-label={t(`carouselBtnAriaLabel.right`)} onClick={handleRightClick} disabled={currentSlide === totalSlides - 1} >
                        <FaChevronRight />
                    </button>
                </div>
            </div>
        </div>
    )
})

export default ServicesMain