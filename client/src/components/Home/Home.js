import {useState, useRef} from 'react'
import {Link} from 'react-router-dom'
import {useLocalStorage} from 'hooks'
import {Form, Button} from 'react-bootstrap'
import styled from 'styled-components'

export function Home() {
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
        <Form className='mt-5'
              style={{maxWidth: '320px', margin: '0 auto'}}
              onSubmit={handleSubmit}
        >
            <Form.Group>
                <Form.Label>Name:</Form.Label>
                <Form.Control placeholder='Your name' value={userName} onChange={handleChangeName} />  
            </Form.Group>
            {userName && (
                <CustomButton variant='succes'
                        as={Link}
                        to={`/${roomId}`}
                        ref={linkRef}
                >
                    Join
                </CustomButton>
            )}
        </Form>
    )   
}

const CustomButton = styled(Button)`
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