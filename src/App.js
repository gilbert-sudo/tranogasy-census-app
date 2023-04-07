import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import PageLoader from "./pages/PageLoader";
import PropertyDetailsPage from "./pages/PropertyDetailsPage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import SignUpPage from "./pages/SignUpPage";
import MessagePage from "./pages/MessagePage";
import BookingPage from "./pages/BookingPage";
import FavoritePage from "./pages/FavoritePage";
import Navbar from "./components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./redux/redux";
import { useEffect } from "react";
import { useLogin } from "./hooks/useLogin";

function App() {
  // const topProperties = useSelector((state) => state.topProperties);
  const topProperties = useSelector((state) => state.topProperties);
  const user = useSelector((state) => state.user);
  const googleLogin = useSelector((state) => state.googleLogin);
  const dispatch = useDispatch();
  const { loginWith } = useLogin();

  useEffect(() => {
    if (!user) {
      const localUser = JSON.parse(localStorage.getItem("user"));
      if (localUser) {
        dispatch(setUser(localUser.client));
      }
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (!user) {
      if (
        googleLogin.googleLogin !== undefined &&
        googleLogin.googleLogin === false
      ) {
        loginWith();
      }
    }
  }, [user, loginWith, googleLogin]);

  return (
    <div className="App">
      <BrowserRouter>
        {topProperties && <Navbar />}
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={topProperties ? <Home /> : <Navigate to="/loader" />}
            />
            <Route path="/property/:id" element={<PropertyDetailsPage />} />
            <Route path="/loader" element={<PageLoader />} />
            <Route
              path="/user"
              element={user ? <UserPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <LoginPage /> : <Navigate to="/user" />}
            />
            <Route
              path="/signup"
              element={!user ? <SignUpPage /> : <Navigate to="/user" />}
            />
            <Route
              path="/message"
              element={user ? <MessagePage /> : <Navigate to="/login" />}
            />
            <Route
              path="/booking"
              element={user ? <BookingPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/favorite"
              element={user ? <FavoritePage /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
