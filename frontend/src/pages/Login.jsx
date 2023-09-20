import React, { useState,useContext } from "react";
import { LiaEyeSlash, LiaEyeSolid } from "react-icons/lia";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import { AppContext } from "../context/appSlice";

const Login = () => {

  const { enqueueSnackbar } = useSnackbar();
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [showpass, setShowpass] = useState(false);
  const navigation = useNavigate();
  const{ setGetFunc}=useContext(AppContext);

  const handelshowpass = () => {
    if (showpass === false) {
      setShowpass(true);
    } else {
      setShowpass(false);
    }
  };

  const gatdata = async () => {
    try {
      const postData = {
        email,
        password,
      };
      const getdata = await axios.post("http://localhost:8000/login", postData);
      const { message } = getdata.data;
      enqueueSnackbar(message, { variant: "success" });
      setGetFunc(true)
      navigation("/");
      const { token } = getdata.data;
      if (token) {
        const { firstname, lastname, email ,profileImge } = getdata.data.user;
        const objdata = {
          Fname: firstname,
          Lname: lastname,
          email: email,
          token: token,
          image:profileImge
        };
        localStorage.setItem("user", JSON.stringify(objdata));
      }
    } catch (error) {
      const SMS = error.response.data.message
      enqueueSnackbar(SMS, { variant: "error" });
    }
  };

  return (
    <div className="flex w-full items-center justify-center h-[90vh]">
      <div className="w-fit p-4 border-2 border-sky-600 flex flex-col gap-4 rounded-[5px]">
        <input
          type="email"
          required
          placeholder="email"
          className="outline-none border-[1px] border-sky-300  rounded-[3px] p-2 w-[300px]"
          onChange={(e) => setemail(e.target.value)}
          value={email}
        />
        <span className="flex items-center">
          <input
            type={showpass === true ? "text" : "password"}
            placeholder="password"
            className="outline-none border-[1px] border-sky-300  rounded-[3px] p-2 w-[300px]"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />{" "}
          <div onClick={handelshowpass} className="cursor-pointer">
            {showpass === true ? (
              <LiaEyeSolid className="ml-[-1.5rem] color-sky-600 " />
            ) : (
              <LiaEyeSlash className="ml-[-1.5rem] color-sky-600" />
            )}{" "}
          </div>
        </span>
        <button
          className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-[5px] shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          onClick={gatdata}>
          Login
        </button>
        <p className="flex items-center justify-center gap-2">
          have not account!{" "}
          <Link to="/Signup" className="color-sky-600">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
