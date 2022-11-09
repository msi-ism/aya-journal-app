import logo from './logo.svg';
import './App.css';
import {useState} from 'react'
import {Route, Routes} from 'react-router-dom'
import { getUser} from './utilities/users-service'
import AuthPage from './pages/AuthPage';
import NewOrderPage from './pages/NewOrderPage';
import OrderHistory from './pages/OrderHistory';
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';



function App() {
  const [user,  setUser] = useState(getUser())
  return (
    <main className="App">
      { user? (
      <>
          <NavBar user={user} />
          <Routes> 
            <Route path='/auth' element={<AuthPage/>} />
            <Route path='/orders/new' element={<NewOrderPage/>} />
            <Route path='/orders' element={<OrderHistory/>} />
          </Routes>
          <Footer />
        </>
      ) : (
        <>
        <NavBar setUser={setUser}/> 
        <Routes> 
            <Route path='/' element={<HomePage />} />
            <Route path='/auth' element={<AuthPage/>} />
          </Routes>

        {/* <AuthPage setUser={setUser} /> */}
        <Footer />
      </>
      )}
    </main>
  );
}

export default App;
