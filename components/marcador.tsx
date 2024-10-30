import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup , Polyline, Tooltip} from 'react-leaflet';
import L from 'leaflet';
import { Button } from '@/components/ui/button'
import { cn, getLineaColorHEX } from '@/lib/utils';

const createCircleIcon = (color: string, opacity: number) => {
    return L.divIcon({
      className: 'custom-circle-icon',
      html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; opacity: ${opacity};"></div>`,
      iconSize: [12, 12], // Tamaño del icono
      iconAnchor: [6, 6], // Punto del icono que se alinea con las coordenadas del marcador
      popupAnchor: [0, -8], // Punto en el que se ancla el popup en relación al icono
    });
  };

interface MarcadorProps {
    lat: number,
    lng: number,
    value: string,
    label: string,
    linea: string,
    onSelectOrigen: (value: string) => void,
    onSelectDestino: (value: string) => void,
}


export function Marcador({lat, lng, value, label, linea, onSelectOrigen, onSelectDestino}: MarcadorProps) {
    const colorLineaHEX = getLineaColorHEX(linea);

    

    return(
        <Marker position={[lat, lng]} icon={createCircleIcon(colorLineaHEX, 1)} title={label}>
          <Popup>
            <div className='flex flex-col justify-center items-center'>
              <div className='flex gap-2 text-lg font-semibold justify-center items-center max-h-[50px] mb-4'>
                  <div  className={cn(
                          'w-6 h-6 rounded-sm flex text-center items-center justify-center text-white',
                          linea === 'A' && 'bg-lineaA',
                          linea === 'B' && 'bg-lineaB',
                          linea === 'C' && 'bg-lineaC',
                          linea === 'D' && 'bg-lineaD',
                          linea === 'E' && 'bg-lineaE',
                          )}>{linea}</div>
                <h2 className=''>{label}</h2>
              </div>
              
              <div className='flex gap-4'>
                <Button onClick={() => onSelectOrigen(value)}>Nuevo Origen</Button>
                <Button onClick={() => onSelectDestino(value)}>Nuevo Destino</Button>
              </div>
            </div>
          </Popup>
        </Marker>
    )
}