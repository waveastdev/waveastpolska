import React, { useState, useCallback } from "react"
import { Helmet } from "react-helmet-async"
import { useTranslation } from "react-i18next"
import { wrapCompanyName } from "../../utils/wrapCompanyName"
import { getProjectsCount, countUniqueCountries, yearFounded, teamSize } from "../../utils/companyCounter"
import Vision from "../../components/svg/Vision"
import Mission from "../../components/svg/Mission"
import Values from "../../components/svg/Values"
import PageHeader from "../../components/pageHeader/PageHeader"
import SpecialHeadingTwo from "../../components/specialHeadingTwo/SpecialHeadingTwo"
import Wawist from "../../components/svg/Wawist"
import levent from "../../assets/team/levent.png"
import fatih from "../../assets/team/fatih.png"
import DetailModal from "../../components/detailModal/DetailModal"
import useBodyOverflow from "../../hooks/useBodyOverflow"
import "./about.css"

const reasons = [
    {id: 1, titleKey:"whyWe.0.title", paragraphKey:"whyWe.0.paragraph"},
    {id: 2, titleKey:"whyWe.1.title", paragraphKey:"whyWe.1.paragraph"},
    {id: 3, titleKey:"whyWe.2.title", paragraphKey:"whyWe.2.paragraph"},
    {id: 4, titleKey:"whyWe.3.title", paragraphKey:"whyWe.3.paragraph"},
    {id: 5, titleKey:"whyWe.4.title", paragraphKey:"whyWe.4.paragraph"},
    {id: 7, titleKey:"whyWe.5.title", paragraphKey:"whyWe.5.paragraph"},
    {id: 8, titleKey:"whyWe.6.title", paragraphKey:"whyWe.6.paragraph"}
]

const values = [
    {id: 1, valueKey: "companyValues.paragraph.0"},
    {id: 2, valueKey: "companyValues.paragraph.1"},
    {id: 3, valueKey: "companyValues.paragraph.2"},
    {id: 4, valueKey: "companyValues.paragraph.3"},
    {id: 5, valueKey: "companyValues.paragraph.4"},
    {id: 6, valueKey: "companyValues.paragraph.5"}
]

