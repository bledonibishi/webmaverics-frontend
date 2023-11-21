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
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import SidebarNavigation from './components/User/Navbar/Sidebar'

const stripePromise = loadStripe(
  'pk_test_51O6hLnBcLIAO3WbOPpjFpaQxGHDBZRkv0SSZxmsXzP46RL4ZguQ5pEZ8JSnTrK6OecJNPwrGZFj61yESSBDFxBYf00RW6LNUCs'
)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Elements stripe={stripePromise}>
        {/* <SidebarNavigation /> */}
        <App />
        <ToastContainer />
      </Elements>
    </Provider>
  </React.StrictMode>
)

reportWebVitals()
