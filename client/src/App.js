import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//components
import Nav from './Components/Navbar/Nav';
import Footer from './Components/Footer/Footer';
import Landing from './Components/Home/Landing/Landing';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import Explore from './Components/Explore/explore';
import Add from './Components/Add Destination/Add';
//context retrieval
import DataProvider from './context/DataProvider';
import PlaceReviews from './Components/Reviews/PlaceReviews';
import SingleReview from './Components/Reviews/SingleReview';
import PrivateComponent from './Components/PrivateComponent';


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
        <Route path="/explore/:place" element={<PlaceReviews />} />
        <Route element={<PrivateComponent />}>
        <Route path="/add" element={<Add />} />
        <Route path="/review/:id" element={<SingleReview />} />
        </Route>
      </Routes>
    </BrowserRouter>
      <Footer />
    </div>
    </DataProvider>
  );
}

export default App;
