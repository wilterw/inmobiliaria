import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Desactivar todos los temas
    await prisma.theme.updateMany({
      data: { isActive: false },
    })

    // Activar el tema seleccionado
    const theme = await prisma.theme.update({
      where: { id: params.id },
      data: { isActive: true },
    })

    // Actualizar la configuración del sitio
    const colors = JSON.parse(theme.colors)
    await prisma.siteConfig.update({
      where: { id: "main" },
      data: {
        theme: theme.name,
        primaryColor: colors.primary,
        secondaryColor: colors.secondary,
        accentColor: colors.accent,
      },
    })

    return NextResponse.json(theme)
  } catch (error) {
    return NextResponse.json({ error: "Error al activar tema" }, { status: 500 })
  }
}
