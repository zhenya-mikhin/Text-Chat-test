import {Accordion, Card, Button, Badge} from 'react-bootstrap'
// иконка - индикатор статуса пользователя
import {RiRadioButtonLine} from 'react-icons/ri'

export const UserList = ({users}) => {
    // преобразуем структуру в массив
    const usersArr = Object.entries(users)
    // получаем массив подмассивов

    // количество активных пользователей
    const activeUsers = Object.values(users).filter((u) => u.online).length

    return (
        <Accordion className='mt-4'>
            <Card>
                <Card.Header bg='none'>
                    <Accordion.Toggle
                        as={Button}
                        variant='info'
                        eventKey='0'
                        style={{textDecoration: 'none'}}
                    >
                        Active users{' '}
                        <Badge variant='light' className='ml-1'>
                            {activeUsers}
                        </Badge>
                    </Accordion.Toggle>
                </Card.Header>
                {usersArr.map(([userId, obj]) => (
                    <Accordion.Collapse eventKey='0' key={userId}>
                        <Card.Body>
                            <RiRadioButtonLine
                                className={`mb-1 ${
                                    obj.online ? 'text-success' : 'text-second'
                                }`}
                                size='0.8em'
                            />{' '}
                            {obj.userName}
                        </Card.Body>
                    </Accordion.Collapse>
                ))}
            </Card>
        </Accordion>
    )
}