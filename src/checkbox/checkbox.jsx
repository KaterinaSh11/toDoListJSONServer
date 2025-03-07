import styles from './checkbox.module.css';

export const Checkbox = ({isChecked, onChange}) => {
	return (
		<label className="checkbox-wrapper">
			<input
				type="checkbox"
				className="checkbox-element"
				checked={isChecked}
				onChange={() => onChange(!isChecked)}
			/>
		</label>
	);
};
