import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

const Account = () => {
  const userLogged = useSelector((state) => state.authUser.userLogged);

  return (
    <>
      {userLogged && <span>Account</span>}
      {!userLogged && <Navigate replace to="/home" />}
    </>
  );
};

export default Account;
