import { useState } from "react";
import { useDispatch } from "react-redux";
import { addOwner , updateOneOwnerById} from "../redux/redux";

export const useOwner = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [msgError, setMsgError] = useState(null);
  const [bootstrapClassname, setBootstrap] = useState(null);
  const [resetOwnerInput, setResetOwnerInput] = useState(false); // new state

  const dispatch = useDispatch();
  //redux

  const createOwner = async (fullname, phoneOne, phoneTwo) => {
    setIsLoading(true);
    setMsgError(null);
    const phone1 = phoneOne.replace(/\s/g, "");
    const phone2 = phoneTwo.replace(/\s/g, "");
    if (!fullname.length || !phone1.length) {
      setBootstrap("alert alert-warning");
      setMsgError(
        "Le nom et le prémier numéro de téléphone sont obligatoires."
      );
      setIsLoading(false);
      return;
    }

    const phoneNumberRegex = /^(03[2,3,4,8])(\d{7})$|^(3[2,3,4,8])(\d{7})$/;
    const phoneNumber1 = phone1;
    const phoneNumber2 = phone2;
    if (
      phoneNumberRegex.test(phoneNumber1) ||
      phoneNumberRegex.test(phoneNumber2)
    ) {
      if (
        phoneNumber1.length === 10 ||
        phoneNumber1.length === 9 ||
        phoneNumber2.length === 10 ||
        phoneNumber2.length === 9
      ) {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_PROXY}/api/owners`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
              body: JSON.stringify({
                fullname,
                phone1,
                phone2,
              }),
            }
          );

          const result = await response.json();
          console.log(result);
          if (result.success === true) {
            let msg = result.msg;
            let bootstrapClass = "alert alert-success";
            setBootstrap(bootstrapClass);
            setMsgError(msg);
            setIsLoading(false);
            setResetOwnerInput(true);
            dispatch(addOwner(result.newOwner));
            return;
          } else if (result.errors) {
            console.log("the error is ", result.errors);
            let msg =
              result.errors.fullname ||
              result.errors.phone1 ||
              result.errors.phone2;
            let bootstrapClass = "alert alert-danger";
            setBootstrap(bootstrapClass);
            setMsgError(msg);
            setIsLoading(false);
          } else {
            let msg = result.error;
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

  
  const updateOwner = async (ownerId, fullname, phoneNumberOne, phoneNumberTwo) => {
    setIsLoading(true);
    setMsgError(null);
    const phone1 = phoneNumberOne.replace(/\s/g, "");
    const phone2 = phoneNumberTwo.replace(/\s/g, "");
    if (!fullname.length || !phone1.length) {
      setBootstrap("alert alert-warning");
      setMsgError(
        "Le nom et le prémier numéro de téléphone sont obligatoires."
      );
      setIsLoading(false);
      return;
    }

    const phoneNumberRegex = /^(03[2,3,4,8])(\d{7})$|^(3[2,3,4,8])(\d{7})$/;
    const phoneNumber1 = phone1;
    const phoneNumber2 = phone2;
    if (
      phoneNumberRegex.test(phoneNumber1) ||
      phoneNumberRegex.test(phoneNumber2)
    ) {
      if (
        phoneNumber1.length === 10 ||
        phoneNumber1.length === 9 ||
        phoneNumber2.length === 10 ||
        phoneNumber2.length === 9
      ) {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_PROXY}/api/owners/update-owner/${ownerId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
              body: JSON.stringify({
                fullname,
                phone1,
                phone2,
              }),
            }
          );

          const result = await response.json();
          console.log(result);
          if (result.success === true) {
            let msg = result.msg;
            let bootstrapClass = "alert alert-success";
            setBootstrap(bootstrapClass);
            setMsgError(msg);
            setIsLoading(false);
            setResetOwnerInput(true);
            dispatch(updateOneOwnerById(result.modifiedOwner));
            return;
          } else if (result.errors) {
            console.log("the error is ", result.errors);
            let msg =
              result.errors.fullname ||
              result.errors.phone1 ||
              result.errors.phone2;
            let bootstrapClass = "alert alert-danger";
            setBootstrap(bootstrapClass);
            setMsgError(msg);
            setIsLoading(false);
          } else {
            let msg = result.error;
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
    createOwner,
    updateOwner,
    isLoading,
    msgError,
    bootstrapClassname,
    resetOwnerInput,
  };
};
