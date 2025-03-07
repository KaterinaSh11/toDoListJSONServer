import styles from './list.module.css';
import { AiTwotoneEdit } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Checkbox } from '../checkbox/checkbox';
import PropTypes from 'prop-types';

export const ListLayout = ({ deleteToDo, changeToDo, selectTitle, isLoading, tasks }) => {
	return (
		<>
			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				tasks.map(({ id, title, completed }) => (
					<div className={styles.task} key={id}>
						<span>
							{id}) {title}
						</span>
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
		</>
	);
};

ListLayout.propTypes = {
	deleteToDo: PropTypes.func.isRequired,
	changeToDo: PropTypes.func.isRequired,
	selectTitle: PropTypes.func.isRequired,
	isLoading: PropTypes.bool,
	tasks: PropTypes.array,
};
