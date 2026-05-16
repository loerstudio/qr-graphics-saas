import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { qrCodes } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Temporarily disabled auth for demo
    const userId = 'demo-user'

    const { id } = await params

    await db
      .delete(qrCodes)
      .where(and(eq(qrCodes.id, id), eq(qrCodes.userId, userId)))

    return NextResponse.json({ message: 'QR code deleted successfully' })
  } catch (error) {
    console.error('Error deleting QR code:', error)
    return NextResponse.json(
      { error: 'Failed to delete QR code' },
      { status: 500 }
    )
  }
}