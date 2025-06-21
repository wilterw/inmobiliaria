export const dynamic = 'force-dynamic'
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import FilterSidebar from "@/components/filter-sidebar"
import PropertyList from "@/components/property-list"
import { useTheme } from "@/components/theme-provider"
import PropertyDetailModal from "@/components/property-detail-modal"

export type Property = {
  id: string
  title: string
  description?: string
  address: string
  city: string
  state: string
  price: number
  status: string
  propertyType: string
  bedrooms: number
  bathrooms: number
  squareFeet: number
  yearBuilt?: number
  parking: number
  images: string[]
  features: string[]
  latitude?: number
  longitude?: number
  contactName?: string
  contactEmail?: string
  contactPhone?: string
  contactLink?: string
  isFeatured: boolean
}

export type Filters = {
  activeTab: "Compra" | "Venta" | "Arriendo"
  location: string
  priceMin: string
  priceMax: string
  bedrooms: number | null
  bathrooms: number | null
  propertyType: string
}

export default function RealEstatePortal() {
  const { config } = useTheme()
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [filters, setFilters] = useState<Filters>({
    activeTab: "Compra",
    location: "",
    priceMin: "",
    priceMax: "",
    bedrooms: null,
    bathrooms: null,
    propertyType: "",
  })

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchProperties = async (currentFilters?: Filters) => {
    try {
      setLoading(true)
      setError(null)

      const queryParams = new URLSearchParams()
      const filtersToUse = currentFilters || filters

      if (filtersToUse.location) queryParams.append("location", filtersToUse.location)
      if (filtersToUse.priceMin) queryParams.append("priceMin", filtersToUse.priceMin)
      if (filtersToUse.priceMax) queryParams.append("priceMax", filtersToUse.priceMax)
      if (filtersToUse.bedrooms) queryParams.append("bedrooms", filtersToUse.bedrooms.toString())
      if (filtersToUse.bathrooms) queryParams.append("bathrooms", filtersToUse.bathrooms.toString())
      if (filtersToUse.propertyType) queryParams.append("propertyType", filtersToUse.propertyType)
      if (filtersToUse.activeTab !== "Compra") queryParams.append("status", filtersToUse.activeTab)

      const response = await fetch(`/api/properties?${queryParams}`)

      if (!response.ok) {
        throw new Error("Error al cargar las propiedades")
      }

      const data = await response.json()
      setProperties(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  const applyFilters = () => {
    fetchProperties(filters)
  }

  const openPropertyModal = (property: Property) => {
    setSelectedProperty(property)
    setIsModalOpen(true)
  }

  const closePropertyModal = () => {
    setSelectedProperty(null)
    setIsModalOpen(false)
  }

  if (!config) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-lg">Cargando...</div>
      </div>
    )
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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{config.siteName}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{config.siteDescription}</p>
        </motion.div>

        {/* Error State */}
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">{error}</div>}

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Filter Sidebar */}
          <div className="md:col-span-3">
            <FilterSidebar filters={filters} setFilters={setFilters} onApplyFilters={applyFilters} loading={loading} />
          </div>

          {/* Property List */}
          <div className="md:col-span-9">
            <PropertyList properties={properties} loading={loading} onPropertyClick={openPropertyModal} />
          </div>
        </div>
      </div>

      {/* Modal de detalles */}
      <PropertyDetailModal property={selectedProperty} isOpen={isModalOpen} onClose={closePropertyModal} />
    </div>
  )
}
