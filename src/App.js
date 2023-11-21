import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import UserRoutes from './config/UserRoutes'
import AdminRoutes from './config/AdminRoutes'
import { useEffect } from 'react'
import { gapi } from 'gapi-script'

function App() {
  // useEffect(() => {
  //   function start() {
  //     gapi.client.init({
  //       cliendId: clientId,
  //       scope: '',
  //     })
  //   }

  //   gapi.load('client:auth2', start)
  // })

  return (
    <Router>
      <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </Router>
  )
}

export default App
