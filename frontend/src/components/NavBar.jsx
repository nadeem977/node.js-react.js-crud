import React, { useEffect, useState ,useContext} from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import { AppContext } from "../context/appSlice";


const NavBar = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [localstore, setLocalstore] = useState(null);
  const [localdata, setLocaldata] = useState([]);
  const {getFunc} =useContext(AppContext)
  const loggout = async () => {
    try {
      const storedData = localStorage.getItem("user");
      const parsedData = JSON.parse(storedData);
      setLocaldata(parsedData);
      if (localdata) {
        const data = await axios.post("http://localhost:8000/logout",localdata);
        const successSMS = data.data.message;
        if (successSMS) {
          localStorage.removeItem("user");
          enqueueSnackbar(`${successSMS}`, { variant: "success" });
          handelevent()
        } 
      }
    } catch (error) {
      console.log(error);
    }
  };


const handelevent = ()=>{
  const getlocldata = localStorage.getItem("user");
  setLocalstore(JSON.parse(getlocldata));
}
  useEffect(() => {
    handelevent()
    console.log(getFunc,"context menu")
  }, [getFunc]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to='/'>Book Store</Link>
          </Typography> 
          <Box className='flex items-center gap-2'>
          
           
          {localstore ? (
            <Button color="inherit" onClick={loggout}>
              Logout
            </Button>
          ) : (
            <Link to="/Login" className="uppercase px-2">
              Login
            </Link>
          )}
        {localstore && <Typography variant="body1" color="white" className="capitalize">{localstore.Fname}</Typography>}
           {localstore && <img src={localstore.image} alt="users"  className=" rounded-full border-2 border-sky-500"
      style={{objectFit:'cover',width:'50px',height:'50px'}}/>}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
