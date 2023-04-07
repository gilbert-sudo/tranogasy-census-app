import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBooking } from "../redux/redux";

export const useBooking = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const cancelBooking = async (messageId) => {
    const response = await fetch(
      `${process.env.REACT_APP_PROXY}/api/messages/${messageId}`,
      {
        method: "DELETE",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

    if (response.ok) {
      setError({ error: false });
      dispatch(deleteBooking(messageId));
    }
    if (!response.ok) {
      setError({ error: true });
    }
  };

  return { cancelBooking, error };
};
