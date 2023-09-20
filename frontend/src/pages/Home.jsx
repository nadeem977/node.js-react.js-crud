import React, { useEffect, useState ,useContext} from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link} from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import Contect from './Contect';
import BookModals from './BookModals';
import { AppContext } from '../context/appSlice';

const Home = () => {

    const [books ,setBooks]=useState([])
  const{modalse}=useContext(AppContext)
  console.log(modalse,'thia ia modal')
    useEffect(() => {
     axios.get('http://localhost:8000/books')
    .then((response) =>setBooks(response.data.data))
    .catch((error) =>{
      console.log(error,'API Errors')
    })
    },[])


  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
       <h1 className='text-3xl my-8'>Books List</h1>
       <Link to='/create'>
        <MdOutlineAddBox className='text-sky-800 text-4xl'/>
       </Link>
      </div>
      {books.length > 0 ? 
      (
    <Contect books={books}/>
      ):<div className='flex justify-center items-center'>
        <Spinner/>
      </div>        
      }
      {modalse && <BookModals/>}
    </div>
  )
}

export default Home