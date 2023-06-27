// import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import BookingDetails from "../components/BookingDetails";
import { useLoader } from "../hooks/useLoader";
import { useProperty } from "../hooks/useProperty";
import AutocompleteInput from "../components/AutocompleteInput";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocation } from "@fortawesome/free-solid-svg-icons";
import { FaGripHorizontal, FaMoneyBill } from "react-icons/fa";
import { GiPayMoney } from "react-icons/gi";
import { MdTitle } from "react-icons/md";
import { useSelector } from "react-redux";
import { updateActiveLink } from "../redux/redux";
import { useDispatch } from "react-redux";
const AddingLandPage = () => {
  const dispatch = useDispatch();
  const [disabledPriceInput, setDisabledPriceInput] = useState(false);
  const { loadOwnersName, loadQuartersName, loadLocationsName } = useLoader();
  const {
    addLand,
    resetPropertyInput,
    msgError,
    bootstrapClassname,
    isLoading,
    setResetPropertyInput,
    setBootstrap,
    setMsgError
  } = useProperty();
  const censusTaker = useSelector((state) => state.user._id);
  const [ownersName, setOwnersName] = useState(null);
  const [quartersName, setQuartersName] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [area, setArea] = useState("");
  const [price, setPrice] = useState("0");
  const [rent, setRent] = useState("0");
  const [docErrorClass, setDocErrorClass] = useState("");
  const [documentIdError, setDocumentIdError] = useState("");
  const [location, setLocation] = useState("");
  const links = useSelector((state) => state.pagination);
  const resetAllInputs = () => {
    setTitle("");
    setDescription("");
    setArea("");
    setArea("");
    setPrice("0");
    setRent("0");
    setLocation("");
  };
  //get the autocomplete id value
  const getDocId = (inputClassName, data) => {
    const inputValue = document.getElementById(inputClassName).value;
    if (inputValue) {
      const documentId = data.filter(
        (document) => document.name === inputValue
      );
      if(documentId && documentId.length){
        setMsgError(null);
        setBootstrap(null);
        setDocErrorClass(null);
        setDocumentIdError(null);
          return documentId[0].id;
      } else {
        setMsgError(null);
        setBootstrap(null);
        setDocErrorClass("alert alert-danger");
        setDocumentIdError("veuillez selectionner un propriètaire ou quartier suggéré ");
        return
      }
    } 
  };
  //handle the property form submiting
  const handleSubmit = async (e) => {
    e.preventDefault();
    // fetch the owner's id
    const owner = getDocId("owner-input", ownersName);
    // fetch the quarter's id
    const city = getDocId("quarter-input", quartersName);
    var type = "sale";
    //get the property type
    if (disabledPriceInput) {
      type = "rent";
    }
    // fetch the address
    if (owner && city) {
      const squarePerMeter = price;
      addLand(
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
    } 
  };

  useEffect(() => {
    const pageLoader = async () => {
      setOwnersName(await loadOwnersName());
      setQuartersName(await loadQuartersName());
    };
    if (resetPropertyInput) {
      resetAllInputs();
      setResetPropertyInput(false)
    }
    if (!ownersName) {
      pageLoader();
    }
    if (links[2].activeLink !== "/adding") {
      dispatch(updateActiveLink("/adding"));
    }
  }, [
    loadOwnersName,
    links,
    dispatch,
    loadQuartersName,
    ownersName,
    loadLocationsName,
    resetPropertyInput,
    setResetPropertyInput
  ]);
  return (
    <>
      <div className="d-flex justify-content-between mt-5" style={{ backgroundColor: "#f1f1f1" }}>
          <div className="p-2">
            <Link to="/AddingPage">
              <button
                id="btnHome"
                className="btn btn-outline-success"
                type="button"
              >
                ajouter un immobilier
              </button>
            </Link>
          </div>
          <div className="p-2">
            <Link to="/AddingLandPage">
              <button
                id="btnLand"
                className="btn btn-outline-success active"
                type="button"
              >
                ajouter un terrain
              </button>
            </Link>
          </div>
          </div>
      <div
        className="widget border rounded"
        style={{ backgroundColor: "#f1f1f1" }}
      >
        <h3 className="h4 text-black widget-title mt-2 mb-3">
          Ajouter votre terrain
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
              reset={resetPropertyInput}
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
                reset={resetPropertyInput}
                className="form-control auto-input"
                placeholder="Nom du quartier"
                inputId="quarter-input"
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
                  onChange={(e) => setPrice(e.target.value)}
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
                  onChange={(e) => setRent(e.target.value)}
                  required="ON"
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              Ajouter la propriété
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

export default AddingLandPage;
