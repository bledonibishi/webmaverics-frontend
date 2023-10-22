import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import './assets/styles/main.scss'
// import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'

import { Provider } from 'react-redux'
import store from './store'
import { ToastContainer } from 'react-toastify'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </React.StrictMode>
)

reportWebVitals()
