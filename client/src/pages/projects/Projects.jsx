import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { useTranslation } from "react-i18next"
import { projectsImages } from "../../data/projectsImages"
import { wrapCompanyName } from "../../utils/wrapCompanyName"
import { BiSolidLayer } from "react-icons/bi"
import LazyLoad from "react-lazyload"
import SpecialHeadingTwo from "../../components/specialHeadingTwo/SpecialHeadingTwo"
import PageHeader from "../../components/pageHeader/PageHeader"
import Lightbox from "yet-another-react-lightbox"
import Captions from "yet-another-react-lightbox/plugins/captions"
import Download from "yet-another-react-lightbox/plugins/download"
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen"
import Counter from "yet-another-react-lightbox/plugins/counter"
import Zoom from "yet-another-react-lightbox/plugins/zoom"
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails"
import "yet-another-react-lightbox/plugins/thumbnails.css"
import "yet-another-react-lightbox/styles.css"
import "yet-another-react-lightbox/plugins/captions.css"
import "yet-another-react-lightbox/plugins/counter.css"
import "./projects.css"

function Projects() {
  const { t } = useTranslation()
  const [activeFilter, setActiveFilter] = useState("installation")
  const [isOpen, setIsOpen] = useState(false)
  const [slides, setSlides] = useState([])

  const [filterItems, setFilterItems] = useState([
    { id: 1, option: "installation", optionTranslation: "servicesFilter.installation", active: true },
    { id: 2, option: "maintenance", optionTranslation: "servicesFilter.maintenance", active: false },
  ]);

  // Filter projects based on the active filter
  const FilteredImages = projectsImages.filter((image) => image.category === activeFilter);

  // Handle filter button clicks
  const handleFilter = (id, option) => {
    setFilterItems((prev) =>
      prev.map((item) => ({ ...item, active: item.id === id }))
    )
    setActiveFilter(option)
  }

  // Handle project image click to open Lightbox
  const handleImageClick = (project) => {
    const projectSlides = project.images.map((image) => ({
      src: image,
    }));
    setSlides(projectSlides);
    setIsOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Projects - Waveast</title>
        <link rel="canonical" href="/projects" />
        <meta name="description" content="Waveast Installation & Park Services has successfully completed numerous projects around the world, demonstrating our expertise in creating exceptional amusement attractions and water parks."
        />
      </Helmet>
      <div className="projects__page">
        <PageHeader pageTitle={t(`pageTitles.projects`)} />
        <div className="projects__overview container section__padding--block">
          <p>{wrapCompanyName(t(`projectsCompany.0`))}</p>
          <p>{wrapCompanyName(t(`projectsCompany.1`))}</p>
        </div>
        <div className="container">
          <div className="section__padding">
            <SpecialHeadingTwo title={t(`specialHeadings.servicesGallery`)} />
          </div>
          <div className="projects-filter">
            {filterItems.map((item) => (
              <button
                key={item.id}
                className={`projects-filter__btn ${item.active ? "projects-filter__btn--active" : ""}`}
                onClick={() => handleFilter(item.id, item.option)}
              >
                {t(item.optionTranslation)}
              </button>
            ))}
          </div>
          <div className="projectImage-gallery container section__padding--bottom">
            {FilteredImages.map((project, projectIndex) => (
              <div
                key={projectIndex}
                className="projectImage-gallery__image"
                onClick={() => handleImageClick(project)}
              >
                {project.images && project.images[0] && (
                  <>
                    <LazyLoad height={200} offset={100} className="projectImage-gallery__lazyload" placeholder={<div className="projectImage-gallery__placeholder"></div>}>
                      <img
                        className="projectImage-gallery__img"
                        src={project.images[0]}
                        alt={t(project.name)}
                      />
                    </LazyLoad>
                    <div className="projectImage-gallery__overlay"></div>
                    <div className="projectImage-gallery__info">
                      <span className="projectImage-gallery__name">{t(project.name)}</span>
                      <span className="projectImage-gallery__country">{t(project.country)}</span>
                    </div>
                    <span className="projectImage-gallery__number">
                      <BiSolidLayer />
                      {project.images.length}
                    </span>
                  </>
                )}
              </div>
            ))}
          </div>
          <Lightbox
            open={isOpen}
            close={() => setIsOpen(false)}
            slides={slides}
            plugins={[Captions, Download, Fullscreen, Counter, Zoom, Thumbnails]}
            carousel={{ finite: true }}
          />
        </div>
      </div>
    </>
  );
}

export default Projects;