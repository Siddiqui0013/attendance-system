import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserPanel from './components/UserPanel';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar'
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <Router>
    <Navbar/>
      <Routes>
        <Route path="/user"  element={<UserPanel/>} />
        <Route path="/admin"  element={<AdminPanel/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register"  element={<Register/>} />
      </Routes>
    </Router>

          <ToastContainer
      position="bottom-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      theme="dark"
      transition={Bounce}
      />

    </>
  );
}

export default App;
