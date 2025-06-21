import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const property = await prisma.property.findUnique({
      where: { id: params.id },
      include: {
        inquiries: {
          orderBy: { createdAt: "desc" },
        },
      },
    })

    if (!property) {
      return NextResponse.json({ error: "Propiedad no encontrada" }, { status: 404 })
    }

    return NextResponse.json(property)
  } catch (error) {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    const property = await prisma.property.update({
      where: { id: params.id },
      data: {
        ...body,
        price: body.price ? Number.parseInt(body.price) : undefined,
        bedrooms: body.bedrooms ? Number.parseInt(body.bedrooms) : undefined,
        bathrooms: body.bathrooms ? Number.parseInt(body.bathrooms) : undefined,
        squareFeet: body.squareFeet ? Number.parseInt(body.squareFeet) : undefined,
        yearBuilt: body.yearBuilt ? Number.parseInt(body.yearBuilt) : undefined,
        parking: body.parking ? Number.parseInt(body.parking) : undefined,
        latitude: body.latitude ? Number.parseFloat(body.latitude) : undefined,
        longitude: body.longitude ? Number.parseFloat(body.longitude) : undefined,
      },
    })

    return NextResponse.json(property)
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar la propiedad" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.property.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Error al eliminar la propiedad" }, { status: 500 })
  }
}
