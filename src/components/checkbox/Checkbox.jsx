export const Checkbox = ({isChecked, onChange}) => {
	return (
		<label>
			<input
				type="checkbox"
				className="checkbox-element"
				checked={isChecked}
				onChange={() => onChange(!isChecked)}
			/>
		</label>
	);
};
