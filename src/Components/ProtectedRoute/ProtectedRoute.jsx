import { Navigate } from "react-router-dom";

export default function ProtectedRoute(props) {
  if (localStorage.getItem("token")) {
    // eslint-disable-next-line react/prop-types
    return props.children;
  } else {
    return <Navigate to={"/login"}></Navigate>;
    // return <Login></Login>;
  }
}
