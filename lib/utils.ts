import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getLineaColorHEX = (linea: string): string => {
  switch (linea) {
      case 'A':
          return '#00aedb';  // Línea A - Rojo
      case 'B':
          return '#ee1b2e';  // Línea B - Azul
      case 'C':
          return '#0168b3';  // Línea C - Verde
      case 'D':
          return '#008067';  // Línea D - Amarillo
      case 'E':
          return '#6d2281';  // Línea E - Púrpura
      default:
          return '#A0AEC0';  // Línea desconocida - Gris
  }
};
export const getLineaColorText = (linea: string) => {
  switch (linea) {
      case 'A':
          return 'text-lineaA';  // Línea A - Azul
      case 'B':
          return 'text-lineaB';  // Línea B - Rojo
      case 'C':
          return 'text-lineaC';  // Línea C - Verde
      case 'D':
          return 'text-lineaD';  // Línea D - Amarillo
      case 'E':
          return 'text-lineaE';  // Línea E - Púrpura
      default:
          return 'text-gray-500';  // Línea desconocida - Gris
  }
};