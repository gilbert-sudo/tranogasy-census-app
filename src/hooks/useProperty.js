import { useState } from "react";

export const useProperty = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [msgError, setMsgError] = useState(null);
  const [bootstrapClassname, setBootstrap] = useState(null);
  const [resetPropertyInput, setResetPropertyInput] = useState(false);
  //redux

  const addProperty = async (
    title,
    description,
    address,
    city,
    price,
    rent,
    bedrooms,
    bathrooms,
    area,
    type,
    owner,
    censusTaker
  ) => {
    setIsLoading(true);
    console.log(
      title,
      description,
      address,
      city,
      price,
      rent,
      bedrooms,
      bathrooms,
      area,
      type,
      owner,
      censusTaker
    );
    if (
      title ||
      description ||
      address ||
      city ||
      price ||
      rent ||
      bedrooms ||
      bathrooms ||
      area ||
      area ||
      type === undefined
    ) {
      setBootstrap("alert alert-danger");
      setMsgError("Veuilléz remplir toutes les champs correctemment");
      setIsLoading(false);
    } else {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_PROXY}/api/properties`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
              title,
              description,
              address,
              city,
              price,
              rent,
              bedrooms,
              bathrooms,
              area,
              type,
              owner,
              censusTaker,
            }),
          }
        );

        const json = await response.json();

        if (response.ok) {
          setBootstrap("alert alert-success");
          setMsgError("l'immobilier a été ajouter avc succès!");
          setIsLoading(false);
          setResetPropertyInput(true);
        }
        if (!response.ok) {
          setBootstrap("alert alert-danger");
          setMsgError(json.message);
          setIsLoading(false);
        }
      } catch (error) {
        setBootstrap("alert alert-danger");
        setMsgError("Une erreur s'est produite lors de l'envoi du message.");
        setIsLoading(false);
      }
    }
  };
  return {
    addProperty,
    resetPropertyInput,
    isLoading,
    msgError,
    bootstrapClassname,
  };
};
