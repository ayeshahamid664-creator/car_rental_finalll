import React from 'react'
import { Link } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";
import { NavLinks } from '../Navbar/Navbar';

const ResponsiveMenu = ({ showMenu, closeMenu, theme }) => {
    return (
        <div
            className={`${
                showMenu ? "left-0" : "-left-full"
            } fixed top-0 z-50 h-screen w-[75%] md:hidden rounded-r-xl shadow-md flex flex-col justify-between px-8 pb-6 pt-16 transition-all duration-300 ${
                theme === "dark" 
                ? "bg-gray-900 text-white" 
                : "bg-white text-gray-900"
            }`}
        >
            <div className="card">
                <div className="flex items-center justify-start gap-3">
                    <FaUserCircle size={50} />
                    <div>
                        <h1>Hello User</h1>
                        <h1 className="text-sm text-yellow-500">Premium user</h1>
                    </div>
                </div>
                <nav className='mt-12'>
                    <ul className='space-y-4 text-xl'>
                        {
                            NavLinks.map((data) => {
                                return (
                                    <li key={data.id}>
                                        <Link 
                                            to={data.link} 
                                            onClick={closeMenu}
                                            className="hover:text-yellow-500 transition-colors duration-300"
                                        >
                                            {data.name}
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>
            </div>
            <div>
                <h1 className="text-sm">
                    Made with ❤️ by <a href="https://dilshad-ahmed.github.io/" className="text-yellow-500 hover:text-yellow-600">The Coding Journey</a>
                </h1>
            </div>
        </div>
    )
}

export default ResponsiveMenu