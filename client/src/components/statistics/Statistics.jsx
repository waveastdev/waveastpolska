import { memo } from "react"
import { useTranslation } from "react-i18next"
import { getProjectsCount, getYearsSince2011, countUniqueCountries, continent } from "../../utils/companyCounter"
import "./statistics.css"

const Statistics = memo(function Statistics() {

    const {t} = useTranslation()
    const experienceCount = `+${getYearsSince2011()}`
    const projectCount = `+${getProjectsCount()}`

    const statistics = [
        { id: 1, title: experienceCount, statisticsKey: "statistics.0" },
        { id: 2, title: projectCount, statisticsKey: "statistics.1" },
        { id: 3, title: countUniqueCountries().toString(), statisticsKey: "statistics.2" },
        { id: 4, title: continent, statisticsKey: "statistics.3" }
    ]

    return (
        <div className="statistics container section__padding--block" >
            {
                statistics.map((statistic) => {
                    return (
                        <div className="statistic" key={statistic.id}>
                            <div className="statistic__title">{statistic.title}</div>
                            <p>{t(statistic.statisticsKey)}</p>
                        </div>
                    )
                })
            }
        </div>
    )
})

export default Statistics