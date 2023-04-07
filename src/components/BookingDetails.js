import { useBooking } from "../hooks/useBooking";

import { Link } from "react-router-dom";

function BookingDetails({ booking }) {

  const { cancelBooking } = useBooking();

  const cancelMessage = (messageId) => {
    cancelBooking(messageId);
  };

  return (
    <div className="card border-0">
      <div className="row set-p justify-content-center">
        <div className="col px-0">
          <Link to={"/property/" + booking.property._id}>
            <img className="image" src={booking.image.url}  alt={booking.image.alt} />
          </Link>
        </div>
        <div className="col">
          <Link to={"/property/" + booking.property._id}>
            <div className="row px-3 mt-2">
              <p
                className="rating mb-0 px-2 mr-3"
                style={{ fontSize: "2.5vw" }}
              >
                <strong>10/10/23</strong>
              </p>
              <p
                className="text-success mb-0 mr-2 grade"
                style={{ fontSize: "3vw" }}
              >
                <strong>...en atente</strong>
              </p>
            </div>
            <div className="row px-3">
              <h3 className="font-weight-bold" style={{ fontSize: "3vw" }}>
                {booking.property.title}
              </h3>
            </div>
            {/* <div class="row px-3 mb-2 mt-2">
              <span class="fa fa-star text-warning mr-1"></span>
              <span class="fa fa-star text-warning mr-1"></span>
              <span class="fa fa-star text-warning mr-1"></span>
              <span class="fa fa-star text-warning mr-1"></span>
          </div> */}
            {/* <div class="row px-3">
              <h5 class="mb-1">1 bedroom &middot; 1 living &middot; 2 beds</h5>
          </div>
          <div class="row px-3">
              <p class="">Mitte, Berlin &middot; 2.6 km from center</p>
          </div> */}
            <div className="line" />
            <div className="row px-3 mt-3">
              <h5 className="text-secondary mb-1" style={{ fontSize: "3vw" }}>
                Prix du loyer
              </h5>
            </div>
            <div className="row px-3">
              <h2
                className="text-success mb-1 font-weight-bold"
                style={{ fontSize: "4vw" }}
              >
                {booking.property.rent.toLocaleString("en-US")}{" "}
                <small>AR/mois</small>
              </h2>
            </div>
          </Link>
          {/* <div class="row px-3 mb-3">
              <p class="text-muted mb-0">+ $14 taxes and charges</p>
          </div> */}
          <div className="row px-3 mt-2 d-flex justify-content-end">
            <p
              className="rating mb-0 px-2"
              style={{ fontSize: "3vw", backgroundColor: "#ec1c24" }}
              onClick={(e) => cancelMessage(booking._id)}
            >
              <strong>Annuler</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingDetails;
