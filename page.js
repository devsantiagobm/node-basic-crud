"use client"
import Image from 'next/image'
import styles from './page.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Home() {
  const [clients, setClients] = useState([])


  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8000/clients")
      const information = await response.json()
      setClients(information.clients)
    })()
  }, [])


  async function handleSubmit(e) {
    e.preventDefault()

    const data = Object.fromEntries(new FormData(e.currentTarget))

    const response = await axios("http://localhost:8000/clients", {
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/json"
      }
    })

    const clients = await fetch("http://localhost:8000/clients")
    const information = await clients.json()
    setClients(information.clients)
  }

  async function handleUpdate(e) {
    const form = e.currentTarget.parentElement;

    const dataWithId = Object.fromEntries(new FormData(form))
    const { id, ...data } = dataWithId

    const response = await axios("http://localhost:8000/clients", {
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
    const response = await axios("http://localhost:8000/clients", {
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
    <main className={styles.main}>

      <div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(9, 50px)" }}>
          <span>Cedula</span>
          <span>Nombre</span>
          <span>Apellidos</span>
          <span>Edad</span>
          <span>Sexo</span>
          <span>Direccion</span>
          <span>Telefono</span>
          <span>id</span>
          <span>Eliminar</span>
        </div>

        {
          clients.map(({ _id, cedula, nombre, apellidos, edad, sexo, direccion, telefono }) => {

            return (
              <form key={_id} style={{ display: "grid", gridTemplateColumns: "repeat(9, 50px)" }}>
                <input defaultValue={cedula} onBlur={handleUpdate} name={"cedula"}></input >
                <input defaultValue={nombre} onBlur={handleUpdate} name={"nombre"}></input >
                <input defaultValue={apellidos} onBlur={handleUpdate} name={"apellidos"}></input >
                <input defaultValue={edad} onBlur={handleUpdate} name={"edad"}></input >
                <input defaultValue={sexo} onBlur={handleUpdate} name={"sexo"}></input >
                <input defaultValue={direccion} onBlur={handleUpdate} name={"direccion"}></input >
                <input defaultValue={telefono} onBlur={handleUpdate} name={"telefono"}></input >
                <input defaultValue={_id} name={"id"}></input >
                <button type='button' onClick={() => handleDelete(_id)}>Eliminar</button>
              </form>)
          })
        }

        <h1>Nuevo cliente</h1>

        <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit}>
          <input type="text" placeholder="cedula" name="cedula" />
          <input type="text" placeholder="nombre" name="nombre" />
          <input type="text" placeholder="apellidos" name="apellidos" />
          <input type="text" placeholder="edad" name="edad" />
          <input type="text" placeholder="sexo" name="sexo" />
          <input type="text" placeholder="direccion" name="direccion" />
          <input type="text" placeholder="telefono" name="telefono" />
          <input type="submit" value="enviar" />
        </form>

      </div>
    </main>
  )
}
