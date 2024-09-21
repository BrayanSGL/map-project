import "./HomeView.css";

export const HomeView = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1 className="welcome-title">¡Bienvenido a Nuestra Página!</h1>
        <p>Somos:</p>
        <ul className="welcome-list">
          <a
            href="https://www.instagram.com/brayansgl/"
            target="_blank"
          >
            <li>Brayan Snader Galeano Lara</li>
          </a>
          <a
            href="https://www.instagram.com/jhonnybernate/"
            target="_blank"
          >
            <li>Jonathan Steven Bernate Real</li>
          </a>
          <a
            href="https://www.instagram.com/fabricio.728/"
            target="_blank"
          >
            <li>Luis Fabricio Varón Quiñones</li>
          </a>
        </ul>
      </div>
    </div>
  );
};
