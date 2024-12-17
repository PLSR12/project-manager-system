import { FieldError } from "react-hook-form";

interface InputProps {
	label?: string;
	error?: FieldError;
	type: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
}

const Input: React.FC<InputProps> = ({
	label,
	type,
	error,
	value,
	onChange,
	placeholder,
}) => {
	return (
		<div>
			{label && (
				<label
					htmlFor={label}
					className="block text-sm font-medium text-gray-700"
				>
					{label}
				</label>
			)}
			<input
				placeholder={placeholder}
				id={label}
				type={type}
				value={value}
				onChange={onChange}
				className={`w-full p-2 border rounded-md ${
					error ? "border-red-500" : "border-gray-300"
				}`}
			/>
			{error && <p className="text-red-500 text-sm">{error.message}</p>}
		</div>
	);
};

export default Input;
