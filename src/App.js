import logo from './logo.svg';
import './App.css';
import {useState} from 'react'
import {Route, Routes} from 'react-router-dom'
import {getUser} from './utilities/users-service'
import AuthPage from './pages/AuthPage';
import NewOrderPage from './pages/NewOrderPage';
import OrderHistory from './pages/OrderHistory';
import HomePage from './pages/HomePage';
import FeedPage from './pages/FeedPage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';



function App() {
  const [user,  setUser] = useState(getUser())
  return (
    <main className="App">
      { user? (
      <>
          {/* <NavBar user={user} /> */}
          {/* <FeedPage /> */}
          <Routes>
            <Route path='/' element={<FeedPage />} />
            <Route path='/home' element={<HomePage user={user} />} />
            <Route path='/orders/new' element={<NewOrderPage/>} />
            <Route path='/orders' element={<OrderHistory/>} />
          </Routes>
        </>
      ) : (
        <>
        <Routes> 
            <Route path='/' element={<HomePage setUser={setUser}/>} />
            <Route path='/auth' element={<AuthPage setUser={setUser}/>} />
        </Routes>

        {/* <AuthPage setUser={setUser} /> */}
      </>
      )}
    </main>
  );
}

export default App;
