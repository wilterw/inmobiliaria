import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const inquiries = await prisma.inquiry.findMany({
      include: {
        property: {
          select: {
            title: true,
            address: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(inquiries)
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener consultas" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const inquiry = await prisma.inquiry.create({
      data: body,
    })

    return NextResponse.json({
      success: true,
      message: "Consulta enviada exitosamente",
      inquiry,
    })
  } catch (error) {
    return NextResponse.json({ error: "Error al procesar la consulta" }, { status: 500 })
  }
}
