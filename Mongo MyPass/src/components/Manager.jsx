import { useRef, useState, useEffect } from 'react'
import { IoMdKey } from "react-icons/io";
import { FaCopy } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {

    const [allPass, setAllPass] = useState([]);

    const getData = async () => {
        let req = await fetch("http://localhost:3000")
        let data = await req.json();
        setAllPass(data)
    }

    useEffect(() => {
        getData();
    }, [])



    const ref = useRef();
    const [form, setform] = useState({
        site: "", username: "", password: ""
    })

    const showPassword = () => {
        let path = ref.current.src;
        if (path.includes("images/eyeopen.png")) {
            ref.current.src = "images/eyeclose.png"
        }
        else {
            ref.current.src = "images/eyeopen.png"
        }
    }

    const handleChange = (e) => {
        // console.log(e);
        setform({ ...form, [e.target.name]: e.target.value });
    }

    const saveData = async () => {

        let i1 = form.site, i2 = form.username, i3 = form.password;
        if (i1.length != 0 && i2.length != 0 && i3.length != 0) {

            // deleting old entry
            await fetch("http://localhost:3000", {
                method: "DELETE", headers: {
                    "Content-Type": "application/json",
                }, body: JSON.stringify({ id: form.id })
            })
            const newpass = { ...form, id: uuidv4() }
            setAllPass([...allPass, newpass])
            // adding with new entry
            await fetch("http://localhost:3000", {
                method: "POST", headers: {
                    "Content-Type": "application/json",
                }, body: JSON.stringify(newpass)
            })

            setform({ site: "", username: "", password: "" });
            // localStorage.setItem("password", JSON.stringify([...allPass, { ...form, id: uuidv4() }]))
        }
        // console.log(allPass);

    }



    const copyText = (text) => {
        navigator.clipboard.writeText(text);

    }

    const handleEdit = (id) => {
        // console.log("Editing id " + id);
        setform({ ...(allPass.filter(i => i.id === id))[0], id: id });
        setAllPass(allPass.filter(i => i.id !== id));
    }

    const handleDelete = async (id) => {
        // console.log("Deleting id " + id);
        setAllPass(allPass.filter(i => i.id !== id));

        await fetch("http://localhost:3000", {
            method: "DELETE", headers: {
                "Content-Type": "application/json",
            }, body: JSON.stringify({ id })
        })

        // localStorage.setItem("password", JSON.stringify(allPass.filter(i => { i.id !== id })));
    }
    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            saveData();
        }
    }

    return (
        <>

            <div onKeyDown={(e) => { handleEnter(e) }} className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
            <span className=" flex gap-2 text-lg justify-center m-6">

                <p className=' h-10 text-center text-blue-800 font-semibold'>Your own password manager </p>
                <IoMdKey className=' mt-2' />
            </span>
            <div className="container mx-auto bg-slate-100 h-20   ">
                <span className="site flex-row md:flex-col">
                    <input onChange={handleChange} name='site' value={form.site} placeholder='Enter URL' className=' w-full border border-green-600 rounded-full p-3 py-1' type="text" />

                    <div className="cred gap-6 flex mt-8">
                        <input onChange={handleChange} name='username' value={form.username} placeholder='Enter username' className=' border border-green-600 rounded-full p-3 py-1 w-full ' type="text" />
                        <div className=" relative">

                            <input onChange={handleChange} name='password' value={form.password} placeholder='Enter password' className=' border border-green-600 rounded-full p-3 py-1  w-full relative' type="text" />
                            <span className=' absolute right-0 cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className=' w-auto h-3 pr-1 mt-2.5' src="images/eyeopen.png" alt="show" />
                            </span>
                        </div>
                    </div>
                </span>


                <button onClick={saveData} className=' mx-[35%] absolute mt-6 bg-green-400 rounded-full p-2 hover:cursor-pointer'>
                    <div className=" flex w-fit">

                        <div className=" pt-1 font-bold">Add password</div>
                        <lord-icon className=" "
                            src="https://cdn.lordicon.com/sbnjyzil.json"
                            trigger="hover"
                            stroke="bold"
                            colors="primary:#242424,secondary:#08a88a" >
                        </lord-icon>
                    </div>
                </button>
                <div className="passwords mt-20">
                    <h2 className=' font-bold text-2xl py-2'>Your passwords</h2>

                    {allPass.length === 0 && <div className=' text-red-600 text-2xl font-bold'>No passwords</div>}
                    {allPass.length != 0 &&
                        <table className="table-auto w-full bg-blue-100">
                            <thead className=''>
                                <tr className=' bg-blue-700 text-white'>
                                    <th>Website</th>
                                    <th>Username</th>
                                    <th>Password</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                {allPass.map((val, i) => {

                                    return (<tr key={i} className='' >


                                        <td className=' text-center'><a href={val.site} target='_blank'>{val.site}</a></td>
                                        <td className=' text-center'>{val.username}</td>
                                        <td className=' text-center'><span>{"*".repeat(val.password.length)}</span></td>
                                        <td className=' flex justify-around '>
                                            <span><MdDelete className=' cursor-pointer mt-1' onClick={() => { handleDelete(val.id) }} /></span>
                                            <span><FaEdit className=' cursor-pointer mt-1' onClick={() => { handleEdit(val.id) }} /></span>
                                            <span>
                                                <FaCopy className=' cursor-pointer mt-1' onClick={() => { copyText(val.password) }} />
                                            </span>
                                        </td>
                                    </tr>
                                    )
                                })
                                }
                            </tbody>

                        </table>
                    }
                </div>
            </div >
        </>
    )
}

export default Manager
