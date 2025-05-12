import React, { useState, useEffect } from 'react';
import { MapPin, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const navigateToMap = () => {
    navigate('/map');
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center space-x-2">
            <MapPin 
              size={32} 
              className="text-blue-600" 
              strokeWidth={2.5} 
            />
            <span className={`text-xl font-bold ${isScrolled ? 'text-gray-900' : 'text-gray-900'}`}>
              Smart Route Planner
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="#features" isScrolled={isScrolled}>Features</NavLink>
            <NavLink href="#demo" isScrolled={isScrolled}>Demo</NavLink>
            <NavLink href="#benefits" isScrolled={isScrolled}>Benefits</NavLink>
            <NavLink href="#testimonials" isScrolled={isScrolled}>Testimonials</NavLink>
            <button onClick={navigateToMap} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full transition-all font-medium">
              Navigate
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <MobileNavLink href="#features" onClick={toggleMenu}>Features</MobileNavLink>
            <MobileNavLink href="#demo" onClick={toggleMenu}>Demo</MobileNavLink>
            <MobileNavLink href="#benefits" onClick={toggleMenu}>Benefits</MobileNavLink>
            <MobileNavLink href="#testimonials" onClick={toggleMenu}>Testimonials</MobileNavLink>
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full transition-all font-medium w-full">
              Navigate
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isScrolled: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, isScrolled }) => (
  <a 
    href={href} 
    className={`font-medium hover:text-blue-600 transition-colors ${
      isScrolled ? 'text-gray-700' : 'text-gray-800'
    }`}
  >
    {children}
  </a>
);

interface MobileNavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ href, children, onClick }) => (
  <a 
    href={href} 
    className="text-gray-700 font-medium py-2 border-b border-gray-100 hover:text-blue-600 transition-colors"
    onClick={onClick}
  >
    {children}
  </a>
);

export default Navbar;