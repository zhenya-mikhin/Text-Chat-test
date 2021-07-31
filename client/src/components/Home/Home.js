import {useState, useRef} from 'react'
import {Link} from 'react-router-dom'
import {useLocalStorage} from 'hooks'
import styled from 'styled-components'

export const Home = () => {
    // создаем и записываем в локальное хранилище имя пользователя
    // или извлекаем его из хранилища
    const [userName, setUserName] = useLocalStorage(`userName`)

    // локальное состояние для комнаты
    // setRoomId убрал, что бы консоль не ругалась
    const [roomId] = useState(`free`)
    const linkRef = useRef(null)

    // обрабатываем изменение имени пользователя
    const handleChangeName = (e) => {
        setUserName(e.target.value)
    }

    // имитируем отправку формы
    const handleSubmit = (e) => {
        e.preventDefault()
        linkRef.current.click()
	 }

	return (
		<form className='mt-5 text-center' onSubmit={handleSubmit}>
			<div>
				<label for={userName} >Name:</label>
				<input id={userName} placeholder='Your name' value={userName} onChange={handleChangeName} />  
			</div>
			{userName && (
				<CustomButton className='mx-auto' to={`/${roomId}`} ref={linkRef}>
					Join
				</CustomButton>
			)}
		</form>
	)   
}



const CustomButton = styled(Link)`
	display: block;

	margin-top: 1em;
	width: 80px;
	height: 35px;
	border-radius: 5px;
	background-color: green;

	text-align: center;
	padding: 5px 0;
	color: white;
	text-decoration: none;
`