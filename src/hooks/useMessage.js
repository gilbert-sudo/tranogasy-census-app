import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBooking } from "../redux/redux";

export const useMessage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [msgError, setMsgError] = useState(null);
  const [bootstrapClassname, setBootstrap] = useState(null);
  const [resetAgentInput, setResetAgentInput] = useState(false); // new state

  const dispatch = useDispatch()
  //redux

  const postMessage = async (
    name,
    phone,
    email,
    message,
    propertyId,
    userId,
    imageId,
    cityId
  ) => {
    setIsLoading(true);
    setMsgError(null);

    if (!name.length || !phone.length) {
      setBootstrap("alert alert-warning");
      setMsgError("Le nom et numéro de téléphone sont obligatoires.");
      setIsLoading(false);
      return;
    }

    const phoneNumberRegex = /^(03[2,3,4,8])(\d{7})$|^(3[2,3,4,8])(\d{7})$/;
    const phoneNumber = phone;

    if (phoneNumberRegex.test(phoneNumber)) {
      if (phoneNumber.length === 10 || phoneNumber.length === 9) {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_PROXY}/api/messages`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
              body: JSON.stringify({
                name,
                phone,
                email,
                message,
                propertyId,
                userId,
                imageId,
                cityId,
              }),
            }
          );

          const json = await response.json();

          if (response.ok) {
            let msg = "Votre message a été envoyé avec succès";
            let bootstrapClass = "alert alert-success";
            setBootstrap(bootstrapClass);
            setMsgError(msg);
            setIsLoading(false);
            setResetAgentInput(true);
            dispatch(addBooking(json));
          } else if (response.errors) {
            let msg =
              response.errors.phone ||
              response.errors.message ||
              response.errors.email ||
              response.errors.name;
            let bootstrapClass = "alert alert-danger";
            setBootstrap(bootstrapClass);
            setMsgError(msg);
            setIsLoading(false);
          } else {
            let msg = response.error;
            let bootstrapClass = "alert alert-danger";
            setBootstrap(bootstrapClass);
            setMsgError(msg);
            setIsLoading(false);
          }
        } catch (error) {
          console.log(error);
          let msg = "Une erreur s'est produite lors de l'envoi du message.";
          let bootstrapClass = "alert alert-danger";
          setBootstrap(bootstrapClass);
          setMsgError(msg);
          setIsLoading(false);
        }
      } else {
        // Phone number has invalid length
        let msg = "votre numéro de téléphone n'est pas validé.";
        let bootstrapClass = "alert alert-danger";
        setBootstrap(bootstrapClass);
        setMsgError(msg);
        setIsLoading(false);
      }
    } else {
      // Phone number has invalid format
      let msg = "votre numéro de téléphone n'est pas validé.";
      let bootstrapClass = "alert alert-danger";
      setBootstrap(bootstrapClass);
      setMsgError(msg);
      setIsLoading(false);
    }
  };

  return {
    postMessage,
    isLoading,
    msgError,
    bootstrapClassname,
    resetAgentInput,
  };
};
