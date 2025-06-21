import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const location = searchParams.get("location")
    const priceMin = searchParams.get("priceMin")
    const priceMax = searchParams.get("priceMax")
    const bedrooms = searchParams.get("bedrooms")
    const bathrooms = searchParams.get("bathrooms")
    const status = searchParams.get("status")
    const propertyType = searchParams.get("propertyType")
    const featured = searchParams.get("featured")

    const where: any = {
      isActive: true,
    }

    if (location) {
      where.OR = [
        { address: { contains: location, mode: "insensitive" } },
        { city: { contains: location, mode: "insensitive" } },
        { state: { contains: location, mode: "insensitive" } },
      ]
    }

    if (priceMin || priceMax) {
      where.price = {}
      if (priceMin) where.price.gte = Number.parseInt(priceMin)
      if (priceMax) where.price.lte = Number.parseInt(priceMax)
    }

    if (bedrooms) where.bedrooms = { gte: Number.parseInt(bedrooms) }
    if (bathrooms) where.bathrooms = { gte: Number.parseInt(bathrooms) }
    if (status && status !== "Compra") where.status = status
    if (propertyType) where.propertyType = propertyType
    if (featured === "true") where.isFeatured = true

    const properties = await prisma.property.findMany({
      where,
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    })

    return NextResponse.json(properties)
  } catch (error) {
    console.error("Error fetching properties:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const property = await prisma.property.create({
      data: {
        ...body,
        price: Number.parseInt(body.price),
        bedrooms: Number.parseInt(body.bedrooms),
        bathrooms: Number.parseInt(body.bathrooms),
        squareFeet: Number.parseInt(body.squareFeet),
        yearBuilt: body.yearBuilt ? Number.parseInt(body.yearBuilt) : null,
        parking: Number.parseInt(body.parking) || 0,
        latitude: body.latitude ? Number.parseFloat(body.latitude) : null,
        longitude: body.longitude ? Number.parseFloat(body.longitude) : null,
      },
    })

    return NextResponse.json(property)
  } catch (error) {
    console.error("Error creating property:", error)
    return NextResponse.json({ error: "Error al crear la propiedad" }, { status: 500 })
  }
}
