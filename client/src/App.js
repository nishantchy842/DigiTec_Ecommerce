import './App.css';
import { Route,Routes } from 'react-router-dom';
import Home from './container/home';
import AddItems from './container/Admin/addItems';
import Cards from './component/cards';

function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<AddItems />} />
      <Route path='/cards' element={<Cards />} />
    </Routes> 
    </div>
  );
}

export default App;
