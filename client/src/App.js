import './App.css';
import ConditionalRoutes from './routes/conditionalRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
   <ConditionalRoutes />
   <ToastContainer />
    </>
  );
}

export default App;
