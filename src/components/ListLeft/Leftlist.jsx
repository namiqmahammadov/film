import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { addlist } from '../../listSlice';

const Leftlist = ({ display, movie }) => {
  const [listItem, setListItem] = useState([]);
  const [listTitle, setListTitle] = useState('');
  const [inp, setInp] = useState('');
  const [list, setList] = useState([]);
  const listToOtherPage = useSelector((state) => state.listSlice.value);
  const dispatch = useDispatch();

  useEffect(() => {
    if (movie && Object.keys(movie).length > 0 && !listItem.find(item => item.imdbID === movie.imdbID)) {
      setListItem(prevItems => [...prevItems, movie]);
    }
  }, [movie]);

  const textInpHandler = (e) => {
    setInp(e.target.value);
  };

  const deleteListItem = (id) => {
    setListItem((prevItems) => prevItems.filter((item) => item.imdbID !== id));
  };

  useEffect(() => {
    setListItem([]);
  }, [list]);

  const createNewList = async () => {
    if (listItem.length === 0) {
      alert('Please add at least one movie to the list!');
      return;
    }

    if (inp.trim() !== '') {
      const newList = { title: inp, movies: listItem };
      try {
        const response = await fetch('https://acb-api.algoritmika.org/api/movies/list', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newList),
        });

        if (response.ok) {
          const data = await response.json();
          // Save the new list's ID to local storage
          let listIDs = JSON.parse(localStorage.getItem('listIDs')) || [];
          listIDs.push(data.id);
          localStorage.setItem('listIDs', JSON.stringify(listIDs));

          setListTitle(inp);
          setInp('');
          setListItem([]);
          alert('List created successfully!');
        } else {
          alert('Failed to create list. Please try again.');
        }
      } catch (error) {
        console.error('Error creating list:', error);
        alert('Failed to create list. Please try again.');
      }
    } else {
      alert('Please add a list name!');
    }
  };

  return (
    <div className='list-div' style={{ display: display ? 'block' : 'none' }}>
      <input type="text" value={inp} placeholder='Please First Add List Name...' onChange={textInpHandler} />
      <div className='inner-list-inp'>
        <div className='ul-div'>
          <ul>
            {listItem.length > 0 ? (
              listItem.map((item, index) => (
                <li key={index}>
                  <p>{item.Title} ({item.Year})</p>
                  <FontAwesomeIcon icon={faCircleXmark} onClick={() => deleteListItem(item.imdbID)} />
                </li>
              ))
            ) : (
              <p className='wrong'>List is empty!</p>
            )}
          </ul>
        </div>
      </div>
      <button className='create-new-list' onClick={createNewList}>Create List</button>
    </div>
  );
};

export default Leftlist;
