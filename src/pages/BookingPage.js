// import { useSelector } from "react-redux";
// import BookingDetails from "../components/BookingDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const BookingPage = () => {
  return (
    <>
      <div className="widget border rounded" style={{backgroundColor: "#f1f1f1"}}>
        <h3 className="h4 text-black widget-title mt-5 mb-3">
          Ajouter votre immobilier
        </h3>
        <form action="" className="form-contact-agent">
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
                // value={name}
                // onChange={(e) => setName(e.target.value)}
                // disabled={isBooked || !client}
                // required="ON"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="phone">Téléphone</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">+261</span>
              </div>
              <input
                type="number"
                id="phone"
                className="form-control"
                // value={phone}
                // onChange={(e) => setPhone(e.target.value)}
                // disabled={isBooked || !client}
                // required="ON"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">
              Email <nb style={{ color: "red" }}>(pas obligatoire)</nb>
            </label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
              </div>
              <input
                type="email"
                id="email"
                className="form-control"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                // disabled={isBooked || !client}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="message">
              Message <nb style={{ color: "red" }}>(pas obligatoire)</nb>
            </label>
            <textarea
              style={{ minHeight: "100px" }}
              // value={message}
              // onChange={(e) => setMessage(e.target.value)}
              id="message"
              className="form-control"
              // disabled={isBooked || !client}
            ></textarea>
          </div>

          <div className="form-group">
            <input
              type="submit"
              id="phone"
              className="btn btn-primary"
              defaultValue="Envoyer le message"
              // disabled={isLoading || !client}
            />
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

export default BookingPage;
