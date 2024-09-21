import { Link } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/administration";
  };

  return (
    <nav className="navbar">
      <h1 className="navbar__title">Gestor de Mapas</h1>
      <Link to="/" className="navbar__link">
        Inicio
      </Link>
      <Link to="/administration" className="navbar__link">
        Administración
      </Link>
      <Link to="/display" className="navbar__link">
        Visualización
      </Link>
      <button className="button__logout" onClick={handleLogout}>
        Cerrar Sesión
      </button>
    </nav>
  );
};
