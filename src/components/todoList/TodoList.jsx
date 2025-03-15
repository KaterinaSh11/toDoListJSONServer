import { requestChangeToDo } from '../../services/toDoChange';
import { requestDeleteToDo } from '../../services/toDoDelete';
import PropTypes from 'prop-types';
import { TodoItem } from '../todoItem/TodoItem';
import { useState } from 'react';

export const TodoList = ({
	setRefreshToDo,
	refreshToDo,
	setError,
	sortedTodos,
}) => {
	const [changeById, setChangeById] = useState(0);
	const [itemTitle, setItemTitle] = useState('');

	const deleteToDo = (id) => {
		requestDeleteToDo(id).then((response) => {
			console.log('Задача удалена, ответ сервера: ', response);
			setRefreshToDo(!refreshToDo);
			setError('');
		});
	}

	const changeToDo = (id) => {
		const task = sortedTodos.filter((item) => item.id === id).shift();
		requestChangeToDo(task.title, !task.completed, task.id).then((response) => {
			console.log(`Состояние чекбокс ${!task.completed}, ответ сервера:`, response);
			setRefreshToDo(!refreshToDo);
			setError('');
		});
	};

	return (
		<>
			{sortedTodos.map(({ id, title, completed }) => (
					<TodoItem
						id={id}
						title={title}
						completed={completed}
						deleteToDo={deleteToDo}
						changeToDo={changeToDo}
						changeById={changeById}
						setChangeById={setChangeById}
						setRefreshToDo={setRefreshToDo}
						refreshToDo={refreshToDo}
						itemTitle={itemTitle}
						setItemTitle={setItemTitle}
						key={id}
					></TodoItem>
				))
			}
		</>
	);
};

TodoList.propTypes = {
	setRefreshToDo: PropTypes.func.isRequired,
	setError: PropTypes.func.isRequired,
	refreshToDo: PropTypes.bool,
	sortedTodos: PropTypes.array,
}
