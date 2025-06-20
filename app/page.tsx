"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import FilterSidebar from "@/components/filter-sidebar"
import PropertyList from "@/components/property-list"

// Datos de ejemplo para las propiedades
const sampleProperties = [
  {
    id: 1,
    title: "Casa Moderna en Zona Norte",
    address: "Av. Libertador 1234, Belgrano, Buenos Aires",
    price: 450000,
    status: "En Venta" as const,
    bedrooms: 3,
    bathrooms: 2,
    square_feet: 1200,
    image_url: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 2,
    title: "Departamento Luminoso Centro",
    address: "Corrientes 5678, Centro, Buenos Aires",
    price: 2800,
    status: "En Arriendo" as const,
    bedrooms: 2,
    bathrooms: 1,
    square_feet: 850,
    image_url: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 3,
    title: "Penthouse con Vista al Río",
    address: "Puerto Madero 9012, Puerto Madero, Buenos Aires",
    price: 850000,
    status: "En Venta" as const,
    bedrooms: 4,
    bathrooms: 3,
    square_feet: 2200,
    image_url: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 4,
    title: "Casa Familiar con Jardín",
    address: "San Martín 3456, San Isidro, Buenos Aires",
    price: 3500,
    status: "En Arriendo" as const,
    bedrooms: 4,
    bathrooms: 2,
    square_feet: 1800,
    image_url: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 5,
    title: "Loft Industrial Renovado",
    address: "Palermo 7890, Palermo, Buenos Aires",
    price: 320000,
    status: "En Venta" as const,
    bedrooms: 1,
    bathrooms: 1,
    square_feet: 600,
    image_url: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 6,
    title: "Duplex con Terraza",
    address: "Recoleta 2468, Recoleta, Buenos Aires",
    price: 4200,
    status: "En Arriendo" as const,
    bedrooms: 3,
    bathrooms: 2,
    square_feet: 1400,
    image_url: "/placeholder.svg?height=300&width=400",
  },
]

export type Property = {
  id: number
  title: string
  address: string
  price: number
  status: "En Venta" | "En Arriendo"
  bedrooms: number
  bathrooms: number
  square_feet: number
  image_url: string
}

export type Filters = {
  activeTab: "Compra" | "Venta" | "Arriendo"
  location: string
  priceMin: string
  priceMax: string
  bedrooms: number | null
  bathrooms: number | null
}

export default function RealEstatePortal() {
  const [filters, setFilters] = useState<Filters>({
    activeTab: "Compra",
    location: "",
    priceMin: "",
    priceMax: "",
    bedrooms: null,
    bathrooms: null,
  })

  const [filteredProperties, setFilteredProperties] = useState<Property[]>(sampleProperties)

  const applyFilters = () => {
    const filtered = sampleProperties.filter((property) => {
      // Filtro por estado
      if (filters.activeTab === "Venta" && property.status !== "En Venta") return false
      if (filters.activeTab === "Arriendo" && property.status !== "En Arriendo") return false

      // Filtro por ubicación
      if (filters.location && !property.address.toLowerCase().includes(filters.location.toLowerCase())) {
        return false
      }

      // Filtro por precio
      if (filters.priceMin && property.price < Number.parseInt(filters.priceMin)) return false
      if (filters.priceMax && property.price > Number.parseInt(filters.priceMax)) return false

      // Filtro por dormitorios
      if (filters.bedrooms && property.bedrooms < filters.bedrooms) return false

      // Filtro por baños
      if (filters.bathrooms && property.bathrooms < filters.bathrooms) return false

      return true
    })

    setFilteredProperties(filtered)
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Encuentra tu Próximo Hogar</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre las mejores propiedades en las ubicaciones más exclusivas. Tu hogar ideal te está esperando.
          </p>
        </motion.div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Filter Sidebar */}
          <div className="md:col-span-3">
            <FilterSidebar filters={filters} setFilters={setFilters} onApplyFilters={applyFilters} />
          </div>

          {/* Property List */}
          <div className="md:col-span-9">
            <PropertyList properties={filteredProperties} />
          </div>
        </div>
      </div>
    </div>
  )
}
