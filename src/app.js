import { useEffect, useState } from 'react';
import styles from './app.module.css';
import { requestGetToDo } from './services/toDoGet';
import { Form } from './components/form';
import { List } from './components/list';

export const App = () => {
	const [tasks, setTasks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [title, setTitle] = useState('');
	const [error, setError] = useState('');
	const [refreshToDo, setRefreshToDo] = useState(false);
	const [isSorted, setIsSorted] = useState(false);
	const [changeById, setChangeById] = useState(0);

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

	return (
		<div className={styles.app}>
			<Form
				error={error}
				isSorted={isSorted}
				title={title}
				refreshToDo={refreshToDo}
				setRefreshToDo={setRefreshToDo}
				setTitle={setTitle}
				setError={setError}
				setChangeById={setChangeById}
				changeById={changeById}
				tasks={tasks}
				sortByTitle={sortByTitle}
			/>
			<List
				isLoading={isLoading}
				tasks={tasks}
				setRefreshToDo={setRefreshToDo}
				refreshToDo={refreshToDo}
				setError={setError}
				setChangeById={setChangeById}
				setTitle={setTitle}
			/>
		</div>
	);
};
