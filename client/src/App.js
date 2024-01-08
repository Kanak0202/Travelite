import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//components
import Nav from './Components/Navbar/Nav';
import Footer from './Components/Footer/Footer';
import Landing from './Components/Home/Landing/Landing';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import Explore from './Components/Explore/explore';
//context retrieval
import DataProvider from './context/DataProvider';


function App() {
  return (
    <DataProvider>
      <div className="App">
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/explore" element={<Explore />} />
      </Routes>
    </BrowserRouter>
      <Footer />
    </div>
    </DataProvider>
  );
}

export default App;
