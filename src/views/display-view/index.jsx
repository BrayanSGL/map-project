import Map from "../map";
import "./DisplayView.css";
import { RouteServices } from "../../services/routes";
import { validateSession } from "../../authentication/auth";
import { useEffect, useState } from "react";

export const DisplayView = () => {
  const [routes, setRoutes] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    getUser();
    getRoutes();
  }, []);

  const getRoutes = async () => {
    const routeService = new RouteServices();
    const routes = await routeService.getRoutes();
    setRoutes(routes);
    console.log(routes);
    // for (let i = 0; i < cities.length; i++) {
    //   if (cities[i].name === routes[0].start) {
    //     setStartLocation(cities[i].coordinates);
    //   }
    //   if (cities[i].name === routes[0].end) {
    //     setEndLocation(cities[i].coordinates);
    //   }
    // }
  };

  const getUser = async () => {
    const user = await validateSession();
    setUser(user);
  };

  return (
    <div className="display-view-container">
      <h1 className="display-view-title">Rutas de: {user}</h1>
      <div className="display-main">
        <div className="map-container">
          <Map route={routes} />
        </div>
        <aside className="routes-container">
          <h2 className="routes-title">Rutas</h2>
          <ul className="routes-list">
            {routes.map((route, index) => (
              <li key={index} className="route-item">
                <h3 className="route-name">{route.routeName}</h3>
                <p className="route-start">Inicio: {route.start}</p>
                <p className="route-end">Fin: {route.end}</p>
              </li>
            ))}
          </ul>
        </aside>
        <section>
          <a
            target="_blank"
            href="https://www.facebook.com/sharer/sharer.php?u=www.google.com.co"
          >
            Compartir en facebook
          </a>
          <a
            target="_blank"
            href="https://twitter.com/intent/tweet?text=[text]&url=[url]&hashtags=[hashtag]"
          >
            {" "}
            Comparte Twitter
          </a>
          <a target="_blank" href="https://api.whatsapp.com/send?text=[text]">
            Comparte Whatsapp--
          </a>

        
          <button onClick={() => window.print()}>Imprimir</button>
        </section>
      </div>
    </div>
  );
};
