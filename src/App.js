import logo from './logo.svg';
import './App.css';
import {useState} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {getUser} from './utilities/users-service'
import AuthPage from './pages/AuthPage';
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
          <Routes>
            <Route path='/' element={<FeedPage user={user}/>} />
            <Route path='/home' element={<HomePage user={user} />} />
          </Routes>
        </>
      ) : (
        <>
        <Routes> 
            <Route path='/' element={<AuthPage setUser={setUser}/>} ></Route>
            <Route path="/*" element={<Navigate to="/" />} />
            {/* <Route path='/' element={<HomePage setUser={setUser}/>} /> */}
        </Routes>

        {/* <AuthPage setUser={setUser} /> */}
      </>
      )}
    </main>
  );
}

export default App;
