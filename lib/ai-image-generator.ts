import Replicate from 'replicate'

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
})

export interface ImageGenerationOptions {
  prompt: string
  width?: number
  height?: number
  numOutputs?: number
}

export async function generateAIImage(options: ImageGenerationOptions): Promise<string> {
  try {
    const output = await replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      {
        input: {
          prompt: `${options.prompt}, high quality, professional, clean design, marketing material`,
          negative_prompt: "blurry, low quality, distorted, ugly",
          width: options.width || 1024,
          height: options.height || 1024,
          num_outputs: options.numOutputs || 1,
          scheduler: "K_EULER",
          num_inference_steps: 30,
          guidance_scale: 7.5,
        }
      }
    )

    const imageUrls = output as string[]
    return imageUrls[0]
  } catch (error) {
    console.error('Error generating AI image:', error)
    throw new Error('Failed to generate AI image')
  }
}

export async function combineQRWithImage(
  qrCodeBuffer: Buffer,
  backgroundImageUrl: string
): Promise<Buffer> {
  try {
    const output = await replicate.run(
      "tencentarc/photomaker-style:467d062309da518648ba89d226490e02b8ed09b5abc15026e54e31c5a8cd0769",
      {
        input: {
          style_image: backgroundImageUrl,
          prompt: "QR code integrated into artistic design, centered, visible, scannable",
          num_outputs: 1,
        }
      }
    )

    const result = output as unknown as string
    return Buffer.from(result)
  } catch (error) {
    console.error('Error combining QR with image:', error)
    throw new Error('Failed to combine QR code with background')
  }
}