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
        `${process.env.REACT_APP_PROXY}/api/census-taker/facebook`,
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
        dispatch(setUser(json.censusTaker));
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

  const signup = async (userName, inputedEmail, inputedPhone, inputedPassword, inputedConfirmPassword) => {
    setIsLoading(true);
    setError(null);
    if (
      !userName.length ||
      !inputedPhone.length ||
      !inputedPassword.length ||
      !inputedConfirmPassword.length
    ) {
      setBootstrap("alert alert-warning");
      setError("Veuillez remplir les champs obligatoires.");
      setIsLoading(false);
      return;
    }
    const username = userName.trim().replace(/\s{2,}/g, ' ').replace(/(^|\s)\S/g, function(match) {
      return match.toUpperCase(); // capitalize first letter of each word
    });
    const phone = inputedPhone.trim().replace(/\s/g, "");
    const password = inputedPassword.trim().replace(/\s/g, "");
    const confirmPassword = inputedConfirmPassword.trim().replace(/\s/g, "");
    const email = inputedEmail.trim().replace(/\s/g, "");
    const phoneNumberRegex = /^(03[2,3,4,8])(\d{7})$|^(3[2,3,4,8])(\d{7})$/;
    const phoneNumber = phone;

    if (username.length <= 40) {
      if (phoneNumberRegex.test(phoneNumber)) {
        if (phoneNumber.length === 10 || phoneNumber.length === 9) {
          if (password === confirmPassword) {
            try {
              const response = await fetch(
                `${process.env.REACT_APP_PROXY}/api/census-taker`,
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
                dispatch(setUser(json.censusTaker));
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
