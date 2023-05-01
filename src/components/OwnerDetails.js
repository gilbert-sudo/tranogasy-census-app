import { Link } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";

const OwnerDetails = ({ owner }) => {
  return (
    <div className="d-flex justify-content-between align-items-center border border-secondary py-2 border-right-0 border-bottom-0  border-left-0">
      <div className="d-flex flex-row align-items-center">
        <div className="image">
          <img src="https://i.imgur.com/vxEWOFl.png" width={70} />
        </div>
        <div className="d-flex flex-column line-height ml-2">
          <span className="font-weight-bold">{ owner.fullName }</span>
          <span className="ml-3">Tél : { owner.phone1 }</span>
          <span className="ml-3">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; { owner.phone2 }
          </span>
          <span className="d-flex flex-row align-items-center l-now">
            <small className="live" />
            Ajouté le: 03-05-2023
          </span>
        </div>
      </div>
      <div className="dots">
        <Link
          to={`/edit-owner/${owner._id}/${owner.fullName}/${owner.phone1}/${
            +owner.phone2 ? owner.phone2 : ""
          }`}
        >
          <FaUserEdit />
        </Link>
      </div>
    </div>
  );
};
export default OwnerDetails;
