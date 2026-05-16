import { NextRequest, NextResponse } from 'next/server'
import { generateQRCode } from '@/lib/qr-generator'
import { generateAIImage } from '@/lib/ai-image-generator'

export async function POST(request: NextRequest) {
  try {
    // Temporarily disabled auth for demo
    const userId = 'demo-user'

    const body = await request.json()
    const { name, url, prompt, useAI } = body

    if (!name || !url) {
      return NextResponse.json({ error: 'Name and URL are required' }, { status: 400 })
    }

    // Generate QR code
    const qrCodeUrl = await generateQRCode(url, {
      width: 512,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    })

    let imageUrl = null

    // Generate AI background if requested
    if (useAI && prompt) {
      try {
        imageUrl = await generateAIImage({
          prompt: prompt || 'modern abstract background for QR code, professional marketing material',
          width: 1024,
          height: 1024
        })
      } catch (error) {
        console.error('AI generation failed:', error)
        // Continue without AI image if it fails
      }
    }

    return NextResponse.json({
      qrCodeUrl,
      imageUrl,
      name,
      url
    })
  } catch (error) {
    console.error('Error generating QR code:', error)
    return NextResponse.json(
      { error: 'Failed to generate QR code' },
      { status: 500 }
    )
  }
}