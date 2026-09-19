import React from 'react'
import { Link } from 'react-router-dom'
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaLocationArrow,
    FaMobileAlt,
    FaArrowRight,
} from "react-icons/fa";

const FooterLinks = [
    { title: "Home", link: "/" },
    { title: "Cars", link: "/cars" },
    { title: "About", link: "/about" },
    { title: "Booking", link: "/booking" },
]

const Footer = ({ theme }) => {
    return (
        <footer className={`relative pt-20 pb-10 border-t ${
            theme === "dark"
            ? "bg-black text-white border-white/10"
            : "bg-white text-black border-black/10"
        }`}>
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">

                {/* Top: brand + newsletter */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pb-16 border-b border-current/10">
                    <div>
                        <Link to="/" className="font-serif text-3xl font-bold tracking-tight">
                            Car<span className="text-yellow-500">.</span>Rental
                        </Link>
                        <p className="mt-4 text-sm opacity-60 max-w-sm leading-relaxed">
                            Premium car rental, delivered with care. Drive the
                            extraordinary, wherever the road takes you.
                        </p>
                    </div>

                    <div className="lg:pl-12">
                        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-yellow-500 mb-3">
                            Newsletter
                        </p>
                        <h3 className="font-serif text-2xl font-bold mb-4">
                            Get offers before anyone else.
                        </h3>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className={`flex-1 px-5 py-3 rounded-full text-sm border outline-none transition-colors focus:border-yellow-500 ${
                                    theme === 'dark'
                                    ? 'bg-white/5 border-white/10'
                                    : 'bg-black/5 border-black/10'
                                }`}
                            />
                            <button className="w-12 h-12 rounded-full bg-yellow-500 text-black flex items-center justify-center hover:bg-yellow-400 transition-colors shrink-0">
                                <FaArrowRight size={12} className="-rotate-45" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Middle: links */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-14">
                    <div>
                        <h4 className="text-xs font-semibold tracking-[0.2em] uppercase opacity-50 mb-5">Company</h4>
                        <ul className='space-y-3'>
                            {FooterLinks.slice(0, 2).map((data) => (
                                <li key={data.title}>
                                    <Link to={data.link} className='text-sm opacity-70 hover:opacity-100 hover:text-yellow-500 transition-all duration-300'>
                                        {data.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-xs font-semibold tracking-[0.2em] uppercase opacity-50 mb-5">Support</h4>
                        <ul className='space-y-3'>
                            {FooterLinks.slice(2, 4).map((data) => (
                                <li key={data.title}>
                                    <Link to={data.link} className='text-sm opacity-70 hover:opacity-100 hover:text-yellow-500 transition-all duration-300'>
                                        {data.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-xs font-semibold tracking-[0.2em] uppercase opacity-50 mb-5">Legal</h4>
                        <ul className='space-y-3'>
                            <li><a href="#" className='text-sm opacity-70 hover:opacity-100 hover:text-yellow-500 transition-all'>Privacy Policy</a></li>
                            <li><a href="#" className='text-sm opacity-70 hover:opacity-100 hover:text-yellow-500 transition-all'>Terms & Conditions</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-xs font-semibold tracking-[0.2em] uppercase opacity-50 mb-5">Contact</h4>
                        <ul className='space-y-3'>
                            <li className='flex items-start gap-2 text-sm opacity-70'>
                                <FaLocationArrow className='text-yellow-500 mt-1 shrink-0' size={11} />
                                <span>Noida, Uttar Pradesh</span>
                            </li>
                            <li className='flex items-center gap-2 text-sm opacity-70'>
                                <FaMobileAlt className='text-yellow-500 shrink-0' size={11} />
                                <span>+92 123456789</span>
                            </li>
                        </ul>
                        <div className='flex items-center gap-2 mt-5'>
                            <a href="#" className="w-9 h-9 rounded-full border border-current/20 hover:border-yellow-500 hover:text-yellow-500 flex items-center justify-center transition-all">
                                <FaInstagram size={13} />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-full border border-current/20 hover:border-yellow-500 hover:text-yellow-500 flex items-center justify-center transition-all">
                                <FaFacebookF size={12} />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-full border border-current/20 hover:border-yellow-500 hover:text-yellow-500 flex items-center justify-center transition-all">
                                <FaLinkedinIn size={12} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="pt-8 border-t border-current/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs opacity-50">
                    <p>© {new Date().getFullYear()} Car Rental. All rights reserved.</p>
                    <p>Crafted with care.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer