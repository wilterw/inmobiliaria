"use client"

import { motion } from "framer-motion"
import { BedDouble, Bath, Square, MapPin } from "lucide-react"
import type { Property } from "@/app/page"

interface PropertyCardProps {
  property: Property
  index: number
}

export default function PropertyCard({ property, index }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "En Venta":
        return "bg-green-500"
      case "En Arriendo":
        return "bg-yellow-500"
      default:
        return "bg-blue-500"
    }
  }

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
        delay: index * 0.1,
      }}
      whileHover={{
        scale: 1.03,
        y: -5,
        transition: { type: "spring", stiffness: 300 },
      }}
    >
      {/* Imagen */}
      <div className="relative aspect-video">
        <img
          src={property.image_url || "/placeholder.svg"}
          alt={property.title}
          className="object-cover w-full h-full"
        />
        <div
          className={`absolute top-4 right-4 ${getStatusColor(property.status)} text-white px-3 py-1 rounded-full text-sm font-medium`}
        >
          {property.status}
        </div>
      </div>

      {/* Cuerpo de la Tarjeta */}
      <div className="p-6 flex-grow">
        <h4 className="font-bold text-lg text-gray-900 truncate mb-2">{property.title}</h4>

        <div className="flex items-center text-sm text-gray-500 mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="truncate">{property.address}</span>
        </div>

        <p className="text-2xl font-bold text-blue-600 mb-4">
          {formatPrice(property.price)}
          {property.status === "En Arriendo" && <span className="text-sm text-gray-500">/mes</span>}
        </p>
      </div>

      {/* Pie de la Tarjeta */}
      <div className="mt-auto border-t border-gray-200 p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <BedDouble className="h-4 w-4 mr-1" />
              <span>{property.bedrooms}</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              <span>{property.bathrooms}</span>
            </div>
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1" />
              <span>{property.square_feet} m²</span>
            </div>
          </div>
        </div>

        <motion.button
          className="w-full border-2 border-blue-600 text-blue-600 font-medium py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Contactar
        </motion.button>
      </div>
    </motion.div>
  )
}
