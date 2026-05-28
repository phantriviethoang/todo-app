import { useEffect, useState } from "react";

export default function Todos() {
	const [todos, setTodos] = useState([]);
	const [formData, setFormData] = useState({
		title: "",
		completed: null,
	});

	const [errors, setErrors] = useState({});

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

		// validation fail
		if (!res.ok) {
			setErrors(data.errors);
			return;
		}

		setTodos([data, ...todos]);

		// clear errors
		setErrors({});

		// clear input after submit
		setFormData({
			title: "",
			completed: false,
		});
	}

async function toggle(id) {
	const todo = todos.find((t) => t.id === id);

	const res = await fetch(`/api/todos/${id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify({
			completed: !todo.completed,
		}),
	});

	if (!res.ok) return;

	const updated = await res.json();

	setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
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

				<div>
					<div className="flex items-center space-x-2 mx-6">
						<input
							type="text"
							className="input mb-5 py-8 flex-1 w-full focus:outline-none"
							placeholder="eg: football"
							onChange={(e) => {
								setFormData({
									...formData,
									title: e.target.value,
								});
							}}
							value={formData.title}
						/>
						<button className="btn btn-secondary mb-5">
							Add new todo
						</button>
					</div>

					<div className="mx-6">
						{errors.title && (
							<p className="text-error">{errors.title[0]}</p>
						)}
					</div>
				</div>
			</form>

			<div className="justify-center flex flex-col space-y-10 text-xl mt-3 pt-2 border-t border-white/25">
				{todos.map((todo) => (
					<div
						key={todo.id}
						className="flex items-center justify-between border py-1 px-2 border-gray-700 rounded"
					>
						<div
							className={`flex-1 ${todo.completed ? "line-through" : ""}`}
						>
							{todo.title}
						</div>

						<div>
							<button
								onClick={() => toggle(todo.id)}
								className={`btn btn-neutral btn-sm ${
									todo.completed ? "bg-zinc-500" : ""
								}`}
							>
								{todo.completed ? "completed" : "not completed"}
							</button>
						</div>

						<div>
							<button className="text-sm ml-3 btn btn-error text-white btn-sm">
								Delete
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