function About() {

    const {t} = useTranslation()
    const projectCount = getProjectsCount()
    const countryCount = countUniqueCountries()

    const [showDetailModal, setShowDetailModal] = useState(false)
    const [modalContent, setModalContent] = useState({ title: "", content: [] })

    useBodyOverflow(showDetailModal)

    const teamMembers = [
        { name: t("teamMembers.0.name"), title: t("teamMembers.0.title"), alt: t("teamMembers.0.alt"), image: fatih, learnMore: t("teamMembers.0.learnMore"),
          content: [t("teamMembers.0.content.0"), t("teamMembers.0.content.1"), t("teamMembers.0.content.2")]
        },
        { name: t("teamMembers.1.name"), title: t("teamMembers.1.title"), alt: t("teamMembers.1.alt"), image: levent, learnMore: t("teamMembers.1.learnMore"),
          content: [t("teamMembers.1.content.0"), t("teamMembers.1.content.1"), t("teamMembers.1.content.2")]
        },
    ]
    
    const openDetailModal = useCallback(() => {
        setShowDetailModal(true)
    }, [])

    const closeDetailModal = useCallback(() => {
        setShowDetailModal(false)
    }, [])

    const learnMore = (name, content) => {
        setModalContent({ title: name, content })
        openDetailModal()
    }

    return (
        <>
        <Helmet>
            <title>About - Waveast</title>
            <link rel="canonical" href="/about" />
            <meta name="description" content="Founded in Warsaw, Poland, Waveast provides high-quality amusement & entertainment solutions for hotels, theme parks, water parks & camping sites. We offer a variety of services with over 10 years of experience and a global presence." />
        </Helmet>
        <div className="about__page">
            <PageHeader pageTitle={t(`pageTitles.about`)} />
            <div className="about__company container section__padding--block">
                <p>{wrapCompanyName(t(`aboutCompany.0`, { yearFounded, teamSize }))}</p>
                <p>{wrapCompanyName(t(`aboutCompany.1`, { projectCount, countryCount }))}</p>
                <p>{wrapCompanyName(t(`aboutCompany.2`))}</p>
            </div>
            <div className="company__team">
                <div className="company__team-container section__padding--block">
                    {teamMembers.map((member, index) => (
                        <div className="team__member" key={index}>
                            <div className="team__member-image">
                                <img className="team__member-img" src={member.image} alt={member.alt} />
                            </div>
                            <div className="team__member-name">{member.name}</div>
                            <div className="team__member-title">{member.title}</div>
                            <button className="team__member-btn" onClick={() => learnMore(member.name, member.content)} >
                                {member.learnMore}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="section__padding--block container">
                <SpecialHeadingTwo title={t(`specialHeadings.whyWe`)} />
                {reasons.map((reason) => (
                    <div className="reason__container" key={reason.id}>
                        <div className="reason__number"></div>
                        <div className="reason__content">
                            <h3 className="reason__title">{t(reason.titleKey)}</h3>
                            <p className="reason__para">{t(reason.paragraphKey)}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="section__padding--block container">
                <SpecialHeadingTwo title={t(`specialHeadings.visionMissionValues`)} />
                <div className="statements">
                    <div className="statement">
                        <div className="statement__icon"><Vision /></div>
                        <div className="statement__container">
                            <div className="statement__hidden"></div>
                            <h3 className="statement__title">{t(`companyVision.title`)}</h3>
                            <p className="statement__content">{t(`companyVision.paragraph`)}</p>
                        </div>
                    </div>
                    <div className="statement">
                        <div className="statement__icon"><Mission /></div>
                        <div className="statement__container">
                            <div className="statement__hidden"></div>
                            <h3 className="statement__title">{t(`companyMission.title`)}</h3>
                            <p className="statement__content">{t(`companyMission.paragraph`)}</p>
                        </div>
                    </div>
                    <div className="statement">
                        <div className="statement__icon"><Values /></div>
                        <div className="statement__container">
                            <div className="statement__hidden"></div>
                            <h3 className="statement__title">{t(`companyValues.title`)}</h3>
                            <p className="statement__content statement__content--values">
                                {values.map((value) => (
                                    <React.Fragment key={value.id}>
                                        {t(value.valueKey)}<br/>
                                    </React.Fragment>
                                ))}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="section__people">
                <div className="section__padding--block container">
                    <SpecialHeadingTwo title={t(`specialHeadings.people`)} />
                    <div className="company__people">
                        <p>{wrapCompanyName(t(`companyPeople.0`))}</p>
                        <p>{wrapCompanyName(t(`companyPeople.1`))}</p>
                    </div>
                    <div className="company__team">
                        {teamMembers.map((member, index) => (
                            <div className="team__member" key={index}>
                                <div className="team__member-image">
                                    <img className="team__member-img" src={member.image} alt={member.alt} />
                                </div>
                                <div className="team__member-name">{member.name}</div>
                                <div className="team__member-title">{member.title}</div>
                                <button className="team__member-btn" onClick={() => learnMore(member.name, member.content)} >
                                    {member.learnMore}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div> */}
            <div className="section__padding--block container">
                <SpecialHeadingTwo title={t(`specialHeadings.behindName`)} />
                <div className="company__name">
                    <div className="company__name-para company__people">
                        <p>{wrapCompanyName(t(`companyName.0`))}</p>
                        <p>{wrapCompanyName(t(`companyName.1`))}</p>
                    </div>
                    <div className="company__name-svg">
                        <Wawist />
                    </div>
                </div>
            </div>
        </div>
        <DetailModal title={modalContent.title} content={modalContent.content} showDetailModal={showDetailModal} closeDetailModal={closeDetailModal} />
        </>
    )
}

export default About