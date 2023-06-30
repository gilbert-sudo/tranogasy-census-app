import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useLoader } from "../hooks/useLoader";
import { setUser } from "../redux/redux";
const CensusAppLoader = () => {
    const { loadProperties } = useLoader();
  const navigate = useNavigate();
  //redux
  const dispatch = useDispatch();
  const properties = useSelector((state) => state.properties);
  const user = useSelector((state) => state.user);
  if (properties !== null && user !== null) {
    navigate("/");
  }

  useEffect(() => {
    const pageLoader = async () => {
         await loadProperties();
      };
    
    if(!properties || !user){
     pageLoader();
     const localUser = JSON.parse(localStorage.getItem("user"));
     if (localUser) {
       dispatch(setUser(localUser.censusTaker));
     }
    }


    // Redirect the user when data is loaded
  }, [dispatch, properties, user, setUser]);
  // Render the main content

  return (
    <div>
      <div className="logo-loader"></div>
      <div className="page-loader"></div>
    </div>
  );
};

export default CensusAppLoader;
