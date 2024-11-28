import { useContext } from "react";
import logo from "../../../assets/original-c6ef014db377e94af74b6fe3bfa34f65.jpg";
import { Link, useNavigate } from "react-router-dom";
import { UserLogin } from "../../../Context/UserLogin";
import toast from "react-hot-toast";

export default function Navbar() {
  let { userLogin, setuserLogin } = useContext(UserLogin);
  let navegate = useNavigate();
  function signout() {
    setuserLogin(null);
    localStorage.removeItem("token");
    toast.success("Logout Successfully !");
    navegate("/login");
  }
  return (
    <>
      <nav className="z-50 border-gray-200 bg-slate-100 fixed top-0 left-0 right-0 bg-gradient-to-r from-[#a69e309f] via-[#5c6215c2] to-[#2e4905c2]">
        <div className="flex flex-wrap justify-between md:justify-between items-center mx-auto max-w-screen-xl p-3">
          <img
            src={logo}
            className="w-[60px] h-[60px] rounded-lg"
            alt="Logo"
            loading="lazy"
          />
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            {userLogin != null ? (
              <h1 className="cursor-pointer font-bold text-[25px] text-white">
                Dash Board
              </h1>
            ) : null}
          </div>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <div className="register flex gap-1">
              {userLogin != null ? (
                <span onClick={signout} className="text-sm cursor-pointer">
                  <button
                    type="button"
                    className="text-white bg-emerald-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    SignOut
                  </button>
                </span>
              ) : (
                <>
                  <Link to="login" className="text-sm">
                    <button
                      type="button"
                      className="text-white bg-emerald-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Login
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
