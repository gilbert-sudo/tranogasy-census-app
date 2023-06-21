import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PageLoader from "./pages/PageLoader";
import PropertyListPage from "./pages/PropertyListPage";
import PropertyEditingPage from "./pages/PropertyEditingPage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import SignUpPage from "./pages/SignUpPage";
import MessagePage from "./pages/MessagePage";
import AddingPage from "./pages/AddingPage";
import Navbar from "./components/Navbar";
import OwnerCreation from "./pages/OwnerCreation";
import OwnerListPage from "./pages/OwnerListPage";
import OwnerEditingPage from "./pages/OwnerEditingPage";
import LocationCreationPage from "./pages/LocationCreationPage";
import LocationEditingPage from "./pages/LocationEditingPage";
import LocationListPage from "./pages/LocationListPage";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./redux/redux";
import { useEffect } from "react";
import FullNameUpdating from "./pages/FullNameUpdating";
import EmailUpdating from "./pages/EmailUpdating";
import ContactUpdating from "./pages/ContactUpdating";
import PasswordUpdating from "./pages/PasswordUpdating";
function App() {
  // const topProperties = useSelector((state) => state.topProperties);
  //const topProperties = useSelector((state) => state.topProperties);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      const localUser = JSON.parse(localStorage.getItem("user"));
      if (localUser) {
        dispatch(setUser(localUser.client));
      }
    }
  }, [user, dispatch]);


  return (
    <div className="App">
      <Router>
        {user && <Navbar />}
        <div className="pages">
          <Routes>
          {user && <Route path="/loader" element={<PageLoader />} />}
            <Route
              path="/"
              element={user ? <PropertyListPage/> : <Navigate to="/login" />}
            />
            
            <Route
              path="/user"
              element={user ? <UserPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/update-fullname/:censusTakerId"
              element={user ? <FullNameUpdating /> : <Navigate to="/login" />}
            />
            <Route
              path="/update-contact/:censusTakerId"
              element={user ? <ContactUpdating /> : <Navigate to="/login" />}
            />
            <Route
              path="/update-password/:censusTakerId"
              element={user ? <PasswordUpdating /> : <Navigate to="/login" />}
            />
            <Route
              path="/update-email/:censusTakerId"
              element={user ? <EmailUpdating /> : <Navigate to="/login" />}
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
              path="/property-list"
              element={user ? <PropertyListPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/edit-property/:propertyId"
              element={user ? <PropertyEditingPage /> : <Navigate to="/login" />}
            />
      
            <Route
              path="/owner-list"
              element={user ? <OwnerListPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/edit-owner/:ownerId/:fullName/:address/:phoneOne/:phoneTwo"
              element={user ? <OwnerEditingPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/edit-owner/:ownerId/:fullName/:address/:phoneOne"
              element={user ? <OwnerEditingPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/create-owner"
              element={user ? <OwnerCreation /> : <Navigate to="/login" />}
            />
            <Route
              path="/location-list"
              element={user ? <LocationListPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/create-location"
              element={
                user ? <LocationCreationPage /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/edit-location/:locationId"
              element={
                user ? <LocationEditingPage /> : <Navigate to="/login" />
              }
            />
             <Route
              path="/message"
              element={user ? <MessagePage /> : <Navigate to="/login" />}
            />
            <Route
              path="/adding"
              element={user ? <AddingPage /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
