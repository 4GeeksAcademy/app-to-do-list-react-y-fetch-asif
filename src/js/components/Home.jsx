
import React, { useState, useEffect } from "react";



import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([]);

    const username = "looper";

    useEffect(() => {



        // Trae lista de tareas de la API
        bringTodo()

    }, []);

    // Metodo GET para traer lista de tareas.
    const bringTodo = async () => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        try {
            const response = await fetch("https://playground.4geeks.com/todo/users/looper", requestOptions);
            const result = await response.json();
            setTodos(result.todos)
        } catch (error) {
            console.error(error);
        };
    };

    // Metodo POST para Agrega tarea.
    const addTask = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "label": inputValue,
            "is_done": false
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        try {
            const response = await fetch("https://playground.4geeks.com/todo/todos/looper", requestOptions);
            const result = await response.json();
            console.log(result)
            bringTodo()
        } catch (error) {
            console.error(error);
        };
    }

    // Metodo DELETE para eliminar tarea.
    const removeTask = async (id) => {
        const requestOptions = {
            method: "DELETE",
            redirect: "follow"
        };
        id=id.toString()
        console.log(id);
        
        try {
            const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, requestOptions);
            const result = await response.json();
            console.log(id)
            bringTodo()
        } catch (error) {
            console.error(error);
           
        };

    };

    return (
        <div className="container">
            <h1>TODO LIST</h1>
            <ul>
                <li><input type="text"
                    onChange={(e) => setInputValue(e.target.value)}
                    value={inputValue}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && inputValue.trim() !== "") {
                            setTodos(todos.concat([inputValue]));
                            addTask()
                            setInputValue("");

                        }

                    }}
                    placeholder="What needs to be done?" /></li>

                {todos.map((item, index) => (
                    <li key={index} className="todos">
                        {item.label} <i className="fa-solid fa-trash trashButton" onClick={ () => {removeTask(item.id);

                        }}></i>
                    </li>
                ))}
            </ul>
            <div>{todos.length} tasks</div>
        </div>
    );
};


export default Home;