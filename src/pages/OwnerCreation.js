
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useOwner } from "../hooks/useOwner";
import { useLoader } from "../hooks/useLoader";
import AutocompleteInput from "../components/AutocompleteInput";
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";

const OwnerCreation = () => {
  const { loadLocationsName } = useLoader();
  let {
    createOwner,
    isLoading,
    msgError,
    bootstrapClassname,
    resetOwnerInput,
    setResetOwnerInput
  } = useOwner();
 
  const [fullname, setFullName] = useState("");
  const [locationsName, setLocationsName] = useState(null);
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [resetAutocomplete, setResetAutocomplete] = useState(false);
  const [isValidReset, setIsValidReset] = useState(false);
  const [docErrorClass, setDocErrorClass] = useState("");
  const [documentIdError, setDocumentIdError] = useState("");
  // const owner = useSelector((state) => state.owner);
  const resetAllInputs = () => {
    setFullName("");
    setPhone1("");
    setPhone2("");
    setResetAutocomplete(false);
    setResetAutocomplete(true);
  };
  //get the autocomplete id value
  const getDocId = (inputClassName, data) => {
    const inputValue = document.getElementById(inputClassName).value;
    if(inputValue){
      const documentId = data.filter((document) => document.name === inputValue);
    if(documentId.length){
        return documentId[0].id;
    } else {
      setDocErrorClass("alert alert-danger");
      setDocumentIdError("veuillez selectionner un choix suggéré ");
      setResetAutocomplete(true);
      return
    }
    }else{
      return;
    }
   
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      // fetch the location's id 
    const locationId = getDocId("address-input", locationsName);
    if(locationId === undefined){
      setResetAutocomplete(true);
    }
      createOwner(fullname, locationId, phone1, phone2);
      setIsValidReset(true);
  };
  useEffect(() => {
    const pageLoader = async () => {
      setLocationsName(await loadLocationsName());
    };
    if (resetOwnerInput && isValidReset) {
      resetAllInputs();
     setIsValidReset(false);
     setResetOwnerInput(false);
    }
    if (!locationsName) {
      pageLoader();
    }
  }, [resetOwnerInput, loadLocationsName, locationsName, isValidReset, setResetOwnerInput]);
  return (
    <div className="bg-white widget border mt-5 rounded">
      <h3 className="h4 text-black widget-title mb-3">
        Inserer un nouveau propriètaire
      </h3>
      <form action="" className="form-contact-agent" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Votre nom complet</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faUser} />
              </span>
            </div>
            <input
              type="text"
              id="name"
              className="form-control"
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
              // required="ON"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">
            L'adresse (Lot){" "}
            <Link to="/create-location">
              <nb style={{ color: "blue" }}>
                {" "}
                &nbsp;<small>Ajouter un nouveau</small>
              </nb>
            </Link>
          </label>
          <AutocompleteInput
            className="form-control auto-input"
            placeholder="Une adresse exacte"
            reset = {resetAutocomplete}
            inputId="address-input"
            suggestions={locationsName}
            style={{ width: "100%" }} // add style prop
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Premier numéro téléphone</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">+261</span>
            </div>
            <input
              type="text"
              id="phone"
              className="form-control"
              value={phone1}
              onChange={(e) => setPhone1(e.target.value)}
              // required="ON"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="phone">seconde numéro téléphone</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">+261</span>
            </div>
            <input
              type="text"
              id="phone"
              className="form-control"
              value={phone2}
              onChange={(e) => setPhone2(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <button
            type="submit"
            id="phone"
            className="btn btn-primary"
            defaultValue="Insérer"
            disabled={isLoading}
          >
            Ajouter
          </button>
        </div>
      </form>
      {(msgError || documentIdError) && (
          <div className={bootstrapClassname || docErrorClass}>
            {msgError || documentIdError}
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

export default OwnerCreation;
