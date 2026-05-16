import { NextRequest, NextResponse } from 'next/server'
import QRCode from 'qrcode'
import sharp from 'sharp'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { url, prompt, style, colors, referenceImage } = body

    if (!url || !prompt) {
      return NextResponse.json({ error: 'URL and prompt are required' }, { status: 400 })
    }

    // Generate QR code with transparent background
    const qrOptions = {
      width: 1024,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF00' // Transparent
      },
      errorCorrectionLevel: 'H' as const
    }

    const qrCodeBuffer = await QRCode.toBuffer(url, qrOptions)

    // Create gradient background based on style
    const width = 1024
    const height = 1024

    let backgroundGradient = ''

    switch(style) {
      case 'realistic':
        backgroundGradient = `
          <defs>
            <radialGradient id="fire" cx="50%" cy="50%">
              <stop offset="0%" style="stop-color:#FF6B35;stop-opacity:1" />
              <stop offset="50%" style="stop-color:#F7931E;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#C0392B;stop-opacity:1" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="12" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <rect width="100%" height="100%" fill="url(#fire)" />
          <circle cx="30%" cy="40%" r="200" fill="#FF6B35" opacity="0.4" filter="url(#glow)" />
          <circle cx="70%" cy="60%" r="150" fill="#F7931E" opacity="0.3" filter="url(#glow)" />
        `
        break
      case 'neon':
        backgroundGradient = `
          <defs>
            <linearGradient id="neon" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#00D4FF;stop-opacity:1" />
              <stop offset="50%" style="stop-color:#FF00FF;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#00FF88;stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="#000000" />
          <rect width="100%" height="100%" fill="url(#neon)" opacity="0.3" />
        `
        break
      case 'gradient':
        backgroundGradient = `
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:${colors?.primary || '#FF6B35'};stop-opacity:1" />
              <stop offset="100%" style="stop-color:${colors?.secondary || '#F7931E'};stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#gradient)" />
        `
        break
      default:
        backgroundGradient = `
          <rect width="100%" height="100%" fill="${colors?.background || '#1A1A1A'}" />
        `
    }

    // Create SVG with background
    const svgBackground = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        ${backgroundGradient}
        <text x="50%" y="10%" text-anchor="middle" fill="white" font-size="48" font-weight="bold" opacity="0.8">
          ${prompt.slice(0, 30)}...
        </text>
      </svg>
    `

    // Convert SVG to buffer
    const backgroundBuffer = Buffer.from(svgBackground)
    const background = await sharp(backgroundBuffer)
      .png()
      .toBuffer()

    // Composite QR code over background with blend
    const composite = await sharp(background)
      .composite([
        {
          input: qrCodeBuffer,
          top: Math.floor(height * 0.25),
          left: Math.floor(width * 0.25),
          blend: 'over'
        }
      ])
      .png()
      .toBuffer()

    // Convert to base64 for response
    const qrCodeDataUrl = `data:image/png;base64,${qrCodeBuffer.toString('base64')}`
    const finalImageDataUrl = `data:image/png;base64,${composite.toString('base64')}`

    return NextResponse.json({
      qrCodeUrl: qrCodeDataUrl,
      finalImage: finalImageDataUrl,
      message: 'QR code generated successfully!'
    })

  } catch (error) {
    console.error('Error generating QR code:', error)
    return NextResponse.json(
      { error: 'Failed to generate QR code' },
      { status: 500 }
    )
  }
}