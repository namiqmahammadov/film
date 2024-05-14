import React from 'react'
import './Error404.css'
import img404 from '../images/img.png'
const Error404 = () => {
  return (
    <div className="error-container">
      <img
        src={img404}
        alt="404 Not Found"
        className="error-image"
      />
      <h1 className="error-text">Oops! Page is not Found.</h1>
    </div>
    )
}

export default Error404