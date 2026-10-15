import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import GamePage from "./pages/GamePage/GamePage.tsx";
import Layout from "./components/layout.tsx";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/game/:slug" element={<GamePage />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;