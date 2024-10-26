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
}


export function Marcador({lat, lng, value, label, linea}: MarcadorProps) {
    const colorLineaHEX = getLineaColorHEX(linea);
    return(
        <Marker position={[lat, lng]} icon={createCircleIcon(colorLineaHEX, 1)} title={label}>
          <Popup>
            <div className='flex flex-col gap-1'>
              <h2 className='text-xl font-bold'>{label}</h2>
              <p className={cn(
                'text-lg',
                linea === 'A' && 'text-lineaA',
                linea === 'B' && 'text-lineaB',
                linea === 'C' && 'text-lineaC',
                linea === 'D' && 'text-lineaD',
                linea === 'E' && 'text-lineaE',
                )}>Linea {linea}</p>
              <div className='flex gap-4'>
                <Button>Origen</Button>
                <Button>Destino</Button>
              </div>
            </div>
          </Popup>
        </Marker>
    )
}