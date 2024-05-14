import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Header.css'
import img1 from '../../images/image2.png'
import img0 from '../../images/img.png'
const Header = () => {
  return (
    <div className='nav-all'>
<div className='nav-right'>
<NavLink to='/'><img src={img1} alt="Logo" className='logo-img'/></NavLink>

<NavLink to='/'><img src={img0} alt="Logo" className='logo-img0'/></NavLink>
</div>
 <div className='nav-right'>
 <NavLink to='/' className='link-list'>Home</NavLink>
    <NavLink to='/list' className='link-list'>List</NavLink>
   
 </div>
 <div className='light'></div>

    </div>
  )
}

export default Header