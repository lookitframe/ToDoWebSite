import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Parse from "parse";

const Reg = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();  // Инициализация useNavigate

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const user = new Parse.User();
      user.set("username", username);
      user.set("password", password);
      user.set("email", email);

      await user.signUp();
      setMessage("Регистрация успешна! Теперь вы можете войти.");
      navigate("/Home"); // Переход на главную страницу после успешной регистрации
    } catch (error) {
      setMessage(`Ошибка регистрации: ${error.message}`);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Регистрация</h1>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Зарегистрироваться</button>
        </form>
        {message && <p className="message">{message}</p>}
        <p>
          Уже есть аккаунт? <Link to="/">Войдите</Link>
        </p>
      </div>
    </div>
  );
};

export default Reg;
