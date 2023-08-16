import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './routes/Landing';
import BidListPage from './routes/BidListPage';
import VehicleDetails from './routes/VehicleDetails';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/current-bids" element={<BidListPage />} />
          <Route path="/vehicle/:id" element={<VehicleDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
