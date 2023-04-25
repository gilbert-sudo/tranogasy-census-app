import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import { useState } from "react";
const OwnerAdded = ({ owner }) => {
  return (
    <Link
    to={`/edit-owner/${owner._id}/${owner.fullName}/${owner.phone1}/${+owner.phone2?owner.phone2:""}`}
      className="list-group-item list-group-item-action py-3 lh-tight"
    >
      <div className="d-flex w-100 align-items-center justify-content-between">
        <strong className="mb-1">{owner.fullName}</strong>{" "}
        <FontAwesomeIcon icon={faUserPen} />
      </div>
      <div className="col-10 mb-1 small text-uppercase">
        {owner.phone1} | {owner.phone2?owner.phone2 : "..."}
      </div>
    </Link>
  );
};
export default OwnerAdded;
