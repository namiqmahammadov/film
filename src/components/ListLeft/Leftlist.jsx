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
      // localStorage.setItem('data', JSON.stringify(list));
      // console.log(movie)
    }
  }, [movie]);

  const textInpHandler = (e) => {
    setInp(e.target.value);
    
  };

  const deleteListItem = (id) => {
    setListItem((prevItems) => prevItems.filter((item) => item.imdbID !== id));

  };
  useEffect(() => {
  setListItem([])
    }, [list]);


    const createNewList = () => {
      if (listItem.length === 0) {
        alert('Please add at least one movie to the list!');
        return;
      }
  
      if (inp.trim() !== '') {
        if (listItem.length > 0) {
          let storedData2 = JSON.parse(localStorage.getItem('list')) || [];
          const existingList = storedData2.find(item => item.title.toUpperCase().trim() === inp.toUpperCase().trim());
           if (existingList) {
            alert('A list with this title already exists!');
           return;
          }
          setListTitle(inp);
    
          let storedData = JSON.parse(localStorage.getItem('list')) || [] ;
          let updatedList = [...storedData, { title: inp, items: [...listItem] }];
          localStorage.setItem('list', JSON.stringify(updatedList));
     
          setList(updatedList);
    
          setInp('');
          setListItem([]);
        } else {
          alert('Please add items to the list!');
          setListItem([]);
        }
      } else {

        alert('Please add a list name!');
      }

    };
    // console.log(listItem)
    
  // console.log(localStorage.getItem('data'))
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
