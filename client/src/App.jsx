import { Routes, Route } from "react-router-dom"
import Layout from "./components/layout/Layout"
import Home from "./pages/home/Home"
import About from "./pages/about/About"
import Services from "./pages/services/Services"
import Projects from "./pages/projects/Projects"
import Contact from "./pages/contact/Contact"
import BHP from "./pages/bhp/BHP"
import Privacy from "./pages/privacy/Privacy"
import NotFound from "./pages/notFound/NotFound"

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="projects" element={<Projects />} />
        <Route path="contact" element={<Contact />} />
        <Route path="bhp" element={<BHP />} />
        <Route path="privacy" element={<Privacy />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  )
}

export default App