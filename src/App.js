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



function App() {
  const [user,  setUser] = useState(getUser())
  return (
    <main className="App">
      { user? (
      <>
          <NavBar user={user} />
          <Routes> 
            <Route path='/orders/new' element={<NewOrderPage/>} />
            <Route path='/orders' element={<OrderHistory/>} />
          </Routes>
        </>
      ) : (
        <>
        <NavBar setUser={setUser}/>  
        <HomePage />
        {/* <AuthPage setUser={setUser} /> */}
      </>
      )}
    </main>
  );
}

export default App;
