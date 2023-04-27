import { useState } from "react";

export const useProperty = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bootstrapClassname, setBootstrap] = useState(null);
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
    owner
  ) => {
    setIsLoading(true);
    setError(null);

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
      owner
    );

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
          }),
        }
      );

      const json = await response.json();

      if (response.ok) {
        setBootstrap("alert alert-success");
        setError(
          "Félicitations! Votre immobilier a été ajouter avc succès!"
        );
        setIsLoading(false);
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
  return { addProperty, isLoading, error, bootstrapClassname };
};
