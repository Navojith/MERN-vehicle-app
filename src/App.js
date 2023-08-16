import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './routes/Landing';
import BidListPage from './routes/BidListPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/current-bids" element={<BidListPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
