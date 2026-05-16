'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useUser, UserButton } from '@clerk/nextjs'
import { QrCode, Plus, Download, Eye, Trash2, BarChart3, Link2, Sparkles } from 'lucide-react'

interface QRCodeData {
  id: string
  name: string
  url: string
  imageUrl: string
  qrCodeUrl: string
  scans: number
  createdAt: string
  isActive: boolean
}

export default function Dashboard() {
  const { user } = useUser()
  const [qrCodes, setQrCodes] = useState<QRCodeData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchQRCodes()
  }, [])

  const fetchQRCodes = async () => {
    try {
      const response = await fetch('/api/qr-codes')
      if (response.ok) {
        const data = await response.json()
        setQrCodes(data)
      }
    } catch (error) {
      console.error('Error fetching QR codes:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteQRCode = async (id: string) => {
    if (!confirm('Are you sure you want to delete this QR code?')) return

    try {
      const response = await fetch(`/api/qr-codes/${id}`, { method: 'DELETE' })
      if (response.ok) {
        setQrCodes(qrCodes.filter(qr => qr.id !== id))
      }
    } catch (error) {
      console.error('Error deleting QR code:', error)
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
              <span className="text-gray-400">Hi, {user?.firstName || 'User'}</span>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your QR Codes</h1>
          <Link href="/generate" className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold flex items-center gap-2 transition">
            <Plus className="h-5 w-5" />
            Create New
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Total QR Codes</span>
              <QrCode className="h-5 w-5 text-purple-500" />
            </div>
            <p className="text-3xl font-bold">{qrCodes.length}</p>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Total Scans</span>
              <BarChart3 className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold">{qrCodes.reduce((sum, qr) => sum + qr.scans, 0)}</p>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Credits Left</span>
              <Sparkles className="h-5 w-5 text-yellow-500" />
            </div>
            <p className="text-3xl font-bold">10</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          </div>
        ) : qrCodes.length === 0 ? (
          <div className="text-center py-12 bg-gray-900/50 border border-gray-800 rounded-xl">
            <QrCode className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No QR Codes Yet</h3>
            <p className="text-gray-400 mb-6">Create your first AI-powered QR code to get started</p>
            <Link href="/generate" className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition">
              <Plus className="h-5 w-5" />
              Create Your First QR Code
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {qrCodes.map((qrCode) => (
              <div key={qrCode.id} className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden hover:border-purple-500/50 transition">
                <div className="aspect-square bg-gray-800 relative">
                  {qrCode.imageUrl && (
                    <img src={qrCode.imageUrl} alt={qrCode.name} className="w-full h-full object-cover" />
                  )}
                  {qrCode.qrCodeUrl && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <img src={qrCode.qrCodeUrl} alt="QR Code" className="w-32 h-32 bg-white p-2 rounded" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{qrCode.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                    <Link2 className="h-4 w-4" />
                    <span className="truncate">{qrCode.url}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <Eye className="h-4 w-4" />
                      <span>{qrCode.scans} scans</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-gray-800 rounded transition" title="Download">
                        <Download className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteQRCode(qrCode.id)}
                        className="p-2 hover:bg-red-900/20 text-red-400 rounded transition"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}