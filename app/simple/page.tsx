'use client'

import { useState } from 'react'
import { QrCode, Sparkles, Download, Loader2 } from 'lucide-react'
import QRCode from 'qrcode'

export default function SimpleQRGenerator() {
  const [loading, setLoading] = useState(false)
  const [url, setUrl] = useState('')
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null)

  const generateQR = async () => {
    if (!url) return

    setLoading(true)
    try {
      const dataUrl = await QRCode.toDataURL(url, {
        width: 512,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        },
        errorCorrectionLevel: 'M'
      })
      setQrCodeDataUrl(dataUrl)
    } catch (error) {
      console.error('Error generating QR code:', error)
      alert('Failed to generate QR code')
    } finally {
      setLoading(false)
    }
  }

  const downloadQR = () => {
    if (!qrCodeDataUrl) return

    const a = document.createElement('a')
    a.href = qrCodeDataUrl
    a.download = 'qrcode.png'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <nav className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <QrCode className="h-8 w-8 text-purple-500" />
              <span className="ml-2 text-xl font-bold">QRGraphics - Simple Mode</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Generate QR Code Instantly
          </h1>
          <p className="text-gray-400">Create scannable QR codes for any URL - no login required!</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Enter URL</label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg focus:border-purple-500 focus:outline-none"
              />
            </div>

            <button
              onClick={generateQR}
              disabled={loading || !url}
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Generate QR Code
                </>
              )}
            </button>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8">
            {qrCodeDataUrl ? (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <img src={qrCodeDataUrl} alt="QR Code" className="w-64 h-64 bg-white p-4 rounded" />
                </div>
                <button
                  onClick={downloadQR}
                  className="w-full py-2 border border-gray-700 hover:border-gray-600 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
                >
                  <Download className="h-4 w-4" />
                  Download QR Code
                </button>
              </div>
            ) : (
              <div className="text-center py-12">
                <QrCode className="h-24 w-24 text-gray-700 mx-auto mb-4" />
                <p className="text-gray-400">Your QR code will appear here</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 text-center text-gray-400">
          <p className="mb-4">Want AI-powered graphics and analytics?</p>
          <a href="/create" className="text-purple-400 hover:text-purple-300 transition">
            Create Stunning QR Art →
          </a>
        </div>
      </div>
    </div>
  )
}