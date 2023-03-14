import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/style.css';
import { toastError, toastSuccess } from './utils/index';

const Main = () => {

  
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [todos, setTodos] = useState([]);
  const [limit, setLimit] = useState(4);



  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`)
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [limit]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === '' || body === '') {
      return toastError('Fill the all fields');
    }

  
    const newPost = {
      id: Date.now(),
      title,
      body,
    };


    axios
      .post('https://jsonplaceholder.typicode.com/todos', newPost)
      .then((response) => {
        setTodos([...todos, response.data]);
        setTitle('');
        setBody('');
        toastSuccess('Post added successfully');
      })
      .catch((error) => {
        console.error(error);
        toastError('Failed to add post');
      });
  };
  

  const handleDelete = (id, title) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((response) => {
        setTodos(todos.filter((list) => list.title !== title));
        toastSuccess(`${title} deleted`);
      })
      .catch((error) => {
        console.error(error);
        toastError('Failed to delete post');
      });
  };
  

  const handleSelectChange = (e) => {
    const evt = e.target.value
    setLimit(evt);
    if(evt < 10 ){
      return toastSuccess(`Posts decreased successfully to ${evt} post` );
    }else{
      if(evt > limit){
        return toastSuccess(`Posts increased successfully to ${evt} posts` );
       }else{
        return toastSuccess(`Posts decreased successfully to ${evt} posts`);
       }
    }    
  };

  return (
    <>
      <div className='worn'>
        <form onSubmit={handleSubmit}>
          <input
            className='input form-control text-center my-1'
            type='text'
            placeholder='title'
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <input
            className='input form-control text-center my-1'
            type='text'
            placeholder='body'
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
            }}
          />
           <button className='btn btn-primary form-control'>Add</button>
          <select
            name='select'
            id='select'
            value={limit}
            onChange={handleSelectChange}
            className="form-control text-center mt-1"
          >
            <option value='0'>0</option>
            <option value='10'>10</option>
            <option value='20'>20</option>
            <option value='30'>30</option>
            <option value='40'>40</option>
            <option value='50'>50</option>
          </select>
         
        </form>
      </div>
      <div className='extra__box'>
        {todos.map((list, i) => (
          <div className='worn__box py-1' key={i}>
            <h3 className='worn__title'>{list.title}</h3>
            <p className='worn__text'>{list.body}</p>
            <button
              onClick={() => handleDelete(list.id, list.title)}
              className='btn btn-danger'
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Main;
