export const requestDeleteToDo = (id) =>
	fetch(`http://localhost:3005/toDo/${id}`, {
		method: 'DELETE',
	})
		.then((rawResponse) => rawResponse.json())
