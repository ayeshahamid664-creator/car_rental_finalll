
import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { BiSolidMoon, BiSolidSun } from "react-icons/bi";
import ResponsiveMenu from '../ResponsiveMenu/ResponsiveMenu';
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import CartIcon from '../Cart/CartIcon';
import CartDrawer from '../Cart/CartDrawer';
import { FaBolt } from "react-icons/fa";

export const NavLinks = [
    { id: "1", name: "Home", link: "/" },
    { id: "2", name: "Cars", link: "/cars" },
    { id: "3", name: "About", link: "/about" },
    { id: "4", name: "Booking", link: "/booking" },
]

const marqueeItems = [
    "🎉 Special Offer: 20% OFF on your first booking",
    "🚗 New cars added to our fleet",
    "⚡ Free cancellation up to 24 hours",
    "💰 Best price guarantee",
    "🛡️ 24/7 Roadside assistance",
];

const Navbar = ({ theme, setTheme }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const togglemenu = () => setShowMenu(!showMenu);
    const closeMenu = () => setShowMenu(false);

    return (
        <>
            <nav className={`fixed left-0 right-0 top-0 w-full z-50 transition-all duration-300 ${
                theme === "dark"
                ? "bg-black/80 text-white border-b border-white/5"
                : "bg-white/80 text-gray-900 border-b border-black/5"
            } backdrop-blur-xl ${scrolled ? "shadow-lg shadow-black/5" : ""}`}>

                {/* Marquee Line — subtle */}
                <div className="bg-yellow-500 text-black overflow-hidden py-1.5">
                    <div className="flex animate-marquee whitespace-nowrap">
                        {[...marqueeItems, ...marqueeItems].map((item, i) => (
                            <span key={i} className="mx-8 text-[11px] font-semibold tracking-wide flex items-center gap-2 shrink-0">
                                <FaBolt className="text-black/60" size={10} />
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 md:h-[72px]">
                        <Link to="/" className="text-2xl font-serif font-bold tracking-tight">
                            Car<span className="text-yellow-500">.</span>Rental
                        </Link>

                        {/* Desktop nav */}
                        <div className="hidden md:flex items-center gap-8">
                            <ul className="flex items-center gap-1">
                                {NavLinks.map((data) => (
                                    <li key={data.id}>
                                        <NavLink
                                            to={data.link}
                                            className={({ isActive }) =>
                                                `relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-300 rounded-full ${
                                                    isActive
                                                        ? "text-yellow-500"
                                                        : "hover:text-yellow-500"
                                                }`
                                            }
                                        >
                                            {data.name}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>

                            <div className="h-6 w-px bg-current/10" />

                            <div className="flex items-center gap-4">
                                <CartIcon onClick={() => setIsCartOpen(true)} />
                                {theme === "dark" ? (
                                    <BiSolidSun
                                        onClick={() => setTheme("light")}
                                        className='text-xl cursor-pointer hover:text-yellow-500 transition-colors'
                                    />
                                ) : (
                                    <BiSolidMoon
                                        onClick={() => setTheme("dark")}
                                        className='text-xl cursor-pointer hover:text-yellow-500 transition-colors'
                                    />
                                )}
                                <Link to="/booking" className="bg-yellow-500 text-black text-sm font-semibold px-5 py-2 rounded-full hover:bg-yellow-400 transition-colors">
                                    Book Now
                                </Link>
                            </div>
                        </div>

                        {/* Mobile */}
                        <div className='flex items-center gap-4 md:hidden'>
                            <CartIcon onClick={() => setIsCartOpen(true)} />
                            {theme === "dark" ? (
                                <BiSolidSun onClick={() => setTheme("light")} className='text-xl cursor-pointer' />
                            ) : (
                                <BiSolidMoon onClick={() => setTheme("dark")} className='text-xl cursor-pointer' />
                            )}
                            {showMenu ? (
                                <HiMenuAlt1 onClick={togglemenu} size={26} className="cursor-pointer" />
                            ) : (
                                <HiMenuAlt3 onClick={togglemenu} size={26} className="cursor-pointer" />
                            )}
                        </div>
                    </div>
                </div>

                <ResponsiveMenu showMenu={showMenu} closeMenu={closeMenu} theme={theme} />
            </nav>
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} theme={theme} />
        </>
    )
}

export default Navbar