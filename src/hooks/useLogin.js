import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/redux";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bootstrapClassname, setBootstrap] = useState(null);
  const [client, setClient] = useState(null);

  //redux
  const dispatch = useDispatch();

  const login = async (phone, passwordToTest) => {
    setIsLoading(true);
    setError(null);
    if (!phone.length || !passwordToTest.length) {
      setBootstrap("alert alert-warning");
      setError("Veuillez remplir les champs obligatoires.");
      setIsLoading(false);
      return;
    }
    const phoneNumber = phone.trim().replace(/\s/g, "");
    const password = passwordToTest.trim().replace(/\s/g, "");
    const phoneNumberRegex = /^(03[2,3,4,8])(\d{7})$|^(3[2,3,4,8])(\d{7})$/;
    if (phoneNumberRegex.test(phoneNumber)) {
      if (phoneNumber.length === 10 || phoneNumber.length === 9) {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_PROXY}/api/census-taker/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
              body: JSON.stringify({ phone: phoneNumber, password }),
            }
          );

          const json = await response.json();

          if (!response.ok) {
            setError(json.error);
            setIsLoading(false);
            setBootstrap("alert alert-danger");
          }

          if (response.ok) {
            setBootstrap("alert alert-success");
            setError("Vous vous êtes connecté(e) maintenant!");
            localStorage.setItem("user", JSON.stringify(json));
            dispatch(setUser(json.client));
            setIsLoading(false);
            setClient(json.client);
            window.location.href="/";
          }
        } catch (error) {
          setBootstrap("alert alert-danger");
          setError("Une erreur s'est produite lors de l'envoi du message.");
          setIsLoading(false);
        }
      }
    } else {
      // Phone number has invalid format
      setBootstrap("alert alert-danger");
      setError("votre numéro de téléphone n'est pas correct.");
      setIsLoading(false);
    }
  };

  const loginWithFacebookID = async (facebookID) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_PROXY}/api/census-taker/connect/${facebookID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        setIsLoading(false);
        setBootstrap("alert alert-danger");
      }

      if (response.ok) {
        setBootstrap("alert alert-success");
        setError("Vous vous êtes connecté(e) maintenant!");
        localStorage.setItem("user", JSON.stringify(json));
        dispatch(setUser(json.client));
        setIsLoading(false);
        setClient(json.client);
        window.location.href="/";
      }
    } catch (error) {
      setBootstrap("alert alert-danger");
      setError("Une erreur s'est produite lors de l'envoi du message.");
      setIsLoading(false);
    }
  };

  return { loginWithFacebookID, login, isLoading, error, bootstrapClassname, client };
};
