import React, { useState, useEffect } from 'react'
import Copyicon from "../assets/copy-svgrepo-com.svg"
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";


const Manager = () => {
  const [form, setForm] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setPasswordArray] = useState([])
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }


  useEffect(() => {
    let password = localStorage.getItem("password")
    if (password) {
      setPasswordArray(JSON.parse(password))
    }
  }, [])

  const savePassword = () => {
    if(form.site .length > 3 && form.username.length > 3 && form.password.length > 3) {
    const newPassword = { ...form, id: uuidv4() }
    setPasswordArray([...passwordArray, newPassword])
    localStorage.setItem("password", JSON.stringify([...passwordArray, newPassword]))
    toast('🦄 Password saved!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    })
    console.log(passwordArray)
    setForm({ site: "", username: "", password: "" })
  }

else{
  toast('🦄 Please fill in all fields with at least 4 characters!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  })
}
}

const DeletePassword = (id) => {
  console.log("Delete password with id:", id)
  let confirm = window.confirm("Are you sure you want to delete this password?")
  if (confirm) {
    setPasswordArray(passwordArray.filter(item => item.id !== id))
    localStorage.setItem("password", JSON.stringify(passwordArray.filter(item => item.id !== id)))
     toast('🦄 Password deleted!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    })
  }
 }

 const EditPassword = (id) => {

  console.log("Edit password with id:", id)
  setForm(passwordArray.filter(item => item.id === id)[0])
  setPasswordArray(passwordArray.filter(item => item.id !== id))
  
   

 }


  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(240,253,244,0.92)_0%,rgba(248,250,252,0.88)_38%,rgba(233,213,255,0.92)_100%)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(34,197,94,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,197,94,0.10)_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-40"></div>
        <div className="absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.20),transparent_48%),radial-gradient(circle_at_top_left,rgba(168,85,247,0.18),transparent_42%)]"></div>
      </div>

      <div className="mycontainer">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/50 bg-white/45 px-4 py-10 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl md:px-10 md:py-14">
          <h1 className="text-4xl font-bold text-center">
            <span className="text-green-700">Password</span>
            <span className="text-green-700">Manager</span>
          </h1>
          <p className="text-green-950 text-lg text-center">Your own Password Manager</p>

          <div className="flex flex-col p-4 text-slate-900 gap-4 text-black">
            <input
              type="text"
              name="site"
              id="website"
              value={form.site}
              onChange={handleChange}
              className="rounded-2xl border border-green-500/40 bg-white/75 p-3 shadow-sm outline-none transition focus:border-green-500 focus:bg-white"
              placeholder="Enter website URL"
            />

            <div className="flex gap-2 flex-col md:flex-row">
              <input
                type="text"
                name="username"
                className="w-full rounded-2xl border border-green-500/40 bg-white/75 p-3 shadow-sm outline-none transition focus:border-green-500 focus:bg-white"
                value={form.username}
                onChange={handleChange}
                placeholder="Enter username"
              />

              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="w-full rounded-2xl border border-green-500/40 bg-white/75 p-3 pr-16 shadow-sm outline-none transition focus:border-green-500 focus:bg-white"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter password"

                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-green-700"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button onClick={savePassword} className="flex justify-center items-center gap-2 bg-gradient-to-r from-emerald-400 to-green-500 text-slate-950 font-semibold rounded-full px-8 py-3 w-fit mx-auto border border-emerald-700/40 shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-emerald-500/30">
              <lord-icon
                src="https://cdn.lordicon.com/vjgknpfx.json"
                trigger="hover">
              </lord-icon>
              <span>Password generator</span>
            </button>
          </div>


          <div>
            <h2 className="font-bold text-xl py-2"> Your Passwords </h2>
            {passwordArray.length === 0 && <div> No passwords saved yet. </div>}
            {passwordArray.length !== 0 && (
              <table className="table-fixed w-full bg-green-800 rounded-lg overflow-hidden text-white mt-10 text-sm">
                <thead className="text-white bg-green-1000">
                  <tr>
                    <th>Website</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th className='w-16'>Actions </th>
                  </tr>
                </thead>
                <tbody className='bg-green-600 '>
                  {passwordArray.map((item, index) => {
                    return <tr key={index}>
                      <td className='text-center p-2 break-words'>
                        <a href={item.site} target='_blank' rel='noreferrer'>
                          {item.site}
                        </a>
                        <button onClick={() => {
                          navigator.clipboard.writeText(item.site)
                          toast.success("Website copied to clipboard")
                        }}>
                          <img src={Copyicon} alt="Copy icon" className='w-4 h-4   cursor-pointer' />
                        </button>

                      </td>
                      <td className='text-center p-2 break-words'>{item.username}
                        <button onClick={() => {
                          navigator.clipboard.writeText(item.username)
                          toast.success("Username copied to clipboard")
                        }}>
                          <img src={Copyicon} alt="Copy icon" className='w-4 h-4   cursor-pointer' />
                        </button>
                      </td>
                      <td className='text-center p-2 break-words'>{item.password}
                        <button onClick={() => {
                          navigator.clipboard.writeText(item.password)
                          toast.success("Password copied to clipboard")
                        }}>
                          <img src={Copyicon} alt="Copy icon" className='w-4 h-4   cursor-pointer' />
                        </button>
                      </td>
                      <td className='py-2 text-center'>
                        <span className='inline-flex items-center justify-center gap-2'>
                        <span className='cursor-pointer' onClick={() => EditPassword (item.id)}>
                          <lord-icon
                            src="https://cdn.lordicon.com/fikcyfpp.json"
                            trigger="hover"
                            style={{ width: "20px", height: "20px" }}>
                          </lord-icon>
                           </span>
                          <span className='cursor-pointer' onClick={() => DeletePassword(item.id)}>
                          <lord-icon
                            src="https://cdn.lordicon.com/jzinekkv.json"
                            trigger="hover"
                             colors="primary:#black,secondary:#black"
                            style={{ width: "20px", height: "20px" }}>
                          </lord-icon>
                          </span>
                        </span>
                      </td>
                    </tr>
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Manager
