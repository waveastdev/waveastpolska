import { memo } from "react"
import PropTypes from "prop-types"
import "./specialHeadingThree.css"

const SpecialHeadingThree = memo(function SpecialHeadingThree({title, subtitle}) {
    
    return (
        <div className="special-heading">
            <h2 className="special-title">
                {title}
                <svg className="special-line-big" width={921} height={60} viewBox="0 0 921 60" fill="none" xmlns="http://www.w3.org/2000/svg" >
                    <g id="line 6" clipPath="url(#clip0_22_2)">
                        <g id="Clip path group">
                            <mask id="mask0_22_2" style={{maskType: "luminance",}} maskUnits="userSpaceOnUse" x={0} y={0} width={921} height={60} >
                                <g id="clip0_204_73">
                                    <path id="Vector" d="M0 0H921V59.0383H0V0Z" fill="white" />
                                </g>
                            </mask>
                            <g mask="url(#mask0_22_2)">
                                <g id="Group">
                                    <path id="Vector_2" fill="var(--warm-orange)" d="M921 8.71639C916.31 8.31966 912.012 8.31966 907.324 8.31966C902.634 8.31966 898.336 7.92528 893.646 7.52854C883.487 6.73507 873.72 5.54722 863.56 4.75374C844.413 3.17152 820.647 3.18673 801.5 2.78999C783.797 1.99806 770.307 1.99986 752.587 1.99999L738.911 1.99997C721.327 2.39671 703.084 2.60323 685.5 2.99997C644.471 4.18782 602.929 6.16631 562.681 8.15C522.434 10.1337 482.186 12.1119 442.33 14.49C422.793 15.6778 402.864 16.8698 383.327 18.06C361.835 20.0413 340.345 21.2263 319.245 22.8109C275.089 26.3768 231.325 31.5483 187.168 35.1142C149.008 38.2764 110.886 41.6371 73 47.19C48.773 51.1503 24.227 51.5097 0 55.8691C27.7434 57.8504 55.8764 58.6415 84.0117 59.0382C102.377 59.0382 98.5263 57.2667 116.5 56.87C128.223 56.4756 161.388 51.5311 173.5 50.74C180.925 50.3433 180.136 49.5307 187.168 48.7373C206.316 46.7583 231.353 45.169 250.5 43.19C272.772 41.2063 294.728 39.9813 317 38C339.664 36.0187 360.664 33.6801 383.327 31.6988C403.646 30.1166 428.792 27.3246 449.5 25.74C469.429 24.1554 491.571 22.9278 511.5 21.74C531.819 20.5521 548.681 18.9978 569 17.81C589.708 16.6221 624.292 15.8506 645 15.0571C682.513 13.4749 707.324 13.4725 738.911 11.8879C760.014 11.8879 790.4 12.679 811.5 11.8879C832.211 11.0945 843.239 14.0779 863.56 12.89C871.764 12.4933 887.006 14.2636 895.21 13.4725C899.118 13.0758 903.416 12.679 907.324 11.8879C910.841 11.0945 914.357 9.90424 917.873 9.50987C919.047 9.11313 919.829 8.71639 921 8.71639Z" />
                                </g>
                            </g>
                        </g>
                    </g>
                    <defs>
                        <clipPath id="clip0_22_2">
                            <rect width={921} height={59.0383} fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            </h2>
            <p className="special-paragraph">{subtitle}</p>
        </div>
    )
})

export default SpecialHeadingThree

SpecialHeadingThree.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired
}