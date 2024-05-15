import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Pages.css';
import NA from '../images/NA.png';

const List = () => {
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    getItem();
  }, []);

  const getItem = () => {
    const storedData = JSON.parse(localStorage.getItem('list')) || [];
    setMyList(storedData);
  };

  return (
    <div className='parent'>
      <ul>
        {myList.length !== 0 ? (
          myList.map((item, index) => (
            <li key={index}>
              <p className='listName'>{item.title}</p>
              <ul>
                {item.items.map((innerItem, innerIndex) => (
                  <li className='liInner' key={innerIndex}>
                    <img src={innerItem.Poster === 'N/A' ? NA : innerItem.Poster} alt={innerItem.Title} />
                    {innerItem && (
                      <Link className='fromListToDetail' to={`https://www.imdb.com/title/${innerItem.imdbID}`}>
                        {innerItem.Title} ({innerItem.Year})
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          ))
        ) : (
          <p className='wrong wrong2'>List is empty !!!</p>
        )}
      </ul>
    </div>
  );
};

export default List;
