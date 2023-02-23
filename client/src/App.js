import './App.css';
import { Route,Routes } from 'react-router-dom';
import Home from './container/home';
import AddItems from './container/Admin/addItems';

function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<AddItems />} />
    </Routes> 
    </div>
  );
}

export default App;
