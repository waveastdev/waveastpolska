import { memo } from "react"
import PropTypes from "prop-types"
import "./specialHeading.css"

const SpecialHeading = memo(function SpecialHeading({title, subtitle}) {
    
    return (
        <div className="special-heading">
            <h2 className="special-title">
                {title}
                <svg className="special-line" xmlns="http://www.w3.org/2000/svg" width="390" height="25" fill="none" viewBox="0 0 390 25">
                    <g clipPath="url(#clip0_204_73)">
                        <path fill="var(--warm-orange)" d="M390 3.691c-1.986-.168-3.806-.168-5.791-.168-1.986 0-3.806-.167-5.792-.335-4.302-.336-8.438-.839-12.74-1.175-8.108-.67-16.381-1.342-24.489-1.51A503.449 503.449 0 00318.685 0h-5.791c-7.446.168-14.892.168-22.338.336-17.374.503-34.913 1.006-52.287 1.845-17.043.84-34.086 1.678-50.963 2.685-8.273.503-16.712 1.006-24.985 1.51-9.101.839-18.201 1.342-27.136 2.013-18.698 1.51-37.23 2.853-55.928 4.363a773.845 773.845 0 00-48.315 5.537C20.683 19.966 10.259 21.812 0 23.658c11.748.839 23.661 1.174 35.575 1.342 7.777 0 15.554-.168 23.165-.336 4.964-.167 9.928-.503 15.057-.838 3.144-.168 6.122-.504 9.1-.84 8.108-.838 16.382-1.51 24.49-2.348 9.431-.84 18.697-1.846 28.128-2.685 9.597-.839 19.36-1.678 28.957-2.517 8.604-.67 17.374-1.342 26.143-2.013 8.439-.671 17.043-1.175 25.482-1.678 8.604-.503 17.043-1.007 25.647-1.51 8.769-.503 17.374-.671 26.143-1.007 15.885-.67 31.769-.839 47.819-1.007 8.936 0 17.705-.335 26.64-.67 8.77-.336 17.539-.672 26.144-1.175 3.474-.168 7.115-.336 10.589-.671 1.655-.168 3.475-.336 5.13-.671 1.489-.336 2.978-.84 4.467-1.007.497-.168.828-.336 1.324-.336z"></path>
                    </g>
                    <defs>
                        <clipPath id="clip0_204_73">
                            <path fill="#fff" d="M0 0H390V25H0z"></path>
                        </clipPath>
                    </defs>
                </svg>
            </h2>
            <p className="special-paragraph">{subtitle}</p>
        </div>
    )
})

export default SpecialHeading

SpecialHeading.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired
}