import { useRef, memo, useState, useEffect } from "react"
import sommarland from "../../assets/references/sommarland.png"
import frenzy from "../../assets/references/frenzy.png"
import suntago from "../../assets/references/suntago.png"
import edsun from "../../assets/references/edsun.png"
import eleven from "../../assets/references/eleven.png"
import "./references.css"

const referencesItems = [ 
    {id: 1, logo: frenzy, alt: "references.frenzyAlt"},
    {id: 2, logo: sommarland, alt: "references.sommarlandAlt"},
    {id: 3, logo: suntago, alt: "references.suntagoAlt"},
    {id: 4, logo: edsun, alt: "references.edsunAlt"},
    {id: 5, logo: eleven, alt: "references.elevenAlt"}
]

const References = memo(function References() {
    const carousel = useRef()
    const [currentSlide, setCurrentSlide] = useState(0)
    const [totalSlides, setTotalSlides] = useState(1)
    const itemWidth = 180 

    useEffect(() => {
        const updateSlideInfo = () => {
            if (!carousel.current) return
            const containerWidth = carousel.current.offsetWidth
            const itemsPerView = Math.floor(containerWidth / (itemWidth + 32)) 

            if (itemsPerView <= 0) {
                setTotalSlides(0)
                return
            }

            const slides = Math.ceil(referencesItems.length / itemsPerView)
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

    const scrollToSlide = (index) => {
        if (!carousel.current) return
        const itemsPerView = Math.floor(carousel.current.offsetWidth / (itemWidth + 32))
        const slideWidth = itemsPerView * (itemWidth + 32)
        carousel.current.scrollLeft = index * slideWidth
    }

    return (
        <>
        <div className="references__items" ref={carousel}>
            {referencesItems.map((reference) => (
                <div key={reference.id} className="references-item">
                    <img className="references-item__logo" src={reference.logo} alt={reference.alt} />
                </div>
            ))}
        </div>
        <div className="carousel-control">
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
        </div>
        </>
    )
})

export default References