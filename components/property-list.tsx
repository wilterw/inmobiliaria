"use client"

import { motion } from "framer-motion"
import PropertyCard from "./property-card"
import type { Property } from "@/app/page"

interface PropertyListProps {
  properties: Property[]
}

export default function PropertyList({ properties }: PropertyListProps) {
  if (properties.length === 0) {
    return (
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-gray-500 text-lg">No se encontraron propiedades que coincidan con tus filtros.</div>
        <p className="text-gray-400 mt-2">Intenta ajustar los criterios de búsqueda.</p>
      </motion.div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
      {properties.map((property, index) => (
        <PropertyCard key={property.id} property={property} index={index} />
      ))}
    </div>
  )
}
