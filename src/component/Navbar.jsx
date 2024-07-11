import { NavLink } from "react-router-dom"

const  Navbar = () => {
  return (
    <header className="header">
        <NavLink to="/" className=" rounded-lg bg-white items-center justify-center flex justify-center font-bold shadow-md"  >
         <p className="ring-offset-gray-600" ></p>
        </NavLink>
        
    </header>
  )
}

export default Navbar
