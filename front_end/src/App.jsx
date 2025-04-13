import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import MovieDetails from "./pages/moviedetails";
// import WriteReview from './pages/WriteReview';
// import MyAccount from './pages/MyAccount';

function App() {
  return (
    <>
      <main>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          {/* <Route path="/review/:id" element={<WriteReview />} />
          <Route path="/account" element={<MyAccount />} /> */}
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
