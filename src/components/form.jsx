import { FormLayout } from './formLayout';
import PropTypes from 'prop-types';
import { requestAddToDo } from '../services/toDoAdd';
import { requestChangeToDo } from '../services/toDoChange';

export const Form = ({
	error,
	title,
	isSorted,
	refreshToDo,
	setRefreshToDo,
	setTitle,
	setError,
	setChangeById,
	changeById,
	tasks,
	sortByTitle,
}) => {
	const addToDo = (event) => {
		event.preventDefault();
		if (title.length < 1) {
			setError('Укажите задачу');
			return;
		} else {
			setError('');
		}

		requestAddToDo(title, false).then((response) => {
			console.log('дело добавлено, ответ сервера:', response);
			setRefreshToDo(!refreshToDo);
			setTitle('');
		});
	};

	const replaceTitle = () => {
		const task = tasks.filter((item) => item.id === changeById).shift();
		requestChangeToDo(title, task.completed, task.id).then((response) => {
			console.log('Задача изменена, ответ сервера: ', response);
			setTitle(response.title);
			setRefreshToDo(!refreshToDo);
			setError('');
			setChangeById(0);
			setTitle('');
		});
	};

	const cancel = () => {
		setChangeById(0);
		setTitle('');
	};

	return (
		<FormLayout
			error={error}
			addToDo={addToDo}
			isSorted={isSorted}
			replaceTitle={replaceTitle}
			cancel={cancel}
			title={title}
			setTitle={setTitle}
			changeById={changeById}
			sortByTitle={sortByTitle}
		/>
	);
};

Form.propTypes = {
	error: PropTypes.string,
	title: PropTypes.string,
	setTitle: PropTypes.func.isRequired,
	isSorted: PropTypes.bool,
	refreshToDo: PropTypes.bool,
	setRefreshToDo: PropTypes.func.isRequired,
	setError: PropTypes.func.isRequired,
	setChangeById: PropTypes.func.isRequired,
	changeById: PropTypes.number,
	tasks: PropTypes.array,
	sortByTitle: PropTypes.func.isRequired,
};

