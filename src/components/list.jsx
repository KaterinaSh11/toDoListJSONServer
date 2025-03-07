import { ListLayout } from './listLayout';
import { requestChangeToDo } from '../services/toDoChange';
import { requestDeleteToDo } from '../services/toDoDelete';
import PropTypes from 'prop-types';

export const List = ({
	isLoading,
	tasks,
	setRefreshToDo,
	refreshToDo,
	setError,
	setChangeById,
	setTitle,
}) => {
	const deleteToDo = (id) =>
		requestDeleteToDo(id).then((response) => {
			console.log('Задача удалена, ответ сервера: ', response);
			setRefreshToDo(!refreshToDo);
			setError('');
		});

	const changeToDo = (id) => {
		const task = tasks.filter((item) => item.id === id).shift();
		requestChangeToDo(task.title, !task.completed, task.id).then((response) => {
			console.log(`Состояние чекбокс ${!task.completed}, ответ сервера:`, response);
			setRefreshToDo(!refreshToDo);
			setError('');
		});
	};

	const selectTitle = (id) => {
		setChangeById(id);
		const task = tasks.filter((item) => item.id === id).shift();
		setTitle(task.title);
	};

	return (
		<ListLayout
			deleteToDo={deleteToDo}
			changeToDo={changeToDo}
			selectTitle={selectTitle}
			isLoading={isLoading}
			tasks={tasks}
		/>
	);
};

List.propTypes = {
	setRefreshToDo: PropTypes.func.isRequired,
	setError: PropTypes.func.isRequired,
	setChangeById: PropTypes.func.isRequired,
	setTitle: PropTypes.func.isRequired,
	refreshToDo: PropTypes.bool,
	tasks: PropTypes.array,
	isLoading: PropTypes.bool,
};
