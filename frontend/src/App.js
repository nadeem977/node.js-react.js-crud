import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateBook from "./pages/CreateBook";
import DeleteBook from "./pages/DeleteBook";
import ShowBook from "./pages/ShowBook";
import EditeBook from "./pages/EditeBook";
import Signup from "./pages/Signup";
import Login from './pages/Login'
import NavBar from "./components/NavBar";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/create' element={<CreateBook />} />
        <Route path='/books/details/:id' element={<ShowBook />} />
        <Route path='/books/edit/:id' element={<EditeBook />} />
        <Route path='/books/delete/:id' element={<DeleteBook />} />
        <Route path='/Signup' element={<Signup/>} />
        <Route path='/Login' element={<Login/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
