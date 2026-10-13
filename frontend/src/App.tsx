import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import GamePage from "./pages/GamePage/GamePage.tsx";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:name" element={<GamePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;