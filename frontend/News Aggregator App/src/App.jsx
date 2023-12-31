import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import FetchData from './components/FetchData';
import Home from './components/Home';
import SignUp from './components/SignUp_Login_page/SignUp';
import Login from './components/SignUp_Login_page/Login';
import ReadLater from './components/readLater';
import Error from './components/SignUp_Login_page/Error';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchResults from './components/SearchResults'


function App() {



  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/ipl' element={<FetchData cat="ipl" />} />
          <Route path='/finance' element={<FetchData cat="finance" />} />
          <Route path='/politics' element={<FetchData cat="politics" />} />
          <Route path='/search/:searchText' element={<SearchResults />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/readlater' element={<ReadLater />} />
          <Route path='*' element={<Error />} />
        </Routes>

        <Footer />
        <ToastContainer autoClose={1000} />
      </BrowserRouter>
    </>

  )
}

export default App
