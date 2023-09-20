import React, { useState} from "react";
import { Link ,useNavigate} from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import {LiaEyeSlash,LiaEyeSolid} from 'react-icons/lia'


const Signup = () => {



  const { enqueueSnackbar } = useSnackbar();
  const navigation = useNavigate()
  const [firstname, setFname] = useState("");
  const [lastname, setLname] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const[showpass ,setShowpass]= useState(false)
  const[profileImge,setImages]=useState('')
   console.log('images ',profileImge)


   const onUploadimg = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageResult = event.target.result;
        setImages(imageResult); 
      };
      reader.readAsDataURL(file);
    }
  };

   const handelshowpass = ()=>{
    if(showpass === false){
       setShowpass(true)
    }else{
      setShowpass(false)
    }
   }


  const gatdata = () => {
    const sendData = {
      firstname,
      lastname,
      email,
      password,
      profileImge
    };
    if (password.length < 6) {
      enqueueSnackbar("password mine 6 chracter ", { variant: "warning" });
    } else if (firstname && lastname && email && password) {
      axios
        .post("http://localhost:8000/signup", sendData)
        .then((respons) => {
          if(respons.data.status === 409){
            enqueueSnackbar("This email already exsist", { variant: "error" });
          }
          if (respons.data.data) {
            clearFunc();
          }
          navigation('/Login')
          enqueueSnackbar(`${respons.data.data}`, { variant: "success" });
        })
        .catch((err) => {
            enqueueSnackbar(`${err.response.data.message}`, { variant: "error" });
        });
    } else {
      enqueueSnackbar("please file the all fileds", { variant: "error" });
    }
  };

  const clearFunc = () => {
    setFname("");
    setLname("");
    setemail("");
    setPassword("");
  };

  return (
    <div className="flex w-full items-center justify-center h-[90vh]">
      <div className="w-fit p-4 border-2 border-sky-600 flex flex-col gap-4 rounded-[5px]">
       <div className="flex items-center justify-center gap-5">
  {profileImge ? (
    <img
      src={profileImge}
      alt=""
      className=" rounded-full border-2 border-sky-500"
      style={{objectFit:'cover',width:'80px',height:'80px'}}
    />
  ) : (
    <label htmlFor="images" className="rounded-full bg-slate-600 p-8 cursor-pointer"></label>
  )}
  <input
    type="file"
    accept="image/*"
    id="images"
    className="hidden"
    onChange={(e) => onUploadimg(e)}
  />
  <label htmlFor="images" className="cursor-pointer bg-sky-600 text-white p-2 rounded-sm">Add Profile Image</label>
</div>

        <input
          type="text"
          placeholder="First Name"
          className="outline-none border-[1px] border-sky-300  rounded-[3px] p-2 w-[300px]"
          onChange={(e) => setFname(e.target.value)}
          value={firstname}
        />
        <input
          type="text"
          placeholder="First Last"
          className="outline-none border-[1px] border-sky-300  rounded-[3px] p-2 w-[300px]"
          onChange={(e) => setLname(e.target.value)}
          value={lastname}
        />
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
          type={showpass === true ? 'text':'password'}
          placeholder="password"
          className="outline-none border-[1px] border-sky-300  rounded-[3px] p-2 w-[300px]"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        /> 
        <div onClick={handelshowpass} className="cursor-pointer">{showpass === true ?(<LiaEyeSolid  className="ml-[-1.5rem] color-sky-600 "/>):(<LiaEyeSlash className="ml-[-1.5rem] color-sky-600"/>)} </div>
     </span>
   
        <button
          className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-[5px] shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          onClick={gatdata}
        >
          Signup
        </button>
        <p className="flex items-center justify-center gap-2">have already account! <Link to='/Login' className="color-sky-600">Login</Link></p>
      </div>
    </div>
  );
};

export default Signup;
