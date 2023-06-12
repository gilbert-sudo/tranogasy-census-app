// import { useSelector } from "react-redux";
// import BookingDetails from "../components/BookingDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useOwner } from "../hooks/useOwner";
import { useLoader } from "../hooks/useLoader";
import AutocompleteInput from "../components/AutocompleteInput";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";

const OwnerEditingPage = () => {
  const { loadLocationsName } = useLoader();
  const {
    updateOwner,
    isLoading,
    msgError,
    bootstrapClassname,
    resetOwnerInput,
    setResetOwnerInput,
  } = useOwner();
  const { ownerId, fullName, address, phoneOne, phoneTwo } = useParams();
  const [fullname, setFullName] = useState(fullName);
  const [newAdress, setNewAdress] = useState(address);
  const [locationsName, setLocationsName] = useState(null);
  const [phone1, setPhone1] = useState(phoneOne);
  const [phone2, setPhone2] = useState(phoneTwo);
  const [isValidReset, setIsValidReset] = useState(false);
  const [resetAutocomplete, setResetAutocomplete] = useState(false);
  const [docErrorClass, setDocErrorClass] = useState("");
  const [documentIdError, setDocumentIdError] = useState("");
  // const owner = useSelector((state) => state.owner);

  const resetAllInputs = () => {
    setFullName("");
    setPhone1("");
    setPhone2("");
    setResetAutocomplete(true);
  };

  //get the autocomplete id value
  const getDocId = (inputClassName, data) => {
    const inputValue = document.getElementById(inputClassName).value;
    if (inputValue !== undefined && inputValue.length) {
      const documentId = data.filter(
        (document) => document.name === inputValue
      );
      if (documentId.length) {
        return documentId[0].id;
      } else {
        setDocErrorClass("alert alert-danger");
        setDocumentIdError("veuillez selectionner un choix suggéré ");
        return;
      }
    } else {
      return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // fetch the location's id
    const locationId = getDocId("address-input", locationsName);
    if (locationId) {
      updateOwner(ownerId, fullname, locationId, phone1, phone2);
    } else {
      setDocErrorClass("alert alert-danger");
      setDocumentIdError("veuillez selectionner une addresse suggéré ");
      return;
    }
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
  }, [
    resetOwnerInput,
    loadLocationsName,
    setResetOwnerInput,
    isValidReset,
    locationsName,
  ]);

  const handleAddressChange = (value) => {
    setNewAdress(value);
    console.log(newAdress)
  };
  return (
    <div className="bg-white widget border mt-5 rounded">
      <h3 className="h4 text-black widget-title mb-3">
        Modifier ce propriètaire
      </h3>
      <form action="" className="form-contact-agent" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Le nom complet</label>
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
              onChange={(e) => {
                const fullname = e.target.value
                  .trim()
                  .replace(/\s{2,}/g, " ")
                  .replace(/(^|\s)\S/g, function (match) {
                    return match.toUpperCase(); // capitalize first letter of each word
                  });
                setFullName(fullname);
              }}
              // required="ON"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="address">
            L'adresse (Lot){" "}
            <Link to="/create-location">
              <nb style={{ color: "blue" }}>
                {" "}
                &nbsp;<small>Ajouter un nouveau</small>
              </nb>
            </Link>
          </label>
          <AutocompleteInput
            reset={resetAutocomplete}
            className="form-control auto-input"
            placeholder="Une adresse exacte"
            inputId="address-input"
            initialValue={address}
            suggestions={locationsName}
            onNameChange={handleAddressChange} // pass the callback function
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
              onChange={(e) => {
                let phone1 = e.target.value.replace(/\s/g, "");
                setPhone1(phone1);
              }}
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
              onChange={(e) => {
                let phone2 = e.target.value.replace(/\s/g, "");
                setPhone2(phone2);
              }}
            />
          </div>
        </div>

        <div className="form-group">
          <button
            type="submit"
            id="phone"
            className="btn btn-primary"
            defaultValue="Insérer"
            disabled={
              (fullName === fullname &&
              phoneOne === phone1  &&
              address === newAdress && phoneTwo === phone2
                ? true
                : false) || (fullName === fullname &&
                phoneOne === phone1  &&
                address === newAdress && phone2 === "" 
                  ? true: false) || isLoading
            }
          >
            Sauvegarder
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

export default OwnerEditingPage;
