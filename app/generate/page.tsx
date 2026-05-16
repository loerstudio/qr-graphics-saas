'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useUser, UserButton } from '@clerk/nextjs'
import { QrCode, ArrowLeft, Sparkles, Download, Loader2 } from 'lucide-react'

export default function Generate() {
  const router = useRouter()
  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    prompt: '',
    useAI: true,
  })
  const [result, setResult] = useState<{
    qrCodeUrl: string
    imageUrl?: string
    combinedUrl?: string
  } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const data = await response.json()
        setResult(data)
      } else {
        alert('Failed to generate QR code. Please try again.')
      }
    } catch (error) {
      console.error('Error generating QR code:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const downloadImage = (url: string, filename: string) => {
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const saveQRCode = async () => {
    if (!result) return

    setLoading(true)
    try {
      const response = await fetch('/api/qr-codes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          qrCodeUrl: result.qrCodeUrl,
          imageUrl: result.imageUrl,
        }),
      })

      if (response.ok) {
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Error saving QR code:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <nav className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <QrCode className="h-8 w-8 text-purple-500" />
                <span className="ml-2 text-xl font-bold">QRGraphics</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="px-4 py-2 text-gray-300 hover:text-white transition flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Link>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Generate New QR Code</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">QR Code Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900/50 border border-gray-800 rounded-lg focus:border-purple-500 focus:outline-none"
                  placeholder="e.g., Summer Sale Campaign"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Destination URL</label>
                <input
                  type="url"
                  required
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900/50 border border-gray-800 rounded-lg focus:border-purple-500 focus:outline-none"
                  placeholder="https://example.com/product"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 mb-4">
                  <input
                    type="checkbox"
                    checked={formData.useAI}
                    onChange={(e) => setFormData({ ...formData, useAI: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-800 bg-gray-900/50 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm font-medium">Generate AI Background</span>
                  <Sparkles className="h-4 w-4 text-purple-400" />
                </label>

                {formData.useAI && (
                  <div>
                    <label className="block text-sm font-medium mb-2">AI Prompt (Optional)</label>
                    <textarea
                      value={formData.prompt}
                      onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-900/50 border border-gray-800 rounded-lg focus:border-purple-500 focus:outline-none h-32 resize-none"
                      placeholder="Describe the background you want... e.g., 'Modern tech pattern with blue gradients' or 'Elegant floral design for fashion brand'"
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
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
            </form>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8">
            {result ? (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-4">Your QR Code is Ready!</h3>

                {result.imageUrl && (
                  <div className="relative">
                    <img src={result.imageUrl} alt="AI Background" className="w-full rounded-lg" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img src={result.qrCodeUrl} alt="QR Code" className="w-32 h-32 bg-white p-2 rounded shadow-2xl" />
                    </div>
                  </div>
                )}

                {!result.imageUrl && (
                  <div className="flex justify-center">
                    <img src={result.qrCodeUrl} alt="QR Code" className="w-64 h-64 bg-white p-4 rounded" />
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => downloadImage(result.qrCodeUrl, 'qrcode.png')}
                    className="flex-1 py-2 border border-gray-700 hover:border-gray-600 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
                  >
                    <Download className="h-4 w-4" />
                    Download QR
                  </button>

                  {result.imageUrl && (
                    <button
                      onClick={() => downloadImage(result.imageUrl!, 'qr-with-background.png')}
                      className="flex-1 py-2 border border-gray-700 hover:border-gray-600 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
                    >
                      <Download className="h-4 w-4" />
                      Download Full
                    </button>
                  )}
                </div>

                <button
                  onClick={saveQRCode}
                  disabled={loading}
                  className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Saving...' : 'Save to Dashboard'}
                </button>
              </div>
            ) : (
              <div className="text-center py-12">
                <QrCode className="h-24 w-24 text-gray-700 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Preview Area</h3>
                <p className="text-gray-400">Your generated QR code will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}