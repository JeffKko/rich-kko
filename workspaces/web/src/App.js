import logo from './logo.svg';
import './App.css';
import {
  Routes,
  Route,
  BrowserRouter,
} from 'react-router-dom'
import Dashboard from './components/dashboard'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact  element={<Dashboard/>} />
        <Route path="/ranking" />
        <Route path="/new" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
