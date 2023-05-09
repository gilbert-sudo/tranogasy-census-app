// import { useSelector } from "react-redux";
// import BookingDetails from "../components/BookingDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { useLocation } from "../hooks/useLocation";
import {
    faLocationDot,
   faLink
  } from "@fortawesome/free-solid-svg-icons";
// import { useSelector } from "react-redux";

const LocationCreationPage = () => {
  const [address, setAddress] = useState("");
  const [locationLink, setLocationLink] = useState("");
  const [isValidReset, setIsValidReset] = useState(false);
  // const Location = useSelector((state) => state.Location);

  const resetAllInputs = () => {
    setAddress("");
    setLocationLink("");
  };

  const {
    createLocation,
    isLoading,
    msgError,
    bootstrapClassname,
    resetLocationInput,
  } = useLocation();
  const handleSubmit = async (e) => {
    e.preventDefault();
  createLocation(address, locationLink);
    setIsValidReset(true);
  };
  useEffect(() => {
    if (resetLocationInput && isValidReset) {
      resetAllInputs();
      setIsValidReset(false)
    }
  }, [resetLocationInput, isValidReset]);
  return (
    <div className="bg-white widget border mt-5 rounded">
      <h3 className="h4 text-black widget-title mb-3">
        Inserer un nouveau location
      </h3>
      <form action="" className="form-contact-agent" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">l'addresse complet</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faLocationDot} />
              </span>
            </div>
            <input
              type="text"
              id="address"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              // required="ON"
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="name">le lien pour l'addresse</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faLink} />
              </span>
            </div>
            <input
              type="text"
              id="link"
              className="form-control"
              value={locationLink}
              onChange={(e) => setLocationLink(e.target.value)}
              // required="ON"
            />
          </div>
        </div>

        <div className="form-group">
          <button
            type="submit"
            id="add"
            className="btn btn-primary"
            defaultValue="Insérer"
            disabled={isLoading}
         >Ajouter</button>
        </div>
      </form>
      {msgError && (
        <div className={bootstrapClassname}>
          {msgError}
        </div>
      )}
      {/* {!client && (
        <div className="alert alert-danger">
          Veuillez d'abord vous connecter pour envoyer une demande{" "}
          <Link to="/login">
            <u style={{ color: "blue" }}>Se connecter</u>
          </Link>
        </div>
      )} */}
    </div>
  );
};

export default LocationCreationPage;
