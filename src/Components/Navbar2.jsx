import { AlignJustify, X } from "lucide-react"
import { useState } from "react"
 import { Link } from "react-router-dom"

const Navbar2 = () => {
const [isOpen, setIsOpen] = useState(false);
const toggleMenu = () => {
  setIsOpen(!isOpen)
}

  return (
    <>
    <nav className="bg-orange-100 shadow-md">
        <div className='flex justify-between px-4 py-3 max-w-7xl'>
            {/* LOGO  */}
            <div className='text-2xl font-bold text-orange-600'>iNoteBook</div>

            {/* DESKTOP MENU */}
            <div className='hidden md:flex space-x-10 font-semibold'>
                <Link to="/" className="text-gray-600 hover:text-orange-600">Home</Link>
                <Link to="/about" className="text-gray-600 hover:text-orange-600">About</Link>
                <Link to="/" className="text-gray-600 hover:text-orange-600">Services</Link>                
                <Link to="/" className="text-gray-600 hover:text-orange-600">Contact</Link>
            </div>

            {/* Mobile Menu Button */}
            <div className= 'md:hidden'>
              <button onClick={toggleMenu}>
              {isOpen ? (
                <X className= "text-orange-600 w-6 h-6"/>
              ) : (
                <AlignJustify className= "text-orange-600 w-6 h-6" />
              ) }
              </button>
            </div>          
        </div>

        {/* Mobile menu dropdown */}
        {isOpen && (
          <div className="md:hidden flex flex-col items-center space-y-4 py-4 bg-orange-50">
             <Link to="/" className="text-gray-600 hover:text-orange-600">Home</Link>
              <Link to="/about" className="text-gray-600 hover:text-orange-600">About</Link>
              <Link to="/" className="text-gray-600 hover:text-orange-600">Services</Link>                
              <Link to="/" className="text-gray-600 hover:text-orange-600">Contact</Link>
          </div>
        )}
    </nav>
    </>
  )
}

export default Navbar2