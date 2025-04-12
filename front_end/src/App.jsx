import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Header from './components/Header';
import Home from "./pages/home";
//import Login from './pages/Login';
//import Register from './pages/Register';
// import MovieDetails from './pages/MovieDetails';
// import WriteReview from './pages/WriteReview';
// import MyAccount from './pages/MyAccount';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/review/:id" element={<WriteReview />} />
      <Route path="/account" element={<MyAccount />} /> */}
    </Routes>
  );
}

export default App;
