  import React, { useEffect, useState } from 'react';
  import axios from 'axios';
  import { useParams } from 'react-router-dom';
  import BackButton from '../components/BackButton';
  import Spinner from '../components/Spinner';



  const ShowBook = () => {
    
    const [book ,setBook] = useState({});
    const  {id} = useParams()
    const gatData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    useEffect(() => {
      gatData()
    }, []);
    return (
    <>
    <div className='p-4'>
    <BackButton/>
    <h1 className='text-3xl my-4'>Show Books</h1>

    {
      book ? 
      (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Id</span>
              <span>{book._id}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Title</span>
              <span>{book.title}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Author</span>
              <span>{book.author}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
              <span>{book.publishyear}</span>
            </div>         
          </div>
      
      ):(<Spinner/>)
    }
    </div>
    </>
    )
  }

  export default ShowBook