import { requestAddToDo } from '../../services/toDoAdd';
import { useState } from 'react';
import styles from './ControlPanel.module.css';
import { FaSortAlphaDown } from 'react-icons/fa';
import { TbFilterCancel } from 'react-icons/tb';
import PropTypes from 'prop-types';
import { RiAddBoxLine } from "react-icons/ri";

export const ControlPanel = ({
	error,
	isSorted,
	setIsSorted,
	refreshToDo,
	setRefreshToDo,
	setError,
	tasks,
	setTasks,
}) => {
	const [searchStr, setSearchStr] = useState('');
	const [isSearch, setIsSearch] = useState(false);
	const [taskBackup, setTaskBackup] = useState('');
	const [title, setTitle] = useState('');

	const addTodo = (event) => {
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

	function searchTodo(query) {
		setIsSearch(!isSearch);
    if (!isSearch) {
        setTaskBackup(tasks);
        if (query.trim() === "") {
            return setTasks(tasks);
        }
        return setTasks(tasks.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase())));
    } else {
        setTasks(taskBackup);
        setRefreshToDo(!refreshToDo);
				setIsSearch(false);
    }
	}

	return (
		<>
			<form onSubmit={addTodo}>
				<div className={styles['input-group']}>
					<input
						type="text"
						placeholder="Добавить новую задачу"
						value={title}
						onChange={({ target }) => setTitle(target.value)}
					/>
					<button type="submit">
						<RiAddBoxLine/> Добавить
					</button>
				</div>
				<div className={styles['input-group']}>
					<input
						type="text"
						placeholder="поиск..."
						onChange={({ target }) => setSearchStr(target.value)}/>
					<button
						type="button"
						onClick={() => searchTodo(searchStr)}>
						{!isSearch ? 'Найти' : 'Отменить'}
					</button>
				</div>
				<button type="button" onClick={() => setIsSorted(!isSorted)}>
					{isSorted ? (
						<>
							<TbFilterCancel /> Отменить
						</>
					) : (
						<>
							<FaSortAlphaDown /> Сортировать
						</>
					)}
				</button>
			</form>
			{error !== '' && <div className={styles.error}>{error}</div>}
		</>
	);
};

ControlPanel.propTypes = {
	error: PropTypes.string,
	setError: PropTypes.func.isRequired,
	isSorted: PropTypes.bool,
	setIsSorted: PropTypes.func.isRequired,
	refreshToDo: PropTypes.bool,
	setRefreshToDo: PropTypes.func.isRequired,
	tasks: PropTypes.array,
	setTasks: PropTypes.func.isRequired,
};
