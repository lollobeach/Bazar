import './App.css';
import Bazar from './pages/Bazar'
import ChatPage from './pages/ChatPage'
import AuthenticationPage from './pages/AuthenticationPage'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Bazar/>} exact/>
        <Route path='/chats' element={<ChatPage />} />
        <Route path='/auth' element={<AuthenticationPage />} />
      </Routes>
    </div>
  );
}

export default App;
