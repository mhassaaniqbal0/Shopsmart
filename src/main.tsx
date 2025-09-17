import './index.css';
import './App.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Toaster } from 'react-hot-toast'; 



ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <Toaster position="top-right" reverseOrder={false} /> 
    <App />
  </BrowserRouter>
);