import { useEffect, useState } from "react";

export default function Todos() {
	const [todos, setTodos] = useState([]);
	const [formData, setFormData] = useState({
		title: "",
		completed: false,
	});

	async function getTodos() {
		const res = await fetch("/api/todos");

		const data = await res.json();

		setTodos(data);
	}

	useEffect(() => {
		getTodos();
	}, []);

	async function add(e) {
		e.preventDefault();

		const res = await fetch("/api/todos", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(formData),
		});

		const data = await res.json();

		setTodos([data, ...todos]);

        // clear input after submit
		setFormData({
			title: "",
			completed: false,
		});
	}

	return (
		<div className="w-full">
			<h1 className="text-4xl mb-5 text-gray-300">All Todos</h1>

			<form
				onSubmit={add}
				className="items-center justify-center w-full gap-3"
			>
				<label
					htmlFor="title"
					className="mb-5 text-xl block"
				>
					Title
				</label>

				<div className="flex items-center space-x-2 mx-6 border-b border-white/25">
					<input
						type="text"
						className="input mb-5 py-8 flex-1 w-full focus:outline-none"
						placeholder="eg: football"
						onChange={(e) => {
							setFormData({ ...formData, title: e.target.value });
						}}
						value={formData.title}
					/>
					<button className="btn btn-secondary mb-5">
						Add new todo
					</button>
				</div>
			</form>

			<div className="justify-center flex flex-col space-y-10 text-xl mt-3">
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
