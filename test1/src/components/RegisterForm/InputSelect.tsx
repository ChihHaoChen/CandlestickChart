
interface DropdownProps {
  value: string;
  onChangeValue(value: string): void;
  options: string[];
}


const InputSelect = (props: DropdownProps) => {
  const { value, options, onChangeValue } = props;

  return (
    <div>
      <select value={value} onChange={(e) => onChangeValue(e.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default InputSelect
