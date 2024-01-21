import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//components
import Nav from './Components/Navbar/Nav';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import Explore from './Components/Explore/explore';
import Add from './Components/Add Destination/Add';
//context retrieval
import DataProvider from './context/DataProvider';
import PlaceReviews from './Components/Reviews/PlaceReviews';
import SingleReview from './Components/Reviews/SingleReview';
import PrivateComponent from './Components/PrivateComponent';
import Profile from './Components/User Info/Profile';
import ScrollToTop from './ScrollToTop';
import Uploads from './Components/User Info/Uploads';
import UpdateReview from './Components/Reviews/Update/UpdateReview';


function App() {
  return (
    <DataProvider>
      <div className="App">
    <BrowserRouter>
    <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/explore/:place" element={<PlaceReviews />} />
        <Route element={<PrivateComponent />}>
        <Route path="/add" element={<Add />} />
        <Route path="/review/:id" element={<SingleReview />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/my-uploads/:id" element={<Uploads />} />
        <Route path="/update-review/:id" element={<UpdateReview />} />
        </Route>
      </Routes>
    </BrowserRouter>
      <Footer />
    </div>
    </DataProvider>
  );
}

export default App;
