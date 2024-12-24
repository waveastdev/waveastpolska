import { memo } from "react"
import { useTranslation } from "react-i18next"
import { VectorMap } from "@react-jvectormap/core"
import { worldMill } from "@react-jvectormap/world"
import { projectPlacesEn } from "../../data/projectPlacesEn"
import SpecialHeading from "../specialHeading/SpecialHeading"
import "./projectsMain.css"

const ProjectsMain = memo(function ProjectsMain() {

    const {t} = useTranslation()

    return (
        <div className="projects__main">
            <div className="section__padding--block container">
                <SpecialHeading title={t(`sectionHeadings.projects.title`)} subtitle={t(`sectionHeadings.projects.subTitle`)} />
                <div style={{maxWidth: "700px", height: "400px", margin: "auto"}}>
                    <VectorMap map={worldMill}
                    containerStyle={{width: "100%", height: "100%"}}
                    backgroundColor="var(--moonstone)"
                    markers= {projectPlacesEn}
                    markerStyle= {{initial: {fill: 'var(--static-mint-cream)', stroke: 'var(--static-cyan-dark)'}}}
                    />
                </div>
            </div>
        </div>
    )
})

export default ProjectsMain