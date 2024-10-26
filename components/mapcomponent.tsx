'use client';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup , Polyline, Tooltip} from 'react-leaflet';
import L from 'leaflet';
import { Marcador } from '@/components/marcador';
import { getLineaColorHEX } from '@/lib/utils';

interface MarcadorProps {
    paradas: { value: string; label: string, lat: number, lng: number, linea: string }[]
}

const MapComponent = ({paradas}: MarcadorProps) => {
    //delete L.Icon.Default.prototype._getIconUrl;
    //L.Icon.Default.mergeOptions({
    //iconRetinaUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon-2x.png',
    //iconUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon.png',
    //shadowUrl: 'https://unpkg.com/leaflet/dist/images/marker-shadow.png',
    //});

    const createCircleIcon = (color: string, opacity: number) => {
    return L.divIcon({
        className: 'custom-circle-icon',
        html: `<div style="background-color: ${color}; width: 15px; height: 15px; border-radius: 50%; opacity: ${opacity};"></div>`,
        iconSize: [12, 12], // Tamaño del icono
        iconAnchor: [6, 6], // Punto del icono que se alinea con las coordenadas del marcador
        popupAnchor: [0, -8], // Punto en el que se ancla el popup en relación al icono
    });
    };

    const center: [number, number] = [-34.605556, -58.402826];
    // Definir el radio en grados (aproximado a 100 km)
    const kmToDegrees = (km: number) => km / 111; // Aproximadamente 111 km por grado de latitud
    const radius = kmToDegrees(10);
    const bounds = L.latLngBounds(
    [center[0] - radius, center[1] - radius],
    [center[0] + radius, center[1] + radius]
    );
    return (
        <MapContainer 
        center={center} 
        zoom={14} 
        minZoom={13} 
        maxZoom={18}
        maxBounds={bounds}       // Limita el área desplazable
        maxBoundsViscosity={1.0} // Para mantener la cámara dentro de los límites
        className="flex-1"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" // Estilo CartoDB Positron
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        {paradas && paradas.map((parada) => (
          <Marcador
            key={parada.value}
            lat={parada.lat}
            lng={parada.lng}
            value={parada.value}
            label={parada.label}
            linea={parada.linea}
          />  
        ))}
        
        {['A', 'B', 'C', 'D', 'E'].map((linea) => {
                const estaciones = paradas.filter(p => p.linea === linea);
                if (estaciones.length > 1) {
                    const latLngs = estaciones.map(p => L.latLng(p.lat, p.lng));
                    const color = getLineaColorHEX(linea);
                    return <Polyline key={linea} positions={latLngs} color={color} weight={5} opacity={1} />;
                }
                return null; // Retornar null si no hay estaciones para esa línea
            })}
      </MapContainer>
    )
}
export default MapComponent;