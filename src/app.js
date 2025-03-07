import { useEffect, useState } from 'react';
import styles from './app.module.css';
import { Checkbox } from './checkbox/checkbox';
import { requestDeleteToDo } from './services/toDoDelete';
import { requestAddToDo } from './services/toDoAdd';
import { requestGetToDo } from './services/toDoGet';
import { requestChangeToDo } from './services/toDoChange';
import { AiTwotoneEdit } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FiSend } from 'react-icons/fi';
import { FaSortAlphaDown } from 'react-icons/fa';
import { TbFilterCancel } from 'react-icons/tb';
import { IoIosSave } from 'react-icons/io';
import { MdCancelPresentation } from 'react-icons/md';

export const App = () => {
	const [tasks, setTasks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [title, setTitle] = useState('');
	const [error, setError] = useState('');
	const [refreshToDo, setRefreshToDo] = useState(false);
	const [isSorted, setIsSorted] = useState(false);
	const [isChangeById, setIsChangeById] = useState(0);

	useEffect(() => {
		setIsLoading(true);

		requestGetToDo()
			.then((data) => {
				setTasks(data);
				if (isSorted) {
					sortByTitle(isSorted);
				}
			})
			.finally(() => setIsLoading(false));
	}, [refreshToDo]);

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
		setIsChangeById(id);
		const task = tasks.filter((item) => item.id === id).shift();
		setTitle(task.title);
	};

	const replaceTitle = () => {
		const task = tasks.filter((item) => item.id === isChangeById).shift();
		requestChangeToDo(title, task.completed, task.id).then((response) => {
			console.log('Задача изменена, ответ сервера: ', response);
			setTitle(response.title);
			setRefreshToDo(!refreshToDo);
			setError('');
			setIsChangeById(0);
			setTitle('');
		});
	};

	const sortByTitle = (sorting) => {
		if (sorting) {
			setTasks((prevTasks) =>
				[...prevTasks].sort((a, b) => {
					if (a.title < b.title) {
						return -1;
					}
					if (a.title > b.title) {
						return 1;
					}
					return 0;
				}),
			);
		} else {
			setRefreshToDo(!refreshToDo);
		}
		setIsSorted(sorting);
	};

	const cancel = () => {
		setIsChangeById(0);
		setTitle('');
	};

	return (
		<div className={styles.app}>
			<form onSubmit={addToDo}>
				<button className={styles['btn-sort']} type="button" onClick={() => sortByTitle(!isSorted)}>
					{isSorted ? <TbFilterCancel /> : <FaSortAlphaDown />}
				</button>
				<input
					type="text"
					placeholder="напишите задачу"
					value={title}
					onChange={({ target }) => setTitle(target.value)}
				/>
				<button type="submit">
					<FiSend />
				</button>
				{isChangeById ? (
					<div className={styles.inline}>
						<button type="button" onClick={() => replaceTitle()}>
							<IoIosSave />
						</button>
						<button type="button" onClick={() => cancel()}>
							<MdCancelPresentation />
						</button>
					</div>
				) : (
					''
				)}
			</form>
			{error !== '' && <div className={styles.error}>{error}</div>}
			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				tasks.map(({ id, title, completed }) => (
					<div className={styles.task} key={id}>
						<span>{id}) {title} - {completed}</span>
						<Checkbox isChecked={completed} onChange={() => changeToDo(id)} />
						<button type="button" onClick={() => selectTitle(id)}>
							<AiTwotoneEdit />
						</button>
						<button className={styles.delete} onClick={() => deleteToDo(id)}>
							<RiDeleteBin6Line />
						</button>
					</div>
				))
			)}
		</div>
	);
};
