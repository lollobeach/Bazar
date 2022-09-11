import './App.css';
import Bazar from './pages/Bazar'
import ChatPage from './pages/ChatPage'
import AuthenticationPage from './pages/AuthenticationPage'
import ServicesPage from './pages/ServicesPage'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Bazar/>} exact/>
        <Route path='/chats' element={<ChatPage />} />
        <Route path='/auth' element={<AuthenticationPage />} />
        <Route path='/services' element={<ServicesPage />} />
      </Routes>
    </div>
  );
}

export default App;
