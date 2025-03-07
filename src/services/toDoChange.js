export const requestChangeToDo = (title, isCompleted, id) =>
	fetch(`http://localhost:3005/toDo/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			title: title,
			completed: isCompleted,
		}),
	})
		.then((rawResponse) => rawResponse.json())
