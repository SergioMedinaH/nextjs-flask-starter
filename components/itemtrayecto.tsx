import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';
import { cn } from '@/lib/utils';

interface Parada {
    value: string;
    label: string;
    lat: number;
    lng: number;
    linea: string;
  }

export default function ItemTrayecto({parada, tiempo, especial, ultimo}: {parada: Parada, tiempo: number, especial: boolean, ultimo: boolean}) {
    return(
        
      <div className='flex items-start h-10 h-max-10 w-full'>
        <div className='flex flex-col items-center'>
            <div className={cn(
                          'w-3 min-w-3 h-3 min-h-3 rounded-full mt-2',
                          parada.linea === 'A' && 'bg-lineaA',
                          parada.linea === 'B' && 'bg-lineaB',
                          parada.linea === 'C' && 'bg-lineaC',
                          parada.linea === 'D' && 'bg-lineaD',
                          parada.linea === 'E' && 'bg-lineaE',
                          )}
            
            />
            {!ultimo && <div className={cn(
                          'w-[2px] h-10',
                          parada.linea === 'A' && 'bg-lineaA',
                          parada.linea === 'B' && 'bg-lineaB',
                          parada.linea === 'C' && 'bg-lineaC',
                          parada.linea === 'D' && 'bg-lineaD',
                          parada.linea === 'E' && 'bg-lineaE',
                          )}/>}
        </div>
        <div className='pl-2 flex justify-between w-full'>
            <span className={cn(
                          '',
                          especial && 'text-lg font-semibold',
                          )}>{parada.label}</span>
            {tiempo > 0 && <span className='text-black/60 text-sm'>{tiempo} min{tiempo > 1 && "s"}</span>}
        </div>
      </div>
    )
}