// import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import BookingDetails from "../components/BookingDetails";
import { useLoader } from "../hooks/useLoader";
import { useProperty } from "../hooks/useProperty";
import AutocompleteInput from "../components/AutocompleteInput";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocation } from "@fortawesome/free-solid-svg-icons";
import { FaGripHorizontal, FaMoneyBill } from "react-icons/fa";
import { GiPayMoney } from "react-icons/gi";
import { MdTitle } from "react-icons/md";
import { useSelector } from "react-redux";
import { updateActiveLink } from "../redux/redux";
import { useDispatch } from "react-redux";
const PropertyEditingPage = () => {
  const dispatch = useDispatch();
  const { landId } = useParams();

  const lands = useSelector((state) => state.lands);
  const property = lands.find((land) => land._id === landId);
  console.log(property);
  const [disabledPriceInput, setDisabledPriceInput] = useState(
    property.type === "rent" ? true : false
  );
  const { loadOwnersName, loadQuartersName, loadLocationsName } = useLoader();
  const {
    updateLand,
    resetPropertyInput,
    msgError,
    bootstrapClassname,
    isLoading,
  } = useProperty();
  const censusTaker = useSelector((state) => state.user._id);
  
  const [ownersName, setOwnersName] = useState(null);
  const [ownerName, setOwnerName] = useState(
    property.owner ? property.owner.fullName : ""
  );
  const [quartersName, setQuartersName] = useState(null);
  const [quarterName, setQuarterName] = useState(
    property.city
    ? `${property.city.quarter} ${property.city.district} ${property.city.reference} Arr`
    : ""
  );
  const [title, setTitle] = useState(property ? property.title : "");
  const [description, setDescription] = useState(
    property ? property.description : ""
  );
  const [location, setLocation] = useState(property.location);
  const [area, setArea] = useState(property ? property.area : "");
  const [price, setPrice] = useState(property ? property.squarePerMeter: "");
  const [rent, setRent] = useState(property.rent ? property.rent : "");
  const [isValidReset, setIsValidReset] = useState(false);
  const [docErrorClass, setDocErrorClass] = useState("");
  const [documentIdError, setDocumentIdError] = useState("");
  const [resetAutocomplete, setResetAutocomplete] = useState(false);
  const [checked, setChecked] = useState(false);
  const links = useSelector((state) => state.pagination);
  const resetAllInputs = () => {
    setTitle("");
    setResetAutocomplete(true);
    setDescription("");
    setArea("");
    setPrice("0");
    setRent("0");
    setLocation("")
  };
  //get the autocomplete id value
  const getDocId = (inputClassName, data) => {
    const inputValue = document.getElementById(inputClassName).value;
    if (inputValue) {
      console.log(inputValue);
      const documentId = data.filter(
        (document) => document.name === inputValue
      );
      if (documentId.length) {
        return documentId[0].id;
      } else {
        setDocErrorClass("alert alert-danger");
        setDocumentIdError("veuillez selectionner un propriété, addresse, ou quartier suggéré ");
        return
      }
    } else {
      return;
    }
  };

  //handle the property form submiting
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const {propertyId} = useParams();
    // fetch the owner's id
    const owner = getDocId("owner-input", ownersName);
    // fetch the quarter's id
    const city = getDocId("quarter-input", quartersName);
    // fetch the address
    var type = "sale";
    //get the property type
    if (disabledPriceInput) {
      type = "rent";
    }
    if (owner && city) {
      const squarePerMeter = price;
      console.log("zrzer", censusTaker);
      updateLand(
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
      );
      setIsValidReset(true);
    } else {
      setDocErrorClass("alert alert-danger");
      setDocumentIdError("veuillez selectionner un propriété, addresse, ou quartier suggéré ");
      return
    }
  };
  useEffect(() => {
    const pageLoader = async () => {
      setOwnersName(await loadOwnersName());
      setQuartersName(await loadQuartersName());
    };
    if (resetPropertyInput && isValidReset) {
      resetAllInputs();
      setIsValidReset(false);
    }
    if (!ownersName && !quartersName) {
    pageLoader();
    }
    if (links[2].activeLink !== "/") {
      dispatch(updateActiveLink("/"));
    }
  }, [
    property,
    loadOwnersName,
    links,
    dispatch,
    loadQuartersName,
    ownersName,
    quartersName,
    isValidReset,
    loadLocationsName,
    resetPropertyInput,
  ]);
  const handleOwnerName = (Name) => {
    setOwnerName(Name);
  };
  const handleQuarterName = (Name) => {
    setQuarterName(Name);
  };

  return (
    <>
      <div
        className="widget border rounded"
        style={{ backgroundColor: "#f1f1f1" }}
      >
        <h3 className="h4 text-black widget-title mt-5 mb-3">
          Modifier votre terrain
        </h3>
        <form action="" className="form-contact-agent" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">
              Propriétaire{" "}
              <Link to="/create-owner">
                <nb style={{ color: "blue" }}>
                  {" "}
                  &nbsp; &nbsp; &nbsp; &nbsp; <small>Inscrire un nouveau</small>
                </nb>
              </Link>
            </label>
            <AutocompleteInput
            reset ={resetAutocomplete}
              className="form-control auto-input"
              placeholder="Nom complet"
              inputId="owner-input"
              initialValue={property.owner ? property.owner.fullName : ""}
              onNameChange={handleOwnerName}
              suggestions={ownersName}
              style={{ width: "100%" }} // add style prop
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Un titre</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <MdTitle />
                </span>
              </div>
              <input
                type="text"
                id="title"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required="ON"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="message">Description de l'immobilier</label>
            <textarea
              style={{ minHeight: "100px" }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="description"
              className="form-control"
              required="ON"
            ></textarea>
          </div>
          <div className="form-group hidden">
            <label htmlFor="phone">location</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faLocation} />
                </span>
              </div>
              <input
                type="text"
                id="location"
                className="form-control"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Quartier</label>
            <div className="input-group">
              <AutocompleteInput
                reset={resetAutocomplete}
                className="form-control auto-input"
                placeholder="Nom du quartier"
                inputId="quarter-input"
                initialValue={property
                  ? `${property.city.quarter} ${property.city.district} ${property.city.reference} Arr`
                  : ""}
                onNameChange={handleQuarterName}
                suggestions={quartersName}
                style={{ width: "100%" }} // add style prop
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="area">
              Surface habitable
              <nb style={{ color: "blue" }}>
                &nbsp; &nbsp; <small>(en m²)</small>
              </nb>
            </label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <FaGripHorizontal />
                </span>
              </div>
              <input
                type="number"
                id="area"
                className="form-control"
                value={area}
                onChange={(e) => setArea(parseInt(e.target.value.trim().replace(/\s+/g, " ").parseInt()))}
                required="ON"
              />
            </div>
          </div>
          <div className="form-group">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                value="location"
                checked={disabledPriceInput ? "location" : ""}
                id="flexRadioDefault1"
                onClick={(e) => {
                  setDisabledPriceInput(true);
                  setChecked(true)
                }}
              />

              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Location
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                value="vente"
                checked={disabledPriceInput ? "" : "vente"}
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                onClick={(e) => {
                  setDisabledPriceInput(false);
                  setChecked(true)
                }}
                defaultChecked=""
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Vente
              </label>
            </div>
          </div>
          {!disabledPriceInput ? (
            <div className="form-group">
              <label htmlFor="price">
                Prix de vente par m3
                <nb style={{ color: "blue" }}>
                  &nbsp; &nbsp; <small>(en Ariary)</small>
                </nb>
              </label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <FaMoneyBill />
                  </span>
                </div>
                <input
                  type="number"
                  id="price"
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(parseInt(e.target.value.trim().replace(/\s+/g, " ")))}
                  required="ON"
                />
              </div>
            </div>
          ) : (
            <div className="form-group">
              <label htmlFor="rent">
                Prix de location
                <nb style={{ color: "blue" }}>
                  &nbsp; &nbsp; <small>(en Ariary)</small>
                </nb>
              </label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <GiPayMoney />
                  </span>
                </div>
                <input
                  type="number"
                  id="rent"
                  className="form-control"
                  value={rent}
                  onChange={(e) => setRent(parseInt(e.target.value.trim().replace(/\s+/g, " ")))}
                  required="ON"
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={
                (((property.owner ? property.owner.fullName : "") ===  ownerName) &&
               ((property? `${property.city.quarter} ${property.city.district} ${property.city.reference} Arr`
                : "")  === quarterName) &&
                property.location === location &&
                 property.title === title &&
                property.area === area  &&
                 property.description === description &&
                 property.rent  === rent &&
                property.squarePerMeter ===  price && !checked
                  ? true
                  : false) || isLoading 
              }
            >
              sauvegarder
            </button>
          </div>
        </form>

        {(msgError || documentIdError) && (
          <div className={bootstrapClassname || docErrorClass}>
            {msgError || documentIdError}
          </div>
        )}
      </div>
    </>
  );
};

export default PropertyEditingPage;
