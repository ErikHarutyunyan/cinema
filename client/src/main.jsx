import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import App from './App.jsx';
import { store } from './app/store.js';
import { GlobalStyle } from './themes/GlobalStyle';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <>
    <GlobalStyle />
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </>
  // </React.StrictMode>,
);
