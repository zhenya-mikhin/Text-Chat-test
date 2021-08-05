import {useEffect} from 'react'

// Xук «useBeforeUnload()» используется для вывода сообщения
// или выполнения функции в момент перезагрузки или закрытия страницы
// Принимает один параметр — примитив или функцию
export const useBeforeUnload = (value) => {
	const handleBeforeUnload = (e) => {
		let returnValue

		(typeof value === 'function') ? returnValue = value(e) : returnValue = value

		if (returnValue) {
			e.preventDefault()
			e.returnValue = returnValue
		}

		return returnValue
	}

	useEffect(() => {
		window.addEventListener('beforeunload', handleBeforeUnload)
		return () => window.removeEventListener('beforeunload', handleBeforeUnload)
	},)
}