import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const themes = await prisma.theme.findMany({
      orderBy: { name: "asc" },
    })
    return NextResponse.json(themes)
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener temas" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Desactivar tema anterior si este es activo
    if (body.isActive) {
      await prisma.theme.updateMany({
        where: { isActive: true },
        data: { isActive: false },
      })
    }

    const theme = await prisma.theme.create({
      data: body,
    })

    return NextResponse.json(theme)
  } catch (error) {
    return NextResponse.json({ error: "Error al crear tema" }, { status: 500 })
  }
}
