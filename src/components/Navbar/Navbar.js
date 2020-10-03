import React from "react";
import { NavLink, withRouter } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../redux/user";

const Navbar = (props) => {
  const dispatch = useDispatch();

  const active = useSelector((store) => store.user.active);

  const logOut = () => {
    dispatch(logOutUser());
    props.history.push("/login");
  };

  return (
    <div className="navbar navbar-dark bg-secondary">
      <div className="d-flex">
        {active ? (
          <>
            <button className="btn btn-dark mr-2" onClick={() => logOut()}>
              Log Out
            </button>
          </>
        ) : (
          <NavLink className="btn btn-dark mr-2" to="/login" exact>
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default withRouter(Navbar);
