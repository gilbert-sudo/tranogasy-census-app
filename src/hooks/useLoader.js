import { useDispatch } from "react-redux";
import { setLikedPropreties, setBooking } from "../redux/redux";

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

  return { loadLikes, loadBooking };
};

