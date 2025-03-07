export const requestAddToDo = (title, isCompleted) =>
	fetch('http://localhost:3005/todo', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			title: title,
			completed: isCompleted,
		}),
	}).then((rawResponse) => rawResponse.json());
