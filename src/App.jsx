import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ProtectRoute from "./components/ProtectRoute";
import PublicRoute from "./components/PublicRoute";
import { AuthProvider } from "./context/AuthContext";
import { NotesProvider } from "./context/NotesContext";

function App() {
  return (
    <AuthProvider>
      <NotesProvider>
        <Router>
          <Routes>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route
              path="/dashboard"
              element={
                <ProtectRoute>
                  <Home />
                </ProtectRoute>
              }
            />
            <Route
              path="/signUp"
              element={
                <PublicRoute>
                  <SignUp />
                </PublicRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
          </Routes>
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: { duration: 3000 },
              error: { duration: 5000 },
              style: {
                fontSize: "15px",
                textAlign: "center",
                maxWidth: "500px",
                padding: "18px 24px",
                backgroundColor: "#ffffff",
                color: "#000000"
              }
            }}
          />
        </Router>
      </NotesProvider>
    </AuthProvider>
  );
}

export default App;
