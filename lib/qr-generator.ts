import QRCode from 'qrcode'

export interface QROptions {
  width: number
  margin: number
  color: {
    dark: string
    light: string
  }
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H'
}

export async function generateQRCode(
  text: string,
  options: Partial<QROptions> = {}
): Promise<string> {
  const defaultOptions: QROptions = {
    width: 512,
    margin: 2,
    color: {
      dark: '#000000',
      light: '#FFFFFF'
    },
    errorCorrectionLevel: 'M'
  }

  const finalOptions = { ...defaultOptions, ...options }

  try {
    const qrCodeDataURL = await QRCode.toDataURL(text, finalOptions)
    return qrCodeDataURL
  } catch (error) {
    console.error('Error generating QR code:', error)
    throw new Error('Failed to generate QR code')
  }
}

export async function generateQRCodeBuffer(
  text: string,
  options: Partial<QROptions> = {}
): Promise<Buffer> {
  const defaultOptions: QROptions = {
    width: 512,
    margin: 2,
    color: {
      dark: '#000000',
      light: '#FFFFFF'
    },
    errorCorrectionLevel: 'M'
  }

  const finalOptions = { ...defaultOptions, ...options }

  try {
    const buffer = await QRCode.toBuffer(text, finalOptions)
    return buffer
  } catch (error) {
    console.error('Error generating QR code buffer:', error)
    throw new Error('Failed to generate QR code buffer')
  }
}