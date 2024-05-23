import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './layouts/Header';
import Home from './pages/Home';
import About from './pages/About';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className='App'>
        <Header />
        <Routes>
          <Route exact path='/' Component={Home} />
          <Route path='/about' Component={About} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
