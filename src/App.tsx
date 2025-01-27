import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import "./index.css"
import Today from "./pages/Today"
import Upcoming from "./pages/Upcoming"
import Projects from "./pages/Projects"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Today />} />
          <Route path="today" element={<Today />} />
          <Route path="upcoming" element={<Upcoming />} />
          <Route path="projects" element={<Projects />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
