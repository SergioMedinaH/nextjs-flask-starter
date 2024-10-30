import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip } from "react-leaflet";

function Map() {
    const markerPosition = [7.8731, -72.5031];

    return(
        <MapContainer
            className=""
            center={markerPosition}
            zoom={13}
            scrollWheelZoom={false}
        >
            <TileLayer
                attribution="bullseye map"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            >

            </TileLayer>
        </MapContainer>
        )
}

export default Map;