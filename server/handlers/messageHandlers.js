const { nanoid } = require('nanoid')
// настраиваем БД
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
// БД хранится в директории "db"
const adapter = new FileSync('db/messages.json')
const db = low(adapter)

// записываем в БД начальные данные
db.defaults({
	messages: [
		{
			messageId: '1',
			userId: '1',
			senderName: 'Lupa',
			messageText: 'Have you started the test task?',
			createdAt: '2021-07-28'
		},
		{
			messageId: '2',
			userId: '2',
			senderName: 'Pupa',
			messageText: 'Yeap, almost finished!',
			createdAt: '2021-07-28'
    	}
  	]
}).write()

module.exports = (io, socket) => {
	// обрабатываем запрос на получение сообщений
	const getMessages = () => {
		// получаем сообщения из БД
		const messages = db.get('messages').value()
		// передаем сообщения пользователям, находящимся в комнате
		io.in(socket.roomId).emit('messages', messages)
	}

	// обрабатываем добавление сообщения
	// функция принимает объект сообщения
	const addMessage = (message) => {
		db.get('messages')
		  .push({
			// генерируем идентификатор с помощью nanoid, 9 - длина id
 			messageId: nanoid(9),
			createdAt: new Date(),
			...message
		})
		  .write()

		// выполняем запрос на получение сообщений
		getMessages()
	}

	// обрабатываем удаление сообщение
	const removeMessage = (messageId) => {
 		db.get('messages').remove({ messageId }).write()

		getMessages()
	}

	// регистрируем обработчики
	socket.on('message:get', getMessages)
	socket.on('message:add', addMessage)
	socket.on('message:remove', removeMessage)
}