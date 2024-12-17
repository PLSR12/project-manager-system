import { FieldError } from "react-hook-form";

interface InputProps {
	label?: string;
	error?: FieldError;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	placeholder?: string;
}

const TextArea: React.FC<InputProps> = ({
	label,
	error,
	value,
	placeholder,
	onChange,
}) => {
	return (
		<>
			{label ? (
				<div>
					<label className="block text-sm font-medium text-gray-700">
						{label}
					</label>
					<textarea
						onChange={onChange}
						value={value}
						className={`w-full p-2 border rounded-md ${
							error ? "border-red-500" : "border-gray-300"
						}`}
					/>
					{error && <p className="text-red-500 text-sm">{error.message}</p>}
				</div>
			) : (
				<>
					<textarea
						placeholder={placeholder}
						onChange={onChange}
						value={value}
						className={`w-full p-2 border rounded-md ${
							error ? "border-red-500" : "border-gray-300"
						}`}
					/>
					{error && <p className="text-red-500 text-sm">{error.message}</p>}
				</>
			)}
		</>
	);
};

export default TextArea;
