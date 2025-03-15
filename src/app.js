import { useEffect, useState } from 'react';
import styles from './app.module.css';
import { requestGetToDo } from './services/toDoGet';
import { ControlPanel } from './components/controlPanel/ControlPanel';
import { TodoList } from './components/todoList/TodoList';

export const App = () => {
	const [tasks, setTasks] = useState([]);
	const [error, setError] = useState('');
	const [refreshToDo, setRefreshToDo] = useState(false);
	const [isSorted, setIsSorted] = useState(false);


	useEffect(() => {

		requestGetToDo()
			.then((data) => {
				setTasks(data);
			})
	}, [refreshToDo]);

	const sortedTodos = isSorted
		? tasks.toSorted((a, b) => a.title.localeCompare(b.title))
		: tasks;

	return (
		<div className={styles.app}>
			<div className={styles.content}>
				<ControlPanel
					error={error}
					isSorted={isSorted}
					refreshToDo={refreshToDo}
					setRefreshToDo={setRefreshToDo}
					setError={setError}
					tasks={tasks}
					setTasks={setTasks}
					setIsSorted={setIsSorted}
				/>
				<TodoList
					setRefreshToDo={setRefreshToDo}
					refreshToDo={refreshToDo}
					setError={setError}
					sortedTodos={sortedTodos}
				/>
			</div>
		</div>
	);
};
