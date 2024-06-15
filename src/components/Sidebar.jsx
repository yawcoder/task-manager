import React from 'react'
import logo from "../assets/logo.jpg"
import { MdLogout, MdSpaceDashboard } from 'react-icons/md'
import { FaTasks, FaUsers } from 'react-icons/fa'
import { CiSettings } from 'react-icons/ci'
import { Link } from 'react-router-dom'


const Sidebar = ({userFirstName, signUserOut}) => {


  return (
    <section className="sticky top-0 py-10 px-4 flex flex-col min-w-[270px] max-w-[270px] bg-gray-700 h-screen">
        <img src={logo} alt="" className="1/5"/>
        <div className="flex flex-col items-start gap-10 mt-20 text-white text-lg h-3/5">
            <button><Link to="/dashboard"><MdSpaceDashboard className="inline mr-2"/><span>Dashboard</span></Link></button>
            <button><FaTasks className="inline mr-2"/><span>Tasks</span></button>
            <button><FaUsers className="inline mr-2"/><span>Users</span></button>
            <button><CiSettings className="inline mr-2"/><span>Settings</span></button>
        </div>
        <div className="h-1/5 text-white flex flex-col justify-end">
            <p className="text-center">Welcome, <span>{userFirstName}</span></p>
            <button onClick={signUserOut} className="border py-2 rounded-full mt-3 hover:bg-white hover:text-black"><span>LogOut</span><MdLogout className="inline ml-2"/></button>
        </div>
    </section>
  )
}

export default Sidebar