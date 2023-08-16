import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Landing from './pages/Landing';
import BidListPage from './pages/BidListPage';
import Vehicle from './components/Vehicle';

function App() {
  return (
    <div className="App">
      <div className="">
        <BrowserRouter>
          <Link
            className="border-2 text-pink-600 border-pink-600 p-4
            mb-12"
            to={'./current-bids'}
          >
            Show Bids
          </Link>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/current-bids" element={<BidListPage />} />
            <Route path="/vehicle/:id" element={<Vehicle />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
