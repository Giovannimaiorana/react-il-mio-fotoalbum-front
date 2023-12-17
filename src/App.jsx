import { useState } from "react";
import AppHome from "./pages/AppHome";
import AppHeader from "./components/AppHeader";
import AppLogin from "./pages/AppLogin";
import AppDashboard from "./pages/AppDashboard";
import AppGallery from "./pages/AppGallery";
import AppContact from "./pages/AppContact";
import AppAddPhoto from "./pages/AppAddPhoto";
import AppMyMail from "./pages/AppMyMail";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./middleware/AppPrivateRoutes";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppHeader />
        <Routes>
          <Route>
            <Route path="/" element={<AppHome />} />
            <Route path="/login" element={<AppLogin />} />
            <Route path="/album" element={<AppGallery />} />
            <Route path="/contact" element={<AppContact />} />
            {/* Rotte private */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <AppDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/AddPhoto"
              element={
                <PrivateRoute>
                  <AppAddPhoto />
                </PrivateRoute>
              }
            />
            <Route
              path="/lamiaposta"
              element={
                <PrivateRoute>
                  <AppMyMail />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
