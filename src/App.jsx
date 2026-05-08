import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetail from "./pages/MovieDetail";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <main>
          <Routes>
            {/* Statis 1 */}
            <Route path="/" element={<Home />} />

            {/* Statis 2 */}
            <Route path="/movies" element={<Movies />} />

            {/* Dynamic Route */}
            <Route path="/movies/:movieId" element={<MovieDetail />} />

            {/* Statis 3 */}
            <Route path="/about" element={<About />} />

            {/* Statis 4 - 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
