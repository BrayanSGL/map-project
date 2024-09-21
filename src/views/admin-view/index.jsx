import { useEffect, useState } from "react";
import "./AdminView.css";
import { AuthServices } from "../../services/authentication";
import { useNavigate } from "react-router-dom";
import { validateSession } from "../../authentication/auth";

export const AdminView = () => {
  useEffect(() => {
    validateSession(true);
    getUsers();
  }, []);

  const navigation = useNavigate();
  // Estado para manejar los valores del formulario
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [users, setUsers] = useState([]);

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const registerUser = async () => {
    const { username, password } = formData;
    if (!username || !password) {
      console.error("Debes ingresar un usuario y contraseña");
      return;
    }
    const authService = new AuthServices();
    const user = {
      userName: username,
      password,
    };
    try {
      await authService.register(user);
      getUsers();
    } catch (error) {
      console.error("Error al registrar usuario:", error);
    }
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;
    const authService = new AuthServices();
    try {
      const user = await authService.login(username, password);
      if (user) {
        console.log("Usuario autenticado:", user);
        navigation("/add-route");
      } else {
        alert("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error al autenticar usuario:", error);
    }
  };

  const getUsers = async () => {
    const authService = new AuthServices();
    const users = await authService.getUsers();
    setUsers(users);
  };

  return (
    <div className="admin-view-container">
      <h1>Admin View</h1>

      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Usuario</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Iniciar Sesión
        </button>
      </form>

      <button className="register-button" onClick={registerUser}>
        Registrar nuevo usuario
      </button>

      <h2>Usuarios Registrados</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.userName}</li>
        ))}
      </ul>
    </div>
  );
};
