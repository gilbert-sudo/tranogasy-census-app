import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/redux";

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bootstrapClassname, setBootstrap] = useState(null);
  const dispatch = useDispatch();
  //redux

  const signupWithFacebook = async (username, email, facebookID, thumbnail) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_PROXY}/api/clients/facebook`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            username,
            email,
            facebookID,
            thumbnail,
          }),
        }
      );

      const json = await response.json();

      if (response.ok) {
        setBootstrap("alert alert-success");
        setError(
          "Félicitations! Vous vous êtes inscrit(e) avec succès. Bienvenue dans notre communauté!"
        );
        setIsLoading(false);
        localStorage.setItem("user", JSON.stringify(json));
        dispatch(setUser(json.client));
      }
      if (!response.ok) {
        setBootstrap("alert alert-danger");
        setError(json.error);
        setIsLoading(false);
      }
    } catch (error) {
      setBootstrap("alert alert-danger");
      setError("Une erreur s'est produite lors de l'envoi du message.");
      setIsLoading(false);
    }
  };

  const signup = async (username, email, phone, password, confirmPassword) => {
    setIsLoading(true);
    setError(null);

    if (
      !username.length ||
      !phone.length ||
      !password.length ||
      !confirmPassword.length
    ) {
      setBootstrap("alert alert-warning");
      setError("Veuillez remplir les champs obligatoires.");
      setIsLoading(false);
      return;
    }

    const phoneNumberRegex = /^(03[2,3,4,8])(\d{7})$|^(3[2,3,4,8])(\d{7})$/;
    const phoneNumber = phone;

    if (username.length <= 40) {
      if (phoneNumberRegex.test(phoneNumber)) {
        if (phoneNumber.length === 10 || phoneNumber.length === 9) {
          if (password === confirmPassword) {
            try {
              const response = await fetch(
                `${process.env.REACT_APP_PROXY}/api/clients`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                  },
                  body: JSON.stringify({
                    username,
                    email,
                    phone,
                    password,
                  }),
                }
              );

              const json = await response.json();

              if (response.ok) {
                setBootstrap("alert alert-success");
                setError(
                  "Félicitations! Vous vous êtes inscrit(e) avec succès. Bienvenue dans notre communauté!"
                );
                setIsLoading(false);
                localStorage.setItem("user", JSON.stringify(json));
                dispatch(setUser(json.client));
                window.location.href="/";
              }
              if (!response.ok) {
                setBootstrap("alert alert-danger");
                setError(json.error);
                setIsLoading(false);
              }
            } catch (error) {
              setBootstrap("alert alert-danger");
              setError("Une erreur s'est produite lors de l'envoi du message.");
              setIsLoading(false);
            }
          } else {
            setBootstrap("alert alert-danger");
            setError(
              "Oups ! Le mot de passe et le champ de confirmation de mot de passe ne correspondent pas."
            );
            setIsLoading(false);
          }
        }
      } else {
        // Phone number has invalid format
        setBootstrap("alert alert-danger");
        setError("votre numéro de téléphone n'est pas valide.");
        setIsLoading(false);
      }
    } else {
      // username has invalid length
      setBootstrap("alert alert-danger");
      setError(
        "Oups ! Le nom d'utilisateur doit comporter 40 caractères ou moins."
      );
      setIsLoading(false);
    }
  };

  return { signup, signupWithFacebook, isLoading, error, bootstrapClassname };
};
