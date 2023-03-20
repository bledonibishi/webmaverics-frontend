import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLayout from "./layout/UserLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserLayout />} />
        <Route path="/user" element={<UserLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
// import React, { useEffect } from "react";
// import { Route, Routes } from "react-router";
// import { BrowserRouter as Router, Navigate } from "react-router-dom";

// import AdminLayout from "./layout/AdminLayout";
// import UserLayout from "./layout/UserLayout";
// // import RTLLayout from "layouts/RTL.js";
// // import AuthLayout from "layouts/Auth.js";
// // import CourseLayout from "layouts/Course";

// function App(props) {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/user" render={(props) => <UserLayout {...props} />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
