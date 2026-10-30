import "./styles/index.css";
import "./styles/App.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./Login";
import Layout from "./Layout";
import Dashboard from "./Dashboard";
import ProfilePage from "./ProfilePage";
import NotFound from "./NotFound";
import ProtectedRoute from "./utils/protectedRoute";
import { UserProvider } from "./context/UserProvider";




ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </UserProvider>
);
