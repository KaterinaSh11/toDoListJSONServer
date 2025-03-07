import styles from './form.module.css';
import { FiSend } from 'react-icons/fi';
import { FaSortAlphaDown } from 'react-icons/fa';
import { TbFilterCancel } from 'react-icons/tb';
import { IoIosSave } from 'react-icons/io';
import { MdCancelPresentation } from 'react-icons/md';
import PropTypes from 'prop-types';

export const FormLayout = ({
	error,
	isSorted,
	title,
	changeById,
	addToDo,
	sortByTitle,
	setTitle,
	replaceTitle,
	cancel,
}) => {
	return (
		<>
			<form onSubmit={addToDo}>
				<button
					className={styles['btn-sort']}
					type="button"
					onClick={() => sortByTitle(!isSorted)}
				>
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
				{changeById ? (
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
		</>
	);
};

FormLayout.propTypes = {
	error: PropTypes.string,
	isSorted: PropTypes.bool,
	title: PropTypes.string,
	isChangeById: PropTypes.bool, // Был number, но используется как boolean
	sortByTitle: PropTypes.func.isRequired,
	setTitle: PropTypes.func.isRequired,
	addToDo: PropTypes.func.isRequired,
	replaceTitle: PropTypes.func.isRequired,
	cancel: PropTypes.func.isRequired,
};
