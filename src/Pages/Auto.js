import React, { useState } from "react";
import { Link, useNavigate }  from "react-router-dom";
import Parse from "parse";
import "../auth.css"

const Auto = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();  // Инициализация useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await Parse.User.logIn(username, password);
      setMessage(`Добро пожаловать, ${user.get("username")}!`);
      navigate("/Home"); // Переход на главную страницу после успешной авторизаци
    } catch (error) {
      setMessage(`Ошибка входа: ${error.message}`);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Вход</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Войти</button>
        </form>
        {message && <p className="message">{message}</p>}
        <p>
          Нет аккаунта? <Link to="/register">Зарегистрируйтесь</Link>
        </p>
      </div>
    </div>
  );
};

export default Auto;
