import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const config = await prisma.siteConfig.findUnique({
      where: { id: "main" },
    })

    const themes = await prisma.theme.findMany({
      orderBy: { name: "asc" },
    })

    return NextResponse.json({ config, themes })
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener configuración" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()

    const config = await prisma.siteConfig.upsert({
      where: { id: "main" },
      update: body,
      create: { id: "main", ...body },
    })

    return NextResponse.json(config)
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar configuración" }, { status: 500 })
  }
}
