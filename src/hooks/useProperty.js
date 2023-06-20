import { useState } from "react";
import { pushProperty , pushLand, updateOneLandById, updateOnePropertyById} from "../redux/redux";
import { useDispatch } from "react-redux";
export const useProperty = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [msgError, setMsgError] = useState(null);
  const [bootstrapClassname, setBootstrap] = useState(null);
  const [resetPropertyInput, setResetPropertyInput] = useState(false);
  const dispatch = useDispatch();

  //add house function
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
      title === undefined ||
      description=== undefined ||
      address === undefined ||
      city=== undefined ||
      price === undefined||
      rent=== undefined ||
      bedrooms === undefined  ||
      bathrooms === undefined ||
      area === undefined ||
      type === undefined
    ) {
      setBootstrap("alert alert-danger");
      setMsgError("Veuilléz remplir toutes les champs correctemment");
      setIsLoading(false);
    } else {
      title.trim().replace(/\s+/g, " ");
      description.trim().replace(/\s+/g, " ");
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
          console.log(json);
          dispatch(pushProperty(json));
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

  // update house function
  const updateProperty = async (
    propertyId,
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
      title === undefined ||
      description=== undefined ||
      address === undefined ||
      city=== undefined ||
      price === undefined||
      rent=== undefined ||
      bedrooms === undefined  ||
      bathrooms === undefined ||
      area === undefined ||
      type === undefined
    ) {
      setBootstrap("alert alert-danger");
      setMsgError("Veuilléz remplir toutes les champs correctemment");
      setIsLoading(false);
    } else {
      console.log("the type is ", type);
      title.trim().replace(/\s+/g, " ");
      description.trim().replace(/\s+/g, " ");
      try {
        console.log("the propertyId is ", propertyId);
        const response = await fetch(
          `${process.env.REACT_APP_PROXY}/api/properties/`+propertyId,
          {
            method: "PUT",
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
          setMsgError("l'immobilier a été modifié avec succès!");
          setIsLoading(false);
          setResetPropertyInput(true);
          console.log("the updated propertyis ", json);
          dispatch(updateOnePropertyById(json));
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


//add land function
const addLand = async (
  title,
  description,
  location,
  city,
  price,
  rent,
  squarePerMeter,
  area,
  type,
  owner,
  censusTaker
) => {
  setIsLoading(true);
  console.log(
    title,
    description,
    location,
    city,
    price,
    rent,
    squarePerMeter,
    area,
    type,
    owner,
    censusTaker
  );
  if (
    title === undefined ||
    description=== undefined ||
    location === undefined ||
    city=== undefined ||
    price === undefined||
    rent=== undefined ||
    squarePerMeter === undefined  ||
    area === undefined ||
    type === undefined
  ) {
    setBootstrap("alert alert-danger");
    setMsgError("Veuilléz remplir toutes les champs correctemment");
    setIsLoading(false);
  } else {
    title.trim().replace(/\s+/g, " ");
    description.trim().replace(/\s+/g, " ");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_PROXY}/api/lands`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            title,
            description,
            location,
            city,
            price,
            rent,
            squarePerMeter,
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
        setMsgError("le terrain a été ajouter avec succès!");
        setIsLoading(false);
        setResetPropertyInput(true);
        console.log(json);
        dispatch(pushLand(json));
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

//update land function
const updateLand = async (
  landId,
  title,
  description,
  location,
  city,
  rent,
  squarePerMeter,
  area,
  type,
  owner,
  censusTaker
) => {
  setIsLoading(true);
  console.log(
    title,
    description,
    location,
    city,
    rent,
    squarePerMeter,
    area,
    type,
    owner,
    censusTaker
  );
  if (
    title === undefined ||
    description=== undefined ||
    location === undefined ||
    city=== undefined ||
    squarePerMeter === undefined||
    rent=== undefined ||
    squarePerMeter === undefined ||
    area === undefined ||
    type === undefined
  ) {
    setBootstrap("alert alert-danger");
    setMsgError("Veuilléz remplir toutes les champs correctemment");
    setIsLoading(false);
  } else {
    console.log("the type is ", type);
    title.trim().replace(/\s+/g, " ");
    description.trim().replace(/\s+/g, " ");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_PROXY}/api/lands/`+landId,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            title,
            description,
            location,
            city,
            rent,
            squarePerMeter,
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
        setMsgError("le terrain a été modifié avec succès!");
        setIsLoading(false);
        setResetPropertyInput(true);
        console.log("the updated property is ", json);
        dispatch(updateOneLandById(json));
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
    addLand,
    addProperty,
    updateProperty,
    updateLand,
    resetPropertyInput,
    isLoading,
    msgError,
    bootstrapClassname,
  };
};
