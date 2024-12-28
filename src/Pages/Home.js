import React, { useEffect, useState } from "react";
import Parse from "parse";
import { useNavigate } from "react-router-dom";
import '../Home.css';  // Импортируйте стили

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = Parse.User.current();
    if (!currentUser) {
      // Если пользователь не авторизован, перенаправляем на страницу входа
      navigate("/");
    } else {
      setUserData({
        username: currentUser.get("username"),
        email: currentUser.get("email"),
      });
      // Загружаем todos из Parse
      loadTodos(currentUser);
    }
  }, [navigate]);

  // Загрузка ToDo из Parse
  const loadTodos = async (user) => {
    const Todo = Parse.Object.extend("Todo");
    const query = new Parse.Query(Todo);
    query.equalTo("owner", user);
    try {
      const results = await query.find();
      setTodos(results.map((todo) => ({ id: todo.id, text: todo.get("text") })));
    } catch (error) {
      console.error("Ошибка при загрузке ToDo: ", error);
    }
  };

  // Добавление нового ToDo
  const addTodo = async (e) => {
    e.preventDefault();
    if (newTodo.trim() === "") return;

    const Todo = Parse.Object.extend("Todo");
    const todo = new Todo();
    const currentUser = Parse.User.current();
    todo.set("text", newTodo);
    todo.set("owner", currentUser);

    try {
      await todo.save();
      setTodos([...todos, { id: todo.id, text: newTodo }]);
      setNewTodo("");
    } catch (error) {
      console.error("Ошибка при добавлении ToDo: ", error);
    }
  };

  // Удаление ToDo
  const removeTodo = async (id) => {
    const Todo = Parse.Object.extend("Todo");
    const query = new Parse.Query(Todo);
    try {
      const todo = await query.get(id);
      await todo.destroy();
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении ToDo: ", error);
    }
  };

  // Если пользователь еще не загружен
  if (!userData) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="home-container">
      {/* Информация о пользователе */}
      <div className="user-info">
        <p>Пользователь: {userData.username}</p>
        <p>Email: {userData.email}</p>
        <button onClick={() => Parse.User.logOut() && navigate("/")}>
          Выйти
        </button>
      </div>

      {/* ToDo list */}
      <div className="todo-container">
        <h2>ToDo List</h2>
        <form onSubmit={addTodo}>
          <input
            type="text"
            placeholder="Добавить новое дело"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button type="submit">Добавить</button>
        </form>

        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.text} <button onClick={() => removeTodo(todo.id)}>Удалить</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
