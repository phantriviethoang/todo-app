import { useEffect, useState } from "react";

export default function Todos() {
	const [todos, setTodos] = useState([]);

	async function getTodos() {
		const res = await fetch("/api/todos");

		const data = await res.json();

		setTodos(data);
	}

	useEffect(() => {
		getTodos();
	}, []);

	return (
		<div className="w-full">
			<h1 className="text-4xl mb-5 text-gray-300">All Todos</h1>

			<form className="flex items-center justify-center w-full gap-3">
				<input
					type="text"
					className="input mb-5 py-8 flex-1 focus:outline-none"
					placeholder="eg: football"
				/>
				<button className="btn btn-secondary mb-5">Add new todo</button>
			</form>

			<div className="justify-center flex flex-col space-y-10 text-xl">
				{todos.map((todo) => (
					<div
						key={todo.id}
						className="flex items-center justify-between border py-1 px-2 border-gray-700 rounded"
					>
						<div className="flex-1">{todo.title}</div>
						<div>
							{todo.completed ? (
								<button className="btn">completed</button>
							) : (
								<button className="btn btn-soft">
									uncompleted
								</button>
							)}
						</div>

						<div>
							<button className="text-sm ml-3 btn btn-error text-white">
								Delete
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
