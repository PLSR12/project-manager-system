import { FieldError } from "react-hook-form";

interface SelectProps {
	label: string;
	options: { value: string; label: string }[];
	error?: FieldError;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = ({
	label,
	options,
	error,
	value,
	onChange,
}) => {
	return (
		<>
			{label ? (
				<div>
					<label className="block text-sm font-medium text-gray-700">
						{label}
					</label>
					<select
						value={value}
						onChange={onChange}
						className={`w-full p-2 border rounded-md ${
							error ? "border-red-500" : "border-gray-300"
						}`}
					>
						<option value="">Selecione uma opção</option>
						{options.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
					{error && <p className="text-red-500 text-sm">{error.message}</p>}
				</div>
			) : (
				<select
					onChange={onChange}
					value={value}
					className={`w-full p-2 border rounded-md ${
						error ? "border-red-500" : "border-gray-300"
					}`}
				>
					<option value="">Selecione uma opção</option>
					{options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
			)}
		</>
	);
};

export default Select;
