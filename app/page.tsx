"use client";
import { Button } from '@/components/ui/button'
import { Buscador } from '@/components/ui/buscador'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

//import Map from '@/components/map'
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup , Polyline, Tooltip} from 'react-leaflet';
import L from 'leaflet';
import { Marcador } from '@/components/marcador';
import { getLineaColorHEX } from '@/lib/utils';



export default function Home() {
  const paradas = [
    // Línea A
    { value: "catedralA", label: "Catedral", lat: -34.6090, lng: -58.3816, linea: "A" },
    { value: "9dejulio", label: "9 de Julio", lat: -34.6034, lng: -58.3810, linea: "A" },
    { value: "carabobo", label: "Carabobo", lat: -34.6286, lng: -58.4377, linea: "A" },
    { value: "plazaolivera", label: "Plaza de los Virreyes", lat: -34.6289, lng: -58.4360, linea: "A" },
    { value: "sanjoaquin", label: "San Joaquín", lat: -34.6226, lng: -58.4365, linea: "A" },
    { value: "barracas", label: "Barracas", lat: -34.6487, lng: -58.4151, linea: "A" },
    { value: "caballito", label: "Caballito", lat: -34.6202, lng: -58.4422, linea: "A" },
    
    // Línea B
    { value: "tribunales", label: "Tribunales", lat: -34.6041, lng: -58.3879, linea: "B" },
    { value: "callao", label: "Callao", lat: -34.6049, lng: -58.3895, linea: "B" },
    { value: "medalapalma", label: "Medalla Milagrosa", lat: -34.6070, lng: -58.4175, linea: "B" },
    { value: "carlosgardel", label: "Carlos Gardel", lat: -34.6101, lng: -58.4040, linea: "B" },
    { value: "lacroze", label: "Federico Lacroze", lat: -34.5792, lng: -58.4494, linea: "B" },
    
    // Línea C
    { value: "constitucion", label: "Constitución", lat: -34.6210, lng: -58.3741, linea: "C" },
    { value: "catedralB", label: "Catedral", lat: -34.6090, lng: -58.3816, linea: "C" },
    { value: "lima", label: "Lima", lat: -34.6096, lng: -58.3860, linea: "C" },
    { value: "pavon", label: "Pavón", lat: -34.6054, lng: -58.3964, linea: "C" },
    { value: "monteagudo", label: "Monteagudo", lat: -34.6109, lng: -58.4020, linea: "C" },
    
    // Línea D
    { value: "carranza", label: "Ministro Carranza", lat: -34.5912, lng: -58.3956, linea: "D" },
    { value: "nunez", label: "Núñez", lat: -34.5636, lng: -58.4369, linea: "D" },
    { value: "vinculos", label: "Vinculos", lat: -34.5772, lng: -58.4265, linea: "D" },
    
    // Línea E
    { value: "bolivar", label: "Bolívar", lat: -34.6095, lng: -58.3745, linea: "E" },
    { value: "emergencia", label: "Emergencia", lat: -34.6118, lng: -58.3738, linea: "E" },
    { value: "viaducto", label: "Viaducto", lat: -34.6075, lng: -58.3797, linea: "E" },
];
  
  const [paradaOrigen, setParadaOrigen] = useState('')
  const handleSelectParadaOrigen = (value: string) => {
    setParadaOrigen(value)
  }
  const [paradaDestino, setParadaDestino] = useState('')
  const handleSelectParadaDestino = (value: string) => {
    setParadaDestino(value)
  }

  interface ApiResponse {
    route: string;
  }
  const [resultado, setResultado] = useState('')
  const handleSubmit = async () => {
    const response = await fetch(`/api/python`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({ paradaOrigen, paradaDestino }),
    });

    const data: ApiResponse = await response.json();
    setResultado(data.route);
  };
  

  delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet/dist/images/marker-shadow.png',
});

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
    <div className="flex h-screen w-screen overflow-hidden">
      <div className="w-[350px] bg-white p-4 overflow-y-auto drop-shadow-md">
      <div className='flex flex-col gap-4'>
        <h1 className='text-xl my-4'>Nombre Aplicación</h1>
        <h2 className=''>Seleccione su ruta</h2>
      <Buscador 
        paradas={paradas} 
        texto='Elige un Origen'
        onSelect={handleSelectParadaOrigen}
      />
      <Buscador
        paradas={paradas} 
        texto='Elige un Destino' 
        onSelect={handleSelectParadaDestino}
      />
      <Button onClick={handleSubmit} disabled={paradaOrigen == "" || paradaDestino == ""}>Buscar ruta</Button>
      {resultado && 
      <div>
        <h2>La ruta más corta es:</h2>
        {resultado}
      </div>}
      </div>
      
      </div>
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
                    const latLngs = estaciones.map(p => [p.lat, p.lng]);
                    const color = getLineaColorHEX(linea);
                    return <Polyline key={linea} positions={latLngs} color={color} weight={5} opacity={1} />;
                }
                return null; // Retornar null si no hay estaciones para esa línea
            })}
      </MapContainer>
    </div>
    
  )
}
