"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface BuscadorProps {
  paradas: { value: string; label: string, lat: number, lng: number, linea: string }[]
  texto: string
  onSelect: (value: string) => void 
}

export function Buscador({ 
    paradas, 
    texto, 
    onSelect 
}: BuscadorProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === value ? "" : currentValue
    setValue(newValue)
    setOpen(false)
    onSelect(newValue)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          
          {value
            ? <div className="flex gap-2">
                <span className={cn(
                'font-bold',
                paradas.find((parada) => parada.value === value)?.linea === 'A' && 'text-lineaA',
                paradas.find((parada) => parada.value === value)?.linea === 'B' && 'text-lineaB',
                paradas.find((parada) => parada.value === value)?.linea === 'C' && 'text-lineaC',
                paradas.find((parada) => parada.value === value)?.linea === 'D' && 'text-lineaD',
                paradas.find((parada) => parada.value === value)?.linea === 'E' && 'text-lineaE',
                )}
                >{paradas.find((parada) => parada.value === value)?.linea}</span>
                {paradas.find((parada) => parada.value === value)?.label}
            </div>
            
            : texto}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={texto} />
          <CommandList>
            <CommandEmpty>No se encuentra la parada.</CommandEmpty>
            <CommandGroup>
              {paradas.map((parada) => (
                <CommandItem
                  key={parada.value}
                  value={parada.value}
                  onSelect={handleSelect}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === parada.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className={cn(
                'font-bold',
                parada.linea === 'A' && 'text-lineaA',
                parada.linea === 'B' && 'text-lineaB',
                parada.linea === 'C' && 'text-lineaC',
                parada.linea === 'D' && 'text-lineaD',
                parada.linea === 'E' && 'text-lineaE',
                )}>{parada.linea}</span>
                  {parada.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}