import { useDispatch } from "react-redux";
import { setLikedPropreties, setLocationsName, setOwnersName, setQuartersName, setLands, setBooking, setOwner, setLocation, setProperties } from "../redux/redux";

export const useLoader = () => {
  //redux
  const dispatch = useDispatch();

  // Load liked properties
  const loadLikes = async (userId) => {
    const response = await fetch(
      `${process.env.REACT_APP_PROXY}/api/favorite/${userId}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "aplication/json",
        },
      }
    );
    const json = await response.json();
    if (response.ok) {
      dispatch(setLikedPropreties(json));
    }
  };

    // Load liked properties
    const loadBooking = async (userId) => {
      const response = await fetch(
        `${process.env.REACT_APP_PROXY}/api/messages/${userId}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "aplication/json",
          },
        }
      );
      const json = await response.json();
      if (response.ok) {
        dispatch(setBooking(json));
      }
    };
    // Load liked properties
    const loadOwnersName = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_PROXY}/api/owners/all-owners-name`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "aplication/json",
          },
        }
      );
      const json = await response.json();
      if (response.ok) {
        dispatch(setOwnersName(json));
        return json;
      }
    };
    
    
    const loadOwners = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_PROXY}/api/owners/all-owners`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "aplication/json",
          },
        }
      );
      const json = await response.json();
      if (response.ok) {
        dispatch(setOwner(json));
        return json;
      }
    };
    
    const loadQuartersName = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_PROXY}/api/cities/all-quarter-name`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "aplication/json",
          },
        }
      );
      const json = await response.json();
      if (response.ok) {
        dispatch(setQuartersName(json));
        return json;
      }
    };
    const loadLocationsName = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_PROXY}/api/location/names`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "aplication/json",
          },
        }
      );
      const json = await response.json();
      if (response.ok) {
        dispatch(setLocationsName(json));
        return json;
      }
    };

    const loadLocations = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_PROXY}/api/location`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "aplication/json",
          },
        }
      );
      const json = await response.json();
      if (response.ok) {
        dispatch(setLocation(json));
        return json;
      }
    };
    
    const loadProperties = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_PROXY}/api/properties`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "aplication/json",
          },
        }
      );
      const json = await response.json();
      if (response.ok) {
        dispatch(setProperties(json));
        return json;
      }
    };
    const loadLands = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_PROXY}/api/lands`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "aplication/json",
          },
        }
      );
      const json = await response.json();
      if (response.ok) {
        dispatch(setLands(json));
        return json;
      }
    };

  return { loadLikes,loadLands, loadBooking, loadOwnersName, loadLocationsName ,loadOwners, loadQuartersName, loadProperties, loadLocations };
};

