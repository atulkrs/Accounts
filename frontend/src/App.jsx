import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import AdminDashboard from "./Pages/AdminDashboard";
import CustomerDashboard from "./Pages/CustomerDashboard";
import VendorDashboard from "./Pages/VendorDashboard";
import PrivateRoute from "./Config/PrivateRoute";
import Reports from "./Pages/Reports";
import CreateOrder from "./Pages/CreateOrder";
import ExcelReader from "./Config/ExcelReader";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<Login />} />
        <Route path='/create-order' element={<CreateOrder />} />
        <Route path='/reports' element={<Reports />} />
        <Route path='/reader' element={<ExcelReader />} />

        <Route
          path='/admin'
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path='/customer'
          element={
            <PrivateRoute allowedRoles={["customer"]}>
              <CustomerDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path='/vendor'
          element={
            <PrivateRoute allowedRoles={["vendor"]}>
              <VendorDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
