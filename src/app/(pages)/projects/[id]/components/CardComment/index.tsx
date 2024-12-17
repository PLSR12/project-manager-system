import { IComment } from "@/src/app/api/projects/types";
import dayjs from "dayjs";

const CardComment = ({ comment, key }: { comment: IComment; key: string }) => {
	return (
		<li
			key={key}
			className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200"
		>
			<p className="text-gray-800">{comment.text}</p>
			<small className="text-gray-500">
				Por {comment.author} em {dayjs(comment.date).format("DD/MM/YYYY")}
			</small>
		</li>
	);
};

export default CardComment;
