import { fullFields, API_URL } from "@/constants"
import { motion } from "framer-motion"
import axios from "axios"

export default function FormModal({ setFormIsActive, setClients }) {

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            const data = Object.fromEntries(new FormData(e.currentTarget))
            await axios(API_URL, {
                method: "POST",
                data,
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const response = await axios.get(API_URL)
            const { clients } = response.data

            setClients(clients)
            setFormIsActive(false)

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <motion.div className="form" variants={variants} initial="initial" animate="animate" exit="initial">
            <form className="form__box" onSubmit={handleSubmit}>
                <h1 className="form__title">Crear nuevo usuario</h1>
                <div className="form__inputs">

                    {
                        fullFields.map(({ name, placeholder, type }) => {
                            return (
                                <div className="form__input-box">
                                    <label htmlFor={name} className="form__label">{name}</label>
                                    <input type={type} id={name} name={name} placeholder={placeholder} className="form__input" />
                                </div>
                            )
                        })
                    }
                </div>


                <input type="submit" value="Crear cliente" className="form__submit" />

            </form>
        </motion.div>
    )
}

const variants = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1
    }
}