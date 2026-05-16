import { NextRequest, NextResponse } from 'next/server'
import QRCode from 'qrcode'
import { fal } from '@fal-ai/client'
import sharp from 'sharp'

// Configure FAL AI client
fal.config({
  credentials: process.env.FAL_KEY || 'your-fal-key-here'
})

console.log('FAL_KEY configured:', process.env.FAL_KEY ? 'YES' : 'NO')
console.log('FAL_KEY value starts with:', process.env.FAL_KEY ? process.env.FAL_KEY.substring(0, 10) + '...' : 'NONE')

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { url, prompt, style, referenceImage } = body

    if (!url || !prompt) {
      return NextResponse.json({ error: 'URL and prompt are required' }, { status: 400 })
    }

    // Step 1: Generate high-quality QR code
    const qrCodeBuffer = await QRCode.toBuffer(url, {
      width: 1024,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      errorCorrectionLevel: 'H' // High error correction for better AI integration
    })

    // Convert QR buffer to base64 for API
    const qrBase64 = qrCodeBuffer.toString('base64')
    const qrDataUrl = `data:image/png;base64,${qrBase64}`

    // Step 2: Build enhanced prompt based on style
    let enhancedPrompt = prompt

    switch(style) {
      case 'realistic':
        enhancedPrompt = `${prompt}, cinematic lighting, photorealistic, highly detailed, 8k resolution, dramatic fire effects, professional photography, muscular definition, intense atmosphere`
        break
      case 'neon':
        enhancedPrompt = `${prompt}, cyberpunk style, neon lights, electric blue and magenta, futuristic, glowing effects, dark background, sci-fi atmosphere`
        break
      case 'artistic':
        enhancedPrompt = `${prompt}, digital art style, concept art, trending on artstation, vibrant colors, artistic composition, creative interpretation`
        break
      case 'minimal':
        enhancedPrompt = `${prompt}, minimalist design, clean lines, modern aesthetic, geometric patterns, simple color palette, professional design`
        break
      case 'grunge':
        enhancedPrompt = `${prompt}, grungy texture, weathered look, dark atmosphere, metal textures, industrial style, dramatic shadows`
        break
      case 'gradient':
        enhancedPrompt = `${prompt}, smooth gradients, flowing colors, abstract background, modern design, vibrant color transitions`
        break
      default:
        enhancedPrompt = `${prompt}, high quality, professional, detailed, vibrant colors`
    }

    // Skip AI if no valid FAL_KEY
    if (!process.env.FAL_KEY || process.env.FAL_KEY === 'your-fal-key-here' || process.env.FAL_KEY === 'your-test-key-here' || process.env.FAL_KEY === '') {
      console.log('No valid FAL_KEY found. Current FAL_KEY value:', process.env.FAL_KEY || 'undefined')
      console.log('Using enhanced gradient fallback instead of AI generation')
      const fallbackResult = await generateGradientQR(url, style, enhancedPrompt)
      return NextResponse.json({
        success: true,
        qrCodeUrl: fallbackResult.qrCodeUrl,
        finalImage: fallbackResult.finalImage,
        fallback: true,
        message: 'Generated with enhanced gradient background (FAL_KEY not configured)'
      })
    }

    try {
      // Step 3: Try GPTIMG2 first
      try {
        console.log('Trying GPTIMG2 generation with prompt:', enhancedPrompt)
        console.log('FAL client configured with key length:', process.env.FAL_KEY?.length)

        const result = await fal.subscribe('gptimg2', {
          input: {
            prompt: enhancedPrompt,
            image_size: 'square_hd',
            num_inference_steps: 20,
            num_images: 1,
            guidance_scale: 7.5
          }
        }) as any

        console.log('GPTIMG2 result:', JSON.stringify(result, null, 2))

        if (result.data && result.data.images && result.data.images[0]) {
          const aiImageUrl = result.data.images[0].url
          console.log('GPTIMG2 generation successful! Image URL:', aiImageUrl)

          return NextResponse.json({
            success: true,
            qrCodeUrl: qrDataUrl,
            aiBackgroundUrl: aiImageUrl,
            aiModel: 'GPTIMG2',
            message: 'AI background generated with GPTIMG2!'
          })
        } else {
          console.log('GPTIMG2 result structure invalid:', result)
        }
      } catch (gptimg2Error) {
        console.log('GPTIMG2 failed, error details:', gptimg2Error)
        console.log('Error message:', gptimg2Error instanceof Error ? gptimg2Error.message : String(gptimg2Error))

        // Step 4: Fallback to NANOBANANA2
        try {
          console.log('Trying NANOBANANA2 as fallback...')
          const fallbackResult = await fal.subscribe('nanobanana2', {
            input: {
              prompt: enhancedPrompt,
              image_size: 'square_hd',
              num_inference_steps: 15,
              num_images: 1,
              guidance_scale: 6.0
            }
          }) as any

          console.log('NANOBANANA2 result:', JSON.stringify(fallbackResult, null, 2))

          if (fallbackResult.data && fallbackResult.data.images && fallbackResult.data.images[0]) {
            const aiImageUrl = fallbackResult.data.images[0].url
            console.log('NANOBANANA2 generation successful!')

            return NextResponse.json({
              success: true,
              qrCodeUrl: qrDataUrl,
              aiBackgroundUrl: aiImageUrl,
              aiModel: 'NANOBANANA2',
              message: 'AI background generated with NANOBANANA2!'
            })
          }
        } catch (nanoBananaError) {
          console.log('NANOBANANA2 also failed:', nanoBananaError)
          console.log('NANOBANANA2 Error message:', nanoBananaError instanceof Error ? nanoBananaError.message : String(nanoBananaError))
        }
      }
    } catch (aiError) {
      console.log('AI generation failed, falling back to gradient:', aiError)
      console.log('AI Error message:', aiError instanceof Error ? aiError.message : String(aiError))
    }

    // Step 5: Fallback to programmatic gradient if AI fails
    const fallbackResult = await generateGradientQR(url, style, enhancedPrompt)

    return NextResponse.json({
      success: true,
      qrCodeUrl: fallbackResult.qrCodeUrl,
      finalImage: fallbackResult.finalImage,
      fallback: true,
      message: 'Generated with beautiful gradient background'
    })

  } catch (error) {
    console.error('Error generating QR code:', error)
    return NextResponse.json(
      { error: 'Failed to generate QR code' },
      { status: 500 }
    )
  }
}

async function generateGradientQR(url: string, style: string, prompt: string) {
  // Generate QR code
  const qrCodeBuffer = await QRCode.toBuffer(url, {
    width: 512,
    margin: 2,
    color: {
      dark: '#000000',
      light: '#FFFFFF'
    },
    errorCorrectionLevel: 'H'
  })

  // Create beautiful gradient background based on style
  const width = 1024
  const height = 1024

  let gradientColors = ''
  let backgroundEffects = ''

  switch(style) {
    case 'realistic':
      gradientColors = `
        <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1" />
        <stop offset="25%" style="stop-color:#FF4500;stop-opacity:0.8" />
        <stop offset="50%" style="stop-color:#FF6B35;stop-opacity:0.9" />
        <stop offset="75%" style="stop-color:#F7931E;stop-opacity:0.7" />
        <stop offset="100%" style="stop-color:#C0392B;stop-opacity:0.6" />
      `
      backgroundEffects = `
        <ellipse cx="30%" cy="40%" rx="250" ry="150" fill="#FF4500" opacity="0.4" filter="url(#fireGlow)" />
        <ellipse cx="70%" cy="60%" rx="200" ry="300" fill="#FF6B35" opacity="0.3" filter="url(#fireGlow)" />
        <ellipse cx="60%" cy="20%" rx="180" ry="120" fill="#F7931E" opacity="0.5" filter="url(#fireGlow)" />
        <ellipse cx="20%" cy="80%" rx="160" ry="200" fill="#C0392B" opacity="0.3" filter="url(#fireGlow)" />
        <text x="50%" y="15%" text-anchor="middle" fill="#FF6B35" font-size="32" font-weight="bold" opacity="0.6" filter="url(#fireGlow)">
          FIRE WARRIOR
        </text>
      `
      break
    case 'neon':
      gradientColors = `
        <stop offset="0%" style="stop-color:#00D4FF;stop-opacity:1" />
        <stop offset="50%" style="stop-color:#FF00FF;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#00FF88;stop-opacity:1" />
      `
      backgroundEffects = `
        <rect x="10%" y="10%" width="80%" height="80%" fill="none" stroke="#00D4FF" stroke-width="2" opacity="0.3" />
        <rect x="15%" y="15%" width="70%" height="70%" fill="none" stroke="#FF00FF" stroke-width="2" opacity="0.2" />
      `
      break
    default:
      gradientColors = `
        <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
      `
      backgroundEffects = ''
  }

  const svgBackground = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="mainGradient" cx="50%" cy="50%">
          ${gradientColors}
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="15" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="fireGlow">
          <feGaussianBlur stdDeviation="25" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="url(#mainGradient)" />
      ${backgroundEffects}
      <text x="50%" y="95%" text-anchor="middle" fill="white" font-size="16" font-weight="bold" opacity="0.7">
        Scan to visit: ${url.replace('https://', '').replace('http://', '').split('/')[0]}
      </text>
    </svg>
  `

  // Convert SVG to buffer and composite with QR
  const backgroundBuffer = Buffer.from(svgBackground)
  const background = await sharp(backgroundBuffer).png().toBuffer()

  const composite = await sharp(background)
    .composite([
      {
        input: qrCodeBuffer,
        top: Math.floor((height - 512) / 2),
        left: Math.floor((width - 512) / 2),
        blend: 'over'
      }
    ])
    .png()
    .toBuffer()

  const qrCodeDataUrl = `data:image/png;base64,${qrCodeBuffer.toString('base64')}`
  const finalImageDataUrl = `data:image/png;base64,${composite.toString('base64')}`

  return {
    qrCodeUrl: qrCodeDataUrl,
    finalImage: finalImageDataUrl
  }
}