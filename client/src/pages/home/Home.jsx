import { Helmet } from "react-helmet-async"
import Landing from "../../components/landing/Landing"
import SubLinding from "../../components/subLanding/SubLinding"
import ServicesMain from "../../components/servicesMain/ServicesMain"
import Statistics from "../../components/statistics/Statistics"
import ProjectsMain from "../../components/projectsMain/ProjectsMain"
import Faqs from "../../components/faqs/Faqs"
import NewsLetter from "../../components/newsLetter/NewsLetter"
import Partmemb from "../../components/partmemb/Partmemb"
import partners from "../../assets/partners/partners.png"
import isaba from "../../assets/partners/isaba.jpg"
import apex from "../../assets/partners/Apex.jpg"
import dof from "../../assets/partners/DOF.jpg"
import oasys from "../../assets/partners/oasys.jpeg"
import memberships from "../../assets/memberships/memberships.png"
import iaapa from "../../assets/memberships/IAAPAMember.png"
import basenprof from "../../assets/memberships/basenprof.png"

const items = [
    // Partners
    {id: 1, src: partners, altKey: "partners", category: "partners"},
    {id: 2, src: isaba, altKey: "isabaAlt", category: "partners"},
    {id: 3, src: apex, altKey: "apexAlt", category: "partners"},
    {id: 4, src: dof, altKey: "dofAlt", category: "partners"},
    {id: 5, src: oasys, altKey: "oasysAlt", category: "partners"},
    // Memberships
    {id: 6, src: memberships, altKey: "memberships", category: "memberships"},
    {id: 7, src: iaapa, altKey: "iaapaAlt", category: "memberships"},
    {id: 8, src: basenprof, altKey: "basenprofAlt", category: "memberships"}, 
]

function Home() {
    return (
        <>
        <Helmet>
            <title>Home - Waveast</title>
            <link rel="canonical" href="/" />
            <meta name="description" content="Waveast Installation & Park Services is a company that provides engineering, installation, maintenance, expansion, renovation, and consultancy services for amusement items and water parks." />
        </Helmet>
        <div className="home__page">
            <Landing />
            <SubLinding />
            <Statistics />
            <ServicesMain />
            <ProjectsMain />
            <Faqs />
            <Partmemb items={items} />
            <NewsLetter />
        </div>
        </>
    )
}

export default Home