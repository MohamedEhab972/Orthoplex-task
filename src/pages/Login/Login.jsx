import { useFormik } from "formik";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { UserLogin } from "../../Context/UserLogin";
import backgroundImage from "../../assets/pexels-photo-259915.jpeg";
import toast from "react-hot-toast";

export default function Login() {
  const { setuserLogin } = useContext(UserLogin);
  const navigate = useNavigate();

  function handleSubmit(values) {
    if (values) {
      const token = "abc";
      setuserLogin(token);
      localStorage.setItem("userDetails", JSON.stringify(values));
      localStorage.setItem("token", token);
      toast.success("Login Successfully !");
      navigate("/dashboard/home");
    } else {
      alert("Invalid credentials, please try again!");
    }
  }

  const validationSchema = yup.object({
    email: yup.string().email("Invalid Email").required("Email is required"),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d@$!#%*?&]{8,}$/,
        "Password must include 8-10 characters, at least one uppercase letter, one lowercase letter, one number, and one special character."
      )
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div
      className="w-full min-h-screen flex justify-center items-center bg-gradient-to-r from-emerald-400 to-blue-500"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="w-3/4 md:w-1/2 bg-white/80 backdrop-blur-md p-8 rounded-lg shadow-lg flex flex-col justify-center items-center"
      >
        <h2 className="font-bold text-4xl text-center mb-5 text-emerald-600">
          Login Now
        </h2>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            id="email"
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-emerald-600"
          >
            Enter Your Email
          </label>
          {formik.touched.email && formik.errors.email && (
            <div
              className="p-4 mt-2 mb-4 text-sm text-red-700 rounded-lg bg-red-400 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.email}
            </div>
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            id="password"
            name="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-emerald-600"
          >
            Enter Your Password
          </label>
          {formik.touched.password && formik.errors.password && (
            <div
              className="p-4 mt-2 mb-4 text-sm text-red-700 rounded-lg bg-red-400 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.password}
            </div>
          )}
        </div>
        <button
          type="submit"
          className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-6/12 px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
        >
          Login
        </button>
      </form>
    </div>
  );
}
