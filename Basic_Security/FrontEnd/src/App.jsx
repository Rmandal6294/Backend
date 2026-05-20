import { useState } from "react"
import axios from "axios"

const App = () => {
  const [name, setName] = useState("")
  const submitHandle = async (e) =>{
    e.preventDefault()
    const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}`, {name},{
      withCredentials: true // tells axios to accept cookies from server
    })
    console.log(res.data)
    setName("")
  }
  return (
    <div className='bg-blue-950 h-screen w-screen box-border p-10 flex justify-center items-center'>
      <form onSubmit= {submitHandle} className='bg-blue-900 p-10 rounded flex flex-col gap-5 justify-center w-full'>
          <label className= "text-xl font-bold text-white/50" htmlFor='name'> Name : </label>
          <input
          value={name} 
          onChange={(e)=>setName(e.target.value)}
          className= "outline-none border-2 p-5 border-amber-50 rounded-4xl shadow-[2px 2px 30px] shadow-black" type = "text" name = "name" placeholder='Enter your name'/>
          <button className='bg-amber-300 p-4 rounded-4xl cursor-pointer'> Submit </button>
      </form>
    </div>
  )
}

export default App;
