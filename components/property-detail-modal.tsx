"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, BedDouble, Bath, Square, MapPin, Calendar, Home } from "lucide-react"
import type { Property } from "@/app/page"
import ImageCarousel from "./image-carousel"

interface PropertyDetailModalProps {
  property: Property | null
  isOpen: boolean
  onClose: () => void
}

export default function PropertyDetailModal({ property, isOpen, onClose }: PropertyDetailModalProps) {
  if (!property) return null

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  // Imágenes de ejemplo para el carousel
  const sampleImages = [
    property.image_url,
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">{property.title}</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Image Carousel */}
              <div className="mb-6">
                <ImageCarousel imageUrls={sampleImages} />
              </div>

              {/* Property Info */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{property.address}</span>
                  </div>

                  <div className="text-3xl font-bold text-blue-600 mb-6">
                    {formatPrice(property.price)}
                    {property.status === "En Arriendo" && <span className="text-lg text-gray-500">/mes</span>}
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <BedDouble className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                      <div className="font-semibold">{property.bedrooms}</div>
                      <div className="text-sm text-gray-600">Dormitorios</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Bath className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                      <div className="font-semibold">{property.bathrooms}</div>
                      <div className="text-sm text-gray-600">Baños</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Square className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                      <div className="font-semibold">{property.square_feet}</div>
                      <div className="text-sm text-gray-600">m²</div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Descripción</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Esta hermosa propiedad ofrece un diseño moderno y funcional, perfecta para familias que buscan
                      comodidad y estilo. Con acabados de primera calidad y una ubicación privilegiada, representa una
                      excelente oportunidad de inversión.
                    </p>
                  </div>
                </div>

                <div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Contactar Agente</h3>
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Nombre completo"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="tel"
                        placeholder="Teléfono"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <textarea
                        placeholder="Mensaje (opcional)"
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <motion.button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Enviar Consulta
                      </motion.button>
                    </div>
                  </div>

                  <div className="mt-6 bg-blue-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-3 text-blue-900">Características Adicionales</h3>
                    <ul className="space-y-2 text-blue-800">
                      <li className="flex items-center">
                        <Home className="h-4 w-4 mr-2" />
                        Cocina equipada
                      </li>
                      <li className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Construcción reciente
                      </li>
                      <li className="flex items-center">
                        <Square className="h-4 w-4 mr-2" />
                        Balcón/Terraza
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
