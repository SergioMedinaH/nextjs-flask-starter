import { cn, getLineaColorBg } from "@/lib/utils";

import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';

import ItemTrayecto from "./itemtrayecto";
import { ArrowUpDown, ChevronRight } from "lucide-react";


interface Parada {
    value: string;
    label: string;
    lat: number;
    lng: number;
    linea: string;
  }

interface Trayecto {
    linea: string;
    paradas: Parada[];
    tiempos: number[];
  }

export default function TrayectoComponente({trayecto}: {trayecto: Trayecto}) {
    const tiempoTotal = trayecto.tiempos.reduce((acumulador, tiempo) => acumulador + tiempo, 0)

    if (trayecto.linea === 'Transbordo') {
        return <div key={trayecto.linea + trayecto.paradas[0]} className='flex border-b w-full mt-2 pb-2'>
        <div className='h-full w-[5px]text-gray-500'/>
        <div className="flex flex-col gap-2 p-2 w-full">
            <div className="flex justify-between gap-2 font-bold text-lg"> 
                <div className='flex gap-4 items-center'>
                    <span className=''>Transbordo</span>
                    <div className="flex">
                    <div className={cn(
                        'w-5 h-5 rounded-sm flex text-center items-center justify-center text-white',
                        trayecto.paradas[0].linea === 'A' && 'bg-lineaA',
                        trayecto.paradas[0].linea === 'B' && 'bg-lineaB',
                        trayecto.paradas[0].linea === 'C' && 'bg-lineaC',
                        trayecto.paradas[0].linea === 'D' && 'bg-lineaD',
                        trayecto.paradas[0].linea === 'E' && 'bg-lineaE',
                        )}>{trayecto.paradas[0].linea}</div>
                        <ChevronRight className='w-5 h-5'/>
                        <div className={cn(
                        'w-5 h-5 rounded-sm flex text-center items-center justify-center text-white',
                        trayecto.paradas[1].linea === 'A' && 'bg-lineaA',
                        trayecto.paradas[1].linea === 'B' && 'bg-lineaB',
                        trayecto.paradas[1].linea === 'C' && 'bg-lineaC',
                        trayecto.paradas[1].linea === 'D' && 'bg-lineaD',
                        trayecto.paradas[1].linea === 'E' && 'bg-lineaE',
                        )}>{trayecto.paradas[1].linea}</div>
                    </div>
                </div>
                <span className=''>{tiempoTotal} min{tiempoTotal > 1 && "s"}</span>
            </div>
                
            <div className='flex flex-col gap-1'>
                    <div className="flex gap-2 items-center">
                        <div className={cn(
                        'w-5 h-5 rounded-sm flex text-center font-bold items-center justify-center text-white',
                        trayecto.paradas[0].linea === 'A' && 'bg-lineaA',
                        trayecto.paradas[0].linea === 'B' && 'bg-lineaB',
                        trayecto.paradas[0].linea === 'C' && 'bg-lineaC',
                        trayecto.paradas[0].linea === 'D' && 'bg-lineaD',
                        trayecto.paradas[0].linea === 'E' && 'bg-lineaE',
                        )}>{trayecto.paradas[0].linea}</div>
                        <div className="flex justify-between w-full">
                        <p>{trayecto.paradas[0].label}</p>
                        </div>
                        
                    </div>
                    <ArrowUpDown className='w-5 h-5'/>
                    <div className="flex gap-2 items-center">
                    <div className={cn(
                    'w-5 h-5 rounded-sm flex text-center font-bold items-center justify-center text-white',
                    trayecto.paradas[1].linea === 'A' && 'bg-lineaA',
                    trayecto.paradas[1].linea === 'B' && 'bg-lineaB',
                    trayecto.paradas[1].linea === 'C' && 'bg-lineaC',
                    trayecto.paradas[1].linea === 'D' && 'bg-lineaD',
                    trayecto.paradas[1].linea === 'E' && 'bg-lineaE',
                    )}>{trayecto.paradas[1].linea}</div>
                    <div className="flex justify-between w-full">
                    <p>{trayecto.paradas[1].label}</p>
                    <p className="text-sm text-black/60">{trayecto.tiempos[0]} min{trayecto.tiempos[0] > 1 && "s"}</p>
                    </div>
                    
                </div>
                
                
            </div>
        </div>
    </div>
    } else {
        return(
            <div key={trayecto.linea + trayecto.paradas[0]} className='flex border-b w-full mt-2'>
                <div className="flex flex-col gap-2 p-2 w-full">
                    <div className="flex justify-between gap-2 font-bold text-lg">
                        <span className={cn(
                  '',
                  trayecto.linea === 'A' && 'text-lineaA',
                  trayecto.linea === 'B' && 'text-lineaB',
                  trayecto.linea === 'C' && 'text-lineaC',
                  trayecto.linea === 'D' && 'text-lineaD',
                  trayecto.linea === 'E' && 'text-lineaE',
                  )}>Línea {trayecto.linea}</span>
                    {tiempoTotal > 0 && <span className=''>{tiempoTotal} min{tiempoTotal > 1 && "s"}</span>}
                        
                    </div>
                    <div className="flex flex-col">
                        {trayecto.paradas.map((parada, index) => (
                            <ItemTrayecto parada={parada} tiempo={trayecto.tiempos[index-1]} key={index} especial={index === 0 || index === trayecto.paradas.length - 1} ultimo={index === trayecto.paradas.length - 1}/>
                        ))}
                    </div>
                        
                    {/*<div className='flex flex-col gap-1'>
                        {trayecto.paradas.map((parada, index2) => (
                        <p key={parada.value}>{parada.label} {index2 > 0 && <span>{trayecto.tiempos[index2-1]} min{trayecto.tiempos[index2-1] > 1 && "s"}</span>}</p>
                        ))}
                    </div>*/}
                </div>
                
            </div>
        )
    }

    
}