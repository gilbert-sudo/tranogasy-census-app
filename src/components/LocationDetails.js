import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faLocationPen } from "@fortawesome/free-solid-svg-icons";
import {MdEditLocationAlt} from "react-icons/md";
import {Link} from "react-router-dom";
const LocationDetails= ({ location }) => {
  return (
    <Link
    to={`/edit-location/${location._id}`}
      className="list-group-item list-group-item-action py-3 lh-tight"
    >
      <div className="d-flex w-100 align-items-center justify-content-between">
        <strong className="mb-1">{location.address}</strong>{" "}
        <MdEditLocationAlt/>
      </div>
      <div className="col-10 mb-1 small text-uppercase">
        {location.locationLink}
      </div>
    </Link>
  );
};
export default LocationDetails;
