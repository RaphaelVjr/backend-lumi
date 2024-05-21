/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react"
import Sidebar from "../components/Sidebar"
import axios from "axios"
import { Table } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { FiMenu } from "react-icons/fi"
import { motion } from "framer-motion"

const Library = () => {
  const [faturas, setFaturas] = useState([])
  const dispatch = useDispatch()
  const isSidebarOpen = useSelector(state => state.isSidebarOpen)

  const toggleSidebar = () => {
    dispatch({ type: "TOGGLE_SIDEBAR" })
  }

  const fetchFaturas = async () => {
    try {
      const response = await axios.get("http://localhost:3000/faturas")
      setFaturas(response.data)
    } catch (error) {
      console.error("Error fetching faturas:", error)
    }
  }

  useEffect(() => {
    fetchFaturas()
  }, [])

  const searchFaturas = async numeroCliente => {
    if (numeroCliente) {
      try {
        const response = await axios.get(
          `http://localhost:3000/faturas/cliente/${numeroCliente}`
        )
        setFaturas(response.data)
      } catch (error) {
        console.error(error)
      }
    } else {
      fetchFaturas()
    }
  }

  const columns = [
    {
      title: "Número Cliente",
      dataIndex: "numero_cliente",
      key: "numero_cliente"
    },
    {
      title: "Mês Referência",
      dataIndex: "mes_referencia",
      key: "mes_referencia"
    },
    {
      title: "Download",
      key: "download",
      render: (_, record) => (
        <motion.a
          className="bg-[#0dad62] text-white rounded p-2 hover:text-white"
          href={`http://localhost:3000/faturas/download/${record.id}`}
          download
        >
          Download
        </motion.a>
      )
    }
  ]

  const paginationConfig = {
    pageSize: 5,
    showSizeChanger: false
  }

  return (
    <main className="w-screen flex">
      <div
        className={`fixed top-0 left-0 p-4 z-10 ${
          isSidebarOpen ? "hidden" : "block"
        }`}
        onClick={toggleSidebar}
      >
        <FiMenu size={24} className="cursor-pointer" />
      </div>
      {isSidebarOpen && <Sidebar />}
      <section className="flex flex-col gap-10 p-10 justify-center items-center w-full">
        <h1>Faturas</h1>
        <input
          type="text"
          placeholder="Pesquise um número de cliente"
          onChange={e => searchFaturas(e.target.value)}
          className="p-2 w-1/2 rounded border-2 border-gray-500"
        />
        <Table
          className="w-full"
          dataSource={faturas}
          columns={columns}
          pagination={paginationConfig}
        />
      </section>
    </main>
  )
}

export default Library
