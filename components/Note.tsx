interface props {
	id: string;
	title: string;
	text: string;
}

export default function Note({ id, title, text }: props) {
	return (
		<div className="border border-gray-300 rounded-lg h-[100px] overflow-hidden flex flex-col justify-center p-[20px] text-gray-600 cursor-pointer transition-shadow hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
			{title || text ? (
				<>
					<h1 className={`${!title ? "hidden" : ""} font-semibold text-xl`}>{title}</h1>
					<p
						className={`h-max overflow-hidden whitespace-nowrap text-ellipsis ${
							!text ? "hidden" : ""
						}`}
					>
						{text}
					</p>
				</>
			) : (
				<h1>Empty Note</h1>
			)}
		</div>
	);
}
