import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateActiveLink } from "../redux/redux";
import {
  BiHome,
  BiUser,
  BiPlusCircle,
  BiMessageSquareDetail,
} from "react-icons/bi";
import {HiOutlineUserGroup} from "react-icons/hi";
const Navbar = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.pagination);
  const activePage = state[2].activeLink;

  return (
    <>
      {/*=============== HEADER ===============*/}
      <div className="header" id="header">
        <div className="navigation container">
          <Link to="/" className="nav__logo">
            <trano style={{ color: "#7cbd1e" }}>Trano</trano>
            <gasy style={{ color: "#ec1c24" }}>Gasy</gasy>.
          </Link>
          <div className="nav__menu" id="nav-menu">
            <ul className="nav__list">
              <li className="nav__item mt-3">
                <NavLink
                  to="/"
                  style={
                    activePage === "/"
                      ? { color: "#7cbd1e" }
                      : // ? { color: "#26A699" }
                        { color: "#222B2A" }
                  }
                  className="nav__link"
                  onClick={() => {
                    dispatch(updateActiveLink("/"));
                  }}
                >
                  <BiHome className="nav__icon" />
                  <span className="nav__name">Acceuil</span>
                </NavLink>
              </li>
              <li className="nav__item mt-3">
                {" "}
                <NavLink
                  to="/owner-list"
                  style={
                    activePage === "/owner-list"
                      ? { color: "#7cbd1e" }
                      : { color: "#222B2A" }
                  }
                  className="nav__link"
                  onClick={() => {
                    dispatch(updateActiveLink("/owner-list"));
                  }}
                >
                  <HiOutlineUserGroup className="nav__icon" />
                  <span className="nav__name">Propriétaire</span>
                </NavLink>
              </li>
              <li className="nav__item mt-3">
                {" "}
                <NavLink
                  to="/booking"
                  style={
                    activePage === "/booking"
                      ? { color: "#7cbd1e" }
                      : { color: "#222B2A" }
                  }
                  className="nav__link"
                  onClick={() => {
                    dispatch(updateActiveLink("/booking"));
                  }}
                >
                  <BiPlusCircle className="nav__icon" />
                  <span className="nav__name">Ajouter</span>
                </NavLink>
              </li>
              <li className="nav__item mt-3">
                <NavLink
                  to="/message"
                  style={
                    activePage === "/message"
                      ? { color: "#7cbd1e" }
                      : { color: "#222B2A" }
                  }
                  className="nav__link"
                  onClick={() => {
                    dispatch(updateActiveLink("/message"));
                  }}
                >
                  <BiMessageSquareDetail className="nav__icon" />
                  <span className="nav__name">Message</span>
                </NavLink>
              </li>
              <li className="nav__item mt-3">
                {" "}
                <NavLink
                  to="/login"
                  style={
                    activePage === "/login"
                      ? { color: "#7cbd1e" }
                      : { color: "#222B2A" }
                  }
                  className="nav__link"
                  onClick={() => {
                    dispatch(updateActiveLink("/login"));
                  }}
                >
                  <BiUser className="nav__icon" />
                  <span className="nav__name">Connexion</span>
                </NavLink>
              </li>
            </ul>
          </div>
          <img src="images/logo.png" alt="" className="nav__img" />
        </div>
      </div>
    </>
  );
};

export default Navbar;
