import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);

    const username = "looper";

    useEffect(() => {
        
        fetch(`https://playground.4geeks.com/todo/users/${username}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resp => {
                console.log("User created.", resp.ok);
                console.log("Status: ", resp.status);

            })
            .catch(error => console.log("Error creating user", error));

        // Trae lista de tareas de la API
        bringTodo()

    }, []);

    // Metodo GET para traer lista de tareas.
    const bringTodo = async () => {
        return fetch(`https://playground.4geeks.com/todo/users/${username}`)
            .then(resp => {
                console.log("Traer tareas: ", resp.ok);
                console.log("Status: ", resp.status)
                return resp.json();
            })
            .then(data => {
                console.log("Tareas cargadas: ", data.todos)
                setTodos(data.todos);
            })
            .catch(error => console.log("Error al cargar tareas: ", error));
    };

    // Metodo POST para Agrega tarea.
    const addTask = async () => {
        await fetch("https://playground.4geeks.com/todo/todos/moisesfspt120", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                label: task
            })
        })
            .then(() => {
                traerTodo()
            }).then(resp => {
                console.log("tarea agregada: ", resp.ok);
                console.log("Status: ", resp.status);
                return resp.json();
            })
            .then(data => {
                setTodos(data.todos);
                setTask("");
            })
            .catch(console.log("Error al agregar tarea:"));
    }

    // Metodo DELETE para eliminar tarea.
    const removeTask = async (id) => {
        await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            method: "DELETE"
        })
            .then(resp => {
                console.log(`Eliminar tarea ${id}:`, resp.ok)
                console.log("Status:", resp.status);
                return resp.json();
            })
            .catch(error => console.error(`Error al eliminar tarea ${id}:`, error));
    };

	return (
		<div className="container">
			<h1>TODO LIST</h1>
			<ul>
				<li><input type="text"
					onChange={(e) => setInputValue(e.target.value)}
					value={inputValue}
					onKeyDown={(e) => {
						if (e.key === "Enter" && task.trim() !== "") {
							setTodos(todos.concat([inputValue]));
							setInputValue("");
                            addTask()
						}

					}}
					placeholder="What needs to be done?" /></li>

				{todos.map((item, index) => (
					<li className="todos">
						{item} <i class="fa-solid fa-trash trashButton" onClick={async () => {
                await removeTask(item.id);  
                bringTodo()}}></i>
					</li>
				))}
			</ul>
			<div>{todos.length} tasks</div>
		</div>
	);
};


export default Home;