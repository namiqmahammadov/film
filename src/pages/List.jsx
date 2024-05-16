import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Pages.css';
import NA from '../images/NA.png';

const List = () => {
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    getItem();
  }, []);

  const getItem = async () => {
    try {
      const listIDs = JSON.parse(localStorage.getItem('listIDs')) || [];

      const fetchedLists = await Promise.all(listIDs.map(async (id) => {
        const response = await fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`);
        if (response.ok) {
          return await response.json();
        } else {
          console.error(`Error fetching list with ID ${id}`);
          return null;
        }
      }));

      setMyList(fetchedLists.filter(list => list !== null));
    } catch (error) {
      console.error('Error fetching lists:', error);
    }
  };

  return (
    <div className='parent'>
      <ul>
        {myList.length !== 0 ? (
          myList.map((item, index) => (
            <li key={index}>
              <p className='listName'>{item.title}</p>
              <ul>
                {item.movies.map((innerItem, innerIndex) => (
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
