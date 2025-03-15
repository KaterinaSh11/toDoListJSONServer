import { AiTwotoneEdit } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Checkbox } from '../checkbox/Checkbox';
import styles from './TodoItem.module.css';
import PropTypes from 'prop-types';
import { IoIosSave } from 'react-icons/io';
import { MdCancelPresentation } from 'react-icons/md';
import { requestChangeToDo } from '../../services/toDoChange';

export const TodoItem = ({
	id,
	title,
	completed,
	deleteToDo,
	changeToDo,
	setRefreshToDo,
	refreshToDo,
	setChangeById,
	changeById,
	setItemTitle,
	itemTitle,
}) => {

	const saveTodoItem = () => {
		requestChangeToDo(itemTitle, completed, id).then((response) => {
			console.log('Задача изменена, ответ сервера: ', response);
			setRefreshToDo(!refreshToDo);
			setChangeById(0);
		});
	};

	const cancel = () => {
		setChangeById(0);
		setItemTitle('');
	};

	return (
		<>
			{id !== changeById ? (
				<div className={styles.task}>
					<span>
						{title}
					</span>
					<Checkbox isChecked={completed} onChange={() => changeToDo(id)} />
					<button type="button" onClick={() => {setChangeById(id); setItemTitle(title)}}>
						<AiTwotoneEdit/>
					</button>
					<button className={styles.delete} onClick={() => deleteToDo(id)}>
						<RiDeleteBin6Line />
					</button>
				</div>
			) : (
				<div className={styles['input-group']}>
					<input
						type="text"
						value={itemTitle}
						onChange={({ target }) => setItemTitle(target.value)}
					/>
					<button type="button" onClick={() => saveTodoItem()}>
						<IoIosSave />
					</button>
					<button type="button" onClick={cancel}>
						<MdCancelPresentation />
					</button>
				</div>
			)}
		</>
	);
};

TodoItem.propTypes = {
	id: PropTypes.number,
	title: PropTypes.string,
	completed: PropTypes.bool,
	deleteToDo: PropTypes.func.isRequired,
	changeToDo: PropTypes.func.isRequired,
	setRefreshToDo: PropTypes.func.isRequired,
	refreshToDo: PropTypes.bool,
	setChangeById: PropTypes.func.isRequired,
	changeById: PropTypes.bool,
	setItemTitle: PropTypes.func.isRequired,
	itemTitle: PropTypes.string,
};
