/* eslint-disable react/react-in-jsx-scope */
import { Link, useLocation } from "react-router-dom"
import { FiMenu, FiX } from "react-icons/fi"
import lumi from "../assets/lumi-logo.png"
import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"

const Sidebar = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const isSidebarOpen = useSelector(state => state.isSidebarOpen)

  const toggleSidebar = () => {
    dispatch({ type: "TOGGLE_SIDEBAR" })
  }

  const isActive = path => {
    return location.pathname === path
  }

  const sidebarVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: { type: "tween", duration: 0.5 }
    },
    closed: {
      x: "-100%",
      opacity: 0,
      transition: { type: "tween", duration: 0.5 }
    }
  }

  return (
    <>
      <div
        className={`fixed top-0 left-0 p-4 z-10 ${
          isSidebarOpen ? "hidden" : "block"
        }`}
        onClick={toggleSidebar}
      >
        <FiMenu size={24} className="cursor-pointer" />
      </div>

      <motion.aside
        className="h-screen p-10 w-1/4 flex flex-col items-left bg-white border-r-2 border-gray-200"
        variants={sidebarVariants}
        initial="closed"
        animate={isSidebarOpen ? "open" : "closed"}
        exit="closed"
      >
        <div className="flex justify-end">
          <FiX size={24} onClick={toggleSidebar} className="cursor-pointer" />
        </div>
        <img src={lumi} alt="Lumi logo" className="w-[170px] h-[100px] mb-10" />
        <nav>
          <ul className="flex flex-col gap-5">
            <li>
              <Link
                to="/"
                className={
                  isActive("/") ? "bg-[#0dad62] text-white p-2 rounded" : ""
                }
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/library"
                className={
                  isActive("/library")
                    ? "bg-[#0dad62] text-white p-2 rounded"
                    : ""
                }
              >
                Biblioteca de faturas
              </Link>
            </li>
          </ul>
        </nav>
      </motion.aside>
    </>
  )
}

export default Sidebar
