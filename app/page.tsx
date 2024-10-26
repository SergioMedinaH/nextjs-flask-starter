"use client";
//import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Buscador } from '@/components/ui/buscador';
import { useEffect, useState } from 'react';
//const MapComponent = dynamic(() => import('../components/mapcomponent'), { ssr: false });
import MapComponent from '@/components/mapcomponent';
//import Map from '@/components/map'




export default function Home() {
  const isClient = typeof window !== 'undefined';




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
      {isClient && <MapComponent paradas={paradas} />}
    </div>
    
  )
}
