"use client"
import { useEffect, useState } from 'react'
import axios from 'axios'
import { IoIosAdd as AddIcon } from "react-icons/io"
import { fields, fullFields, API_URL } from '@/constants'
import FormModal from '@/components/form-modal'
import { AnimatePresence } from 'framer-motion'



export default function Home() {
    const [clients, setClients] = useState([])
    const [formIsActive, setFormIsActive] = useState(false)


    useEffect(() => {
        (async () => {
            const response = await axios.get(API_URL)
            const { clients } = response.data
            setClients(clients)
        })()
    }, [])


    async function handleUpdate(e) {
        const form = e.currentTarget.parentElement;

        const dataWithId = Object.fromEntries(new FormData(form))
        const { id, ...data } = dataWithId

        console.log(dataWithId);
        const response = await axios(API_URL, {
            method: "PUT",
            data,
            headers: {
                "Content-Type": "application/json",
                "x-client-id": id
            }
        })

        console.log(response);
    }


    async function handleDelete(id) {
        await axios(API_URL, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "x-client-id": id
            }
        })

        const newClients = clients.filter(client => client._id !== id)
        setClients(newClients)
    }

    return (
        <main className='main'>

            <AnimatePresence>
                {formIsActive && <FormModal setFormIsActive={setFormIsActive} setClients={setClients} />}
            </AnimatePresence>

            <header className='main__header'>
                <h1 className='main__title'>Lista de clientes</h1>

                <button className='main__add' onClick={() => setFormIsActive(true)}>
                    <AddIcon className='main__add-icon'></AddIcon>
                    Añadir
                </button>
            </header>

            <div className='table'>
                <div className='table__row'>
                    {
                        fullFields.map(({ name }) => {
                            return <div className='table__column'>{name}</div>
                        })
                    }
                </div>

                {
                    clients.map(client => {
                        const clientInformation = Object.entries(client)
                        const clientWithOutId = clientInformation.filter(([key]) => key !== "_id")

                        return (
                            <form className='table__row' key={client._id} onSubmit={(e) => e.preventDefault()}>
                                {
                                    clientWithOutId.map(([key, value]) => {
                                        const { type } = fullFields.find(({ name }) => name === key)

                                        return (
                                            <input className='table__column' type={type} defaultValue={value} name={key} key={key} onBlur={handleUpdate} />
                                        )
                                    })
                                }

                                <button className='table__column--delete' onClick={() => handleDelete(client._id)}>
                                    Eliminar
                                </button>

                            </form>
                        )
                    })
                }
            </div>
        </main>
    )
}



