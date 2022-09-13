import './App.css';
import Bazar from './pages/Bazar'
import ChatPage from './pages/ChatPage'
import AuthenticationPage from './pages/AuthenticationPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ServicesUserPage from './pages/ServicesUserPage'
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Bazar/>} exact/>
            <Route path='/chats' element={<ChatPage />} />
            <Route path='/auth' element={<AuthenticationPage />} />
            <Route path='/services' element={<ServicesUserPage />} />
            <Route path='*' element={<ErrorPage error={404}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
