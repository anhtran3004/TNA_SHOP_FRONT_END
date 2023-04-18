type CheckboxType = {
	type?: string;
	label: string;
	name: string;
	onChange?: (name: string, checked: boolean) => void;
}

const Checkbox = ({ type = '', label, name, onChange }: CheckboxType) => {
	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (onChange) {
			onChange(name, event.target.checked);
		}
	};
	return<>
	<label htmlFor={label + '-' + name} className={`checkbox ${type ? 'checkbox--' + type : ''}`}>
		<input name={name} onChange={handleCheckboxChange} type="checkbox" id={label + '-' + name}/>
		<span className="checkbox__check"></span>
		<p>{label}</p>
	</label>
	</>
};
  
export default Checkbox;