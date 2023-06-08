import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateOneUserById } from "../redux/redux";
export const useProfil = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [msgError, setMsgError] = useState(null);
  const [bootstrapClassname, setBootstrap] = useState(null);
  const [resetProfilInput, setResetProfilInput] = useState(false); // new state
  const dispatch = useDispatch();
  const updateProfilFullName = async (censusTakerId, fullName) => {
    setIsLoading(true);
    setMsgError(null);
    setResetProfilInput(false);
    if (!fullName.length || !fullName.length > 3) {
      setBootstrap("alert alert-warning");
      setMsgError("Veuillez entrer une exacte nom complet");
      setIsLoading(false);
      return;
    }
    const newUsername = fullName
      .trim()
      .replace(/\s{2,}/g, " ")
      .replace(/(^|\s)\S/g, function (match) {
        return match.toUpperCase(); // capitalize first letter of each word
      });
    try {
      const response = await fetch(
        `${process.env.REACT_APP_PROXY}/api/census-taker/${censusTakerId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            newUsername,
          }),
        }
      );

      const result = await response.json();
      if (result.success === true) {
        let msg = result.message;
        let bootstrapClass = "alert alert-success";
        setBootstrap(bootstrapClass);
        setMsgError(msg);
        setIsLoading(false);
        setResetProfilInput(true);
        dispatch(updateOneUserById(result.updatedCensusTaker));
        return;
      } else if (result.success === false) {
        let msg = result.message;
        let bootstrapClass = "alert alert-danger";
        setBootstrap(bootstrapClass);
        setMsgError(msg);
        setIsLoading(false);
      } else {
        let msg = result.message;
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
  };
  const updateProfilContact = async (
    censusTakerId,
    inputedPassword,
    inputedPhone
  ) => {
    setIsLoading(true);
    if (!inputedPassword && !inputedPassword.length) {
      setBootstrap("alert alert-warning");
      setMsgError("Veuillez entrer votre mot de passe.");
      setIsLoading(false);
      return;
    }
    if (!inputedPhone && !inputedPhone.length) {
      setBootstrap("alert alert-warning");
      setMsgError("Veuillez entrer votre nouveau numéro de téléphone");
      setIsLoading(false);
      return;
    }

    const phone = inputedPhone.trim().replace(/\s/g, "");
    const phoneNumberRegex = /^(03[2,3,4,8])(\d{7})$|^(3[2,3,4,8])(\d{7})$/;
    const oldPassword = inputedPassword.trim().replace(/\s/g, "");
    if (phoneNumberRegex.test(phone)) {
      if (phone.length === 10 || phone.length === 9) {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_PROXY}/api/census-taker/${censusTakerId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
              body: JSON.stringify({
                phone,
                oldPassword,
              }),
            }
          );

          const result = await response.json();
          console.log(result);
          if (result.success === true) {
            let msg = result.message;
            let bootstrapClass = "alert alert-success";
            setBootstrap(bootstrapClass);
            setMsgError(msg);
            setIsLoading(false);
            setResetProfilInput(true);
            dispatch(updateOneUserById(result.updatedCensusTaker));
            return;
          } else if (result.success === false) {
            let msg = result.message;
            let bootstrapClass = "alert alert-danger";
            setBootstrap(bootstrapClass);
            setMsgError(msg);
            setIsLoading(false);
          } else {
            let msg = result.message;
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
      }
    } else {
      // Phone number has invalid format
      setBootstrap("alert alert-danger");
      setMsgError("votre numéro de téléphone n'est pas valide.");
      setIsLoading(false);
    }
  };
  const updateProfilEmail = async (censusTakerId, inputedEmail) => {
    setIsLoading(true);
    setMsgError(null);
    setResetProfilInput(false);
    if (!inputedEmail.length || !inputedEmail.length > 3) {
      setBootstrap("alert alert-warning");
      setMsgError("Veuillez entrer une exacte email");
      setIsLoading(false);
      return;
    }
    const email = inputedEmail
      .trim()
      .replace(/\s{2,}/g, " ")
      .replace(/(^|\s)\S/g, function (match) {
        return match.toUpperCase(); // capitalize first letter of each word
      });
    try {
      const response = await fetch(
        `${process.env.REACT_APP_PROXY}/api/census-taker/${censusTakerId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            email
          }),
        }
      );

      const result = await response.json();
      console.log(result);
      if (result.success === true) {
        let msg = result.message;
        let bootstrapClass = "alert alert-success";
        setBootstrap(bootstrapClass);
        setMsgError(msg);
        setIsLoading(false);
        setResetProfilInput(true);
        dispatch(updateOneUserById(result.updatedCensusTaker));
        return;
      } else if (result.success === false) {
        let msg = result.message;
        let bootstrapClass = "alert alert-danger";
        setBootstrap(bootstrapClass);
        setMsgError(msg);
        setIsLoading(false);
      } else {
        let msg = result.message;
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
  };
  const updateProfilPassword = async (
    censusTakerId,
    inputedOldPassword,
    inputedNewPassword,
    confirmPassword
  ) => {
    setIsLoading(true);
    setMsgError(null);
    setResetProfilInput(false);
    if (!inputedOldPassword.length || !inputedNewPassword.length || !confirmPassword.length) {
      setBootstrap("alert alert-warning");
      setMsgError("Veuillez remplir toutes les champs.");
      setIsLoading(false);
      return;
    }
    const oldPassword= inputedOldPassword.trim().replace(/\s/g, "");
    const newPassword = inputedNewPassword.trim().replace(/\s/g, "");
    const confirmPasswordRef = confirmPassword.trim().replace(/\s/g, "");
    if (
      (!newPassword.length > 8 && !newPassword.length < 12) ||
      (!confirmPasswordRef.length > 8 && !confirmPasswordRef.length < 12)
    ) {
      setBootstrap("alert alert-warning");
      setMsgError("Le mot de passe doit être entre 8 et 12 caractères");
      setIsLoading(false);
      return;
    }
    if (newPassword !== confirmPasswordRef) {
      setBootstrap("alert alert-warning");
      setMsgError("votre confirmation n'est pas reussi");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_PROXY}/api/census-taker/${censusTakerId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            oldPassword,
            newPassword,
          }),
        }
      );

      const result = await response.json();
      console.log(result);
      if (result.success === true) {
        let msg = result.message;
        let bootstrapClass = "alert alert-success";
        setBootstrap(bootstrapClass);
        setMsgError(msg);
        setIsLoading(false);
        setResetProfilInput(true);
        dispatch(updateOneUserById(result.updatedCensusTaker));
        return;
      } else if (result.success === false) {
        let msg = result.message;
        let bootstrapClass = "alert alert-danger";
        setBootstrap(bootstrapClass);
        setMsgError(msg);
        setIsLoading(false);
      } else {
        let msg = result.message;
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
  };
  return {
    updateProfilFullName,
    updateProfilContact,
    updateProfilEmail,
    updateProfilPassword,
    isLoading,
    msgError,
    bootstrapClassname,
    resetProfilInput,
    setResetProfilInput,
  };
};
