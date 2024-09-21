import { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Popup,
  Polyline,
  Marker,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import cities from "../../../public/cities.json";
import { AudioServices } from "../../services/audio";
import { WebcamService } from "../../services/webcam";

// Crear un nuevo icono para el marcador
const customIcon = L.icon({
  iconUrl: "../../../public/vite.svg", // Reemplaza con la ruta de tu imagen
  iconSize: [25, 41], // Tamaño del icono
  iconAnchor: [12, 41], // Punto del icono que corresponde a la posición del marcador
  popupAnchor: [1, -34], // Punto desde el cual se abrirá el popup relativo al icono
  // shadowUrl: "path/to/marker-shadow.png", // Reemplaza con la ruta de la sombra del marcador si tienes una
  // shadowSize: [41, 41], // Tamaño de la sombra
});

const Map = ({ route }) => {
  const center = [4.711, -74.0721]; // Latitud y longitud de Bogotá
  const audioService = new AudioServices();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [webcamService, setWebcamService] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const getCoordinates = (cityName) => {
    const city = cities.find((city) => city.name === cityName);
    return city.coordinates;
  };

  const getRouteCoordinates = (route) => {
    const start = getCoordinates(route.start);
    const end = getCoordinates(route.end);
    return [start, end];
  };

  const [markerPosition, setMarkerPosition] = useState(center);

  useEffect(() => {
    const webcamServiceInstance = new WebcamService(videoRef.current, canvasRef.current);
    setWebcamService(webcamServiceInstance);
    webcamServiceInstance.startWebcam();

    return () => {
      webcamServiceInstance.stopWebcam();
    };
  }, []);

  useEffect(() => {
    let currentRouteIndex = 0;
    let currentPointIndex = 0;
    let interval;

    const animateMarker = () => {
      if (currentRouteIndex >= route.length) {
        clearInterval(interval);
        if (webcamService) {
          const image = webcamService.captureImage();
          setCapturedImage(image);
        }
        return;
      }

      const routeCoordinates = getRouteCoordinates(route[currentRouteIndex]);
      const [start, end] = routeCoordinates;

      const latDiff = (end[0] - start[0]) / 100;
      const lngDiff = (end[1] - start[1]) / 100;

      interval = setInterval(() => {
        if (currentPointIndex >= 100) {
          currentRouteIndex++;
          currentPointIndex = 0;
          clearInterval(interval);
          audioService.playAudio();
          animateMarker();
        } else {
          const newLat = start[0] + latDiff * currentPointIndex;
          const newLng = start[1] + lngDiff * currentPointIndex;
          setMarkerPosition([newLat, newLng]);
          currentPointIndex++;
        }
      }, 100);
    };

    animateMarker();

    return () => clearInterval(interval);
  }, [route, webcamService]);

  return (
    <div>
      <MapContainer
        center={center}
        zoom={5}
        style={{ height: "400px", width: "600px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {route.map((route, index) => (
          <Polyline
            key={index}
            positions={getRouteCoordinates(route)}
            color="blue"
          >
            <Popup>
              <h3>{route.routeName}</h3>
            </Popup>
          </Polyline>
        ))}
        <Marker position={markerPosition} icon={customIcon}>
          <Popup>
            <h3>Marcador Animado</h3>
          </Popup>
        </Marker>
      </MapContainer>
      <video ref={videoRef} style={{ display: "none" }}></video>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      {capturedImage && (
        <div style={{ marginTop: "20px" }}>
          <h3>Imagen Capturada:</h3>
          <img src={capturedImage} alt="captured"/>
        </div>
      )}
    </div>
  );
};

export default Map;