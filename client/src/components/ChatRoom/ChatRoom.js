import {useState} from 'react'
import {useParams} from 'react-router-dom'
import {useLocalStorage, useChat} from 'hooks'

import {MessageForm} from './MessageForm'
import {MessageList} from './MessageList'
import {UserList} from './UserList'

import {Container, Button} from 'react-bootstrap'
import {RiExternalLinkFill} from 'react-icons/ri'

export function ChatRoom() {
    const {roomId} = useParams()
    const [userName] = useLocalStorage('userName')
    const {users, messages, sendMessage, removeMessage} = useChat(roomId)
    const [copySuccess, setCopySuccess] = useState('')

    const copyLinkToClipboard = () => {
        navigator.clipboard.writeText(roomId)
        setCopySuccess('RoomId copied!')
    }
    const deleteRow = () => {
        setCopySuccess('')
    }

    return (
        <Container style={{maxWidth: '512px', minWidth: '320px'}}>
            <h2 className='text-center'>
                Room: {roomId === 'job' ? 'Job' : 'Free'}
            </h2>
            <Button variant='primary' onClick={copyLinkToClipboard}>
                    Copy link to Room
                    <RiExternalLinkFill />
            </Button>
            {copySuccess && <Button
                                variant='link'
                                onClick={deleteRow}
                                >
                                {copySuccess}
                            </Button>}
            <UserList users={users} />
            <MessageList messages={messages} removeMessage={removeMessage} />
            <MessageForm userName={userName} sendMessage={sendMessage} />
        </Container>
    )
}