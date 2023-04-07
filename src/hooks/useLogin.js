import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser, setGoogleLogin } from "../redux/redux";
import axios from "axios";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bootstrapClassname, setBootstrap] = useState(null);
  const [client, setClient] = useState(null);

  //redux
  const dispatch = useDispatch();

  const login = async (phoneNumber, password) => {
    setIsLoading(true);
    setError(null);

    if (!phoneNumber.length || !password.length) {
      setBootstrap("alert alert-warning");
      setError("Veuillez remplir les champs obligatoires.");
      setIsLoading(false);
      return;
    }

    const phoneNumberRegex = /^(03[2,3,4,8])(\d{7})$|^(3[2,3,4,8])(\d{7})$/;
    if (phoneNumberRegex.test(phoneNumber)) {
      if (phoneNumber.length === 10 || phoneNumber.length === 9) {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_PROXY}/api/clients/login`,
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

  const loginWith = async () => {
    try {
      const url = `${process.env.REACT_APP_PROXY}/connexion/login/success`;
      axios
        .get(url, { withCredentials: true })
        .then((response) => {
          if (response.data.client) {
            localStorage.setItem("user", JSON.stringify(response.data));
            dispatch(setUser(response.data.client));
            dispatch(setGoogleLogin({ googleLogin: true }));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const loginWithFacebookID = async (facebookID) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_PROXY}/api/clients/connect/${facebookID}`,
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

  return { loginWith, loginWithFacebookID, login, isLoading, error, bootstrapClassname, client };
};
