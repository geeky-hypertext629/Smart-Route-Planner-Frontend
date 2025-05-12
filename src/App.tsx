import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Map from './components/Map';
import Landing from './Landing';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;