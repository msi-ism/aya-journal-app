import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {getUser} from './utilities/users-service'
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import FeedPage from './pages/FeedPage';
import JournalPage from './pages/JournalPage';
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
            <Route exact path='/' element={<JournalPage user={user}/>} />
            <Route path='/home' element={<HomePage user={user} />} />
          </Routes>
        </>
      ) : (
        <>
        <NavBar user={user} />
        <Routes> 
            <Route exact path='/' element={<HomePage setUser={setUser}/>} />
            <Route exact path='/auth' element={<AuthPage setUser={setUser}/>} ></Route>
            <Route exact path="/*" element={<Navigate exact to="/" />} />
        </Routes>
      </>
      )}
    </main>
  );
}

export default App;
