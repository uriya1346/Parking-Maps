import "./app.css";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import Message from "./message";

function App() {
  const [viewport, setViewport] = useState({
    latitude: 32.075874,
    longitude: 34.800098,
    zoom: 12.7,
  });
  const [ar, setAr] = useState([]);
  const [style, setStyle] = useState("mapbox://styles/mapbox/streets-v11");
  const [selectedParking, setSelectedParking] = useState(null);

  useEffect(() => {
    doApi();
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedParking(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [style]);

  //API fron gov.il
  const doApi = async () => {
    let url = "https://api.tel-aviv.gov.il/parking/stations";
    let resp = await axios.get(url);
    setAr(resp.data);
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Message />
      <Nav setStyle={setStyle} />
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoiZ3VyZ2VuOCIsImEiOiJjbDAya2p3YWQwNGI3M2txcHQ4amF0NW1tIn0.LifP-AAkjEyrty0gLCW53w"
        width="100%"
        height="100%"
        transitionDuration="200"
        mapStyle={style}
        onViewportChange={(viewport) => setViewport(viewport)}
      >
        {ar.map((item) => {
          return (
            <Marker
              key={item.AhuzotCode}
              latitude={Number(item.GPSLattitude)}
              longitude={Number(item.GPSLongitude)}
            >
              <button
                className="marker-btn"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedParking(item);
                }}
              >
                <img src="/marker.png" alt="Parking Icon" />
              </button>
            </Marker>
          );
        })}
        {selectedParking ? (
          <Popup
            latitude={Number(selectedParking.GPSLattitude)}
            longitude={Number(selectedParking.GPSLongitude)}
            onClose={() => {
              setSelectedParking(null);
            }}
          >
            <div className="info text-center p-2" style={{ width: "50vh" }}>
              <h1>{selectedParking.Name}</h1>
              <h3>{selectedParking.Address}</h3>
              <h5>{selectedParking.FeeComments}</h5>
              <h5>{selectedParking.DaytimeFee}</h5>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
}

export default App;
