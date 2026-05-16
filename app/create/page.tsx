'use client'

import { useState, useRef } from 'react'
import { QrCode, Sparkles, Download, Loader2, Upload, Image as ImageIcon, Palette, Zap } from 'lucide-react'
import QRCode from 'qrcode'

export default function CreateQR() {
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    url: '',
    prompt: '',
    style: 'realistic',
    colors: {
      primary: '#FF6B35',
      secondary: '#F7931E',
      background: '#1A1A1A'
    },
    referenceImage: null as string | null
  })

  const [result, setResult] = useState<{
    qrCodeUrl: string
    finalImage: string
  } | null>(null)

  const styles = [
    { id: 'realistic', name: 'Realistic Fire', icon: '🔥', description: 'Photorealistic flames and effects' },
    { id: 'neon', name: 'Neon Cyber', icon: '🌃', description: 'Cyberpunk neon glow style' },
    { id: 'artistic', name: 'Artistic', icon: '🎨', description: 'Creative artistic interpretation' },
    { id: 'minimal', name: 'Minimal Tech', icon: '⚡', description: 'Clean tech aesthetic' },
    { id: 'grunge', name: 'Grunge Metal', icon: '🎸', description: 'Dark and gritty style' },
    { id: 'gradient', name: 'Gradient Flow', icon: '🌊', description: 'Smooth gradient transitions' }
  ]

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({ ...formData, referenceImage: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const generateStunningQR = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/generate-pro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const data = await response.json()
        setResult({
          qrCodeUrl: data.qrCodeUrl,
          finalImage: data.finalImage
        })
      } else {
        alert('Failed to generate QR code. Please try again.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const downloadImage = () => {
    if (!result) return
    const a = document.createElement('a')
    a.href = result.finalImage
    a.download = 'stunning-qr-code.png'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/10 to-black text-white">
      <nav className="border-b border-gray-800 backdrop-blur-sm bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <QrCode className="h-8 w-8 text-purple-500" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                QRGraphics Pro
              </span>
            </div>
            <div className="flex gap-4">
              <a href="/" className="px-4 py-2 text-gray-300 hover:text-white transition">Home</a>
              <a href="/simple" className="px-4 py-2 text-gray-300 hover:text-white transition">Simple Mode</a>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent">
              Create Stunning QR Art
            </span>
          </h1>
          <p className="text-xl text-gray-400">
            Transform your QR codes into eye-catching visual masterpieces with AI
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Form */}
          <div className="space-y-6">
            {/* Step 1: URL */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <h3 className="text-lg font-semibold">Your Destination</h3>
              </div>
              <input
                type="url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                placeholder="https://salutediferro.com"
                className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none"
              />
            </div>

            {/* Step 2: Prompt */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <h3 className="text-lg font-semibold">Describe Your Vision</h3>
              </div>
              <textarea
                value={formData.prompt}
                onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
                placeholder="Muscular warrior emerging from flames and lightning, intense dramatic lighting, fire effects, professional fitness photography style..."
                className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none h-32 resize-none"
              />

              {/* Reference Image Upload */}
              <div className="mt-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-3 border-2 border-dashed border-gray-700 hover:border-purple-500 rounded-lg transition flex items-center justify-center gap-2"
                >
                  <Upload className="h-5 w-5" />
                  {formData.referenceImage ? 'Change Reference Image' : 'Upload Reference Image (Optional)'}
                </button>
                {formData.referenceImage && (
                  <div className="mt-3 relative">
                    <img
                      src={formData.referenceImage}
                      alt="Reference"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Step 3: Style Selection */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <h3 className="text-lg font-semibold">Choose Style</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {styles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setFormData({ ...formData, style: style.id })}
                    className={`p-4 rounded-lg border-2 transition ${
                      formData.style === style.id
                        ? 'border-purple-500 bg-purple-500/10'
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <div className="text-2xl mb-1">{style.icon}</div>
                    <div className="text-sm font-semibold">{style.name}</div>
                    <div className="text-xs text-gray-500 mt-1">{style.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generateStunningQR}
              disabled={loading || !formData.url || !formData.prompt}
              className="w-full py-4 bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="h-6 w-6 animate-spin" />
                  Creating Your Masterpiece...
                </>
              ) : (
                <>
                  <Sparkles className="h-6 w-6" />
                  Generate Stunning QR Art
                </>
              )}
            </button>
          </div>

          {/* Right: Preview */}
          <div className="lg:sticky lg:top-8">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
              {result ? (
                <div className="space-y-6">
                  <div className="relative">
                    {/* Show the AI-generated image with QR code integrated */}
                    <div className="aspect-square rounded-xl overflow-hidden">
                      <img src={result.finalImage} alt="Stunning QR Art" className="w-full h-full object-cover" />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={downloadImage}
                      className="flex-1 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
                    >
                      <Download className="h-5 w-5" />
                      Download HD
                    </button>
                    <button className="flex-1 py-3 border border-gray-700 hover:border-gray-600 rounded-lg font-semibold transition">
                      Share
                    </button>
                  </div>

                  <div className="text-center text-sm text-gray-500">
                    QR Code is fully scannable • 4K Resolution • Commercial Use
                  </div>
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-orange-500/20 to-purple-600/20 rounded-full mb-6">
                    <QrCode className="h-16 w-16 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Your Design Preview</h3>
                  <p className="text-gray-400">
                    Fill in the details and watch your vision come to life
                  </p>

                  <div className="mt-8 space-y-3">
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <Zap className="h-4 w-4 text-yellow-500" />
                      <span>AI-Powered Generation</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <Palette className="h-4 w-4 text-purple-500" />
                      <span>Custom Art Styles</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <ImageIcon className="h-4 w-4 text-green-500" />
                      <span>High Resolution Output</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Examples Gallery */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-8">Inspiration Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { style: 'Fire Warrior', gradient: 'from-orange-500 to-red-600' },
              { style: 'Neon City', gradient: 'from-cyan-500 to-purple-600' },
              { style: 'Nature', gradient: 'from-green-500 to-teal-600' },
              { style: 'Abstract', gradient: 'from-pink-500 to-purple-600' },
              { style: 'Tech', gradient: 'from-blue-500 to-indigo-600' },
              { style: 'Vintage', gradient: 'from-amber-500 to-orange-600' },
              { style: 'Space', gradient: 'from-purple-500 to-indigo-600' },
              { style: 'Minimal', gradient: 'from-gray-500 to-gray-700' }
            ].map((example, i) => (
              <div key={i} className="group cursor-pointer">
                <div className={`aspect-square bg-gradient-to-br ${example.gradient} rounded-xl opacity-80 hover:opacity-100 transition flex items-center justify-center`}>
                  <QrCode className="h-16 w-16 text-white/50" />
                </div>
                <p className="text-sm text-center mt-2 text-gray-400">{example.style}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}