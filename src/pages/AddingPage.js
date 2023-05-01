// import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import BookingDetails from "../components/BookingDetails";
import { useLoader } from "../hooks/useLoader";
import { useProperty } from "../hooks/useProperty";
import AutocompleteInput from "../components/AutocompleteInput";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPersonShelter,
  faShower,
} from "@fortawesome/free-solid-svg-icons";
import { FaGripHorizontal, FaMoneyBill } from "react-icons/fa";
import { GiPayMoney } from "react-icons/gi";
import { MdTitle } from "react-icons/md";

const AddingPage = () => {
  const [disabledPriceInput, setDisabledPriceInput] = useState(false);

  const { loadOwnersName, loadQuartersName, loadLocationsName } = useLoader();
  const { addProperty } = useProperty();
  const [ownersName, setOwnersName] = useState(null);
  const [quartersName, setQuartersName] = useState(null);
  const [locationsName, setLocationsName] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [area, setArea] = useState("");
  const [price, setPrice] = useState("0");
  const [rent, setRent] = useState("0");

   //get the autocomplete id value
   const getDocId = (inputClassName, data) => {
    const inputValue = document.getElementById(inputClassName).value;
    const documentId = data.filter((document) => document.name === inputValue)
    return documentId[0].id;
  };

  //handle the property form submiting
  const handleSubmit = async (e) => {
    e.preventDefault();
    // fetch the owner's id 
    const owner = getDocId("owner-input", ownersName)
    // fetch the quarter's id 
    const city = getDocId("quarter-input", quartersName)
    // fetch the address
    const address = document.getElementById("address-input").value;

    var type = "sale";
    //get the property type
    if (disabledPriceInput) {
      type = "rent";
    } 

    addProperty( title, description, address, city, price, rent, bedrooms, bathrooms, area, type, owner);
  };

 

  useEffect(() => {
    const pageLoader = async () => {
      setOwnersName(await loadOwnersName());
      setQuartersName(await loadQuartersName());
      setLocationsName(await loadLocationsName());
    };
    
    if (!ownersName) {
      pageLoader();
    }

  }, [loadOwnersName]);
  return (
    <>
      <div
        className="widget border rounded"
        style={{ backgroundColor: "#f1f1f1" }}
      >
        <h3 className="h4 text-black widget-title mt-5 mb-3">
          Ajouter votre immobilier
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
              className="form-control auto-input"
              placeholder="Nom complet"
              inputId="owner-input"
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
          <div className="form-group">
            <label htmlFor="email">L'adresse (Lot){" "}
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
              inputId="address-input"
              suggestions={locationsName}
              style={{ width: "100%" }} // add style prop
            />
          </div>
          <div className="form-group">
            <label>Quartier</label>
            <div className="input-group">
              <AutocompleteInput
              className="form-control auto-input"
              placeholder="Nom du quartier"
              inputId="quarter-input"
              suggestions={quartersName}
              style={{ width: "100%" }} // add style prop
            />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="phone">Nombre de chambre</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faPersonShelter} />
                </span>
              </div>
              <input
                type="number"
                id="bedrooms"
                className="form-control"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                required="ON"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="bathrooms">Salle de bain</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faShower} />
                </span>
              </div>
              <input
                type="number"
                id="bathrooms"
                className="form-control"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
                required="ON"
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
                onChange={(e) => setArea(e.target.value)}
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
                id="flexRadioDefault1"
                onClick={(e) => {
                  setDisabledPriceInput(true);
                }}
              />

              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Location
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                onClick={(e) => {
                  setDisabledPriceInput(false);
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
              <label htmlFor="price">Prix de vente
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
                  onChange={(e) => setPrice(e.target.value)}
                  required="ON"
                />
              </div>
            </div>
          ) : (
            <div className="form-group">
              <label htmlFor="rent">Prix de location
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
                  onChange={(e) => setRent(e.target.value)}
                  required="ON"
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Ajouter la propriété
            </button>
          </div>
        </form>

        {/* {msgError && (
          <div className={bootstrapClassname}>
            {errorMessage && errorMessage ? errorMessage : msgError}
          </div>
        )} */}
      </div>
    </>
  );
};

export default AddingPage;
