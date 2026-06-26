import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MyCommute from './pages/MyCommute'
import LineExplorer from './pages/LineExplorer'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MyCommute />} />
        <Route path="/lines/:line" element={<LineExplorer />} />
      </Routes>
    </BrowserRouter>
  )
}
