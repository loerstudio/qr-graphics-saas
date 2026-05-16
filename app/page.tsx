import Link from 'next/link'
import { ArrowRight, QrCode, Sparkles, Zap, Shield, Globe, BarChart3 } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <nav className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <QrCode className="h-8 w-8 text-purple-500" />
              <span className="ml-2 text-xl font-bold">QRGraphics</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/simple" className="px-4 py-2 text-gray-300 hover:text-white transition">
                Simple QR
              </Link>
              <Link href="/create" className="px-4 py-2 bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 rounded-lg transition">
                Create Pro QR
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 rounded-full mb-6">
            <Sparkles className="h-4 w-4 text-purple-400" />
            <span className="text-sm text-purple-300">AI-Powered QR Code Generation</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Create Stunning QR Codes
            <br />
            with AI Graphics
          </h1>

          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Transform your boring QR codes into eye-catching marketing materials.
            Generate custom graphics with AI and integrate scannable QR codes that redirect to your products.
          </p>

          <div className="flex gap-4 justify-center">
            <Link href="/create" className="px-8 py-4 bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 rounded-lg font-semibold flex items-center gap-2 transition transform hover:scale-105">
              Create Stunning QR Art
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href="/simple" className="px-8 py-4 border border-gray-700 hover:border-gray-600 rounded-lg font-semibold transition">
              Try Simple Mode
            </Link>
          </div>

          <p className="text-sm text-gray-500 mt-4">No credit card required • 10 free QR codes</p>
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"></div>
        </div>
      </section>

      <section id="features" className="py-20 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Powerful Features</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition">
              <div className="bg-purple-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Image Generation</h3>
              <p className="text-gray-400">
                Create unique backgrounds and designs using advanced AI models. Just describe what you want.
              </p>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition">
              <div className="bg-green-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <QrCode className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart QR Integration</h3>
              <p className="text-gray-400">
                Seamlessly blend QR codes with your custom graphics while maintaining perfect scannability.
              </p>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition">
              <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Analytics Dashboard</h3>
              <p className="text-gray-400">
                Track scans, locations, devices, and more with our comprehensive analytics platform.
              </p>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition">
              <div className="bg-yellow-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Generation</h3>
              <p className="text-gray-400">
                Generate QR codes in seconds. Download in multiple formats including PNG, SVG, and PDF.
              </p>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition">
              <div className="bg-red-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Reliable</h3>
              <p className="text-gray-400">
                Enterprise-grade security with SSL encryption. Your QR codes work forever, guaranteed.
              </p>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition">
              <div className="bg-indigo-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-indigo-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Custom Domains</h3>
              <p className="text-gray-400">
                Use your own domain for branded short URLs. Perfect for professional marketing campaigns.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Simple Pricing</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-2">Free</h3>
              <p className="text-3xl font-bold mb-4">€0<span className="text-lg text-gray-400">/month</span></p>
              <ul className="text-left space-y-2 text-gray-400 mb-6">
                <li>• 10 QR codes/month</li>
                <li>• Basic analytics</li>
                <li>• Standard support</li>
              </ul>
              <Link href="/simple" className="block w-full py-2 border border-gray-700 hover:border-gray-600 rounded-lg transition text-center">
                Get Started
              </Link>
            </div>

            <div className="bg-gradient-to-b from-purple-900/20 to-gray-900/50 border border-purple-500 rounded-xl p-6 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-purple-500 text-sm px-3 py-1 rounded-full">Popular</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Pro</h3>
              <p className="text-3xl font-bold mb-4">€19<span className="text-lg text-gray-400">/month</span></p>
              <ul className="text-left space-y-2 text-gray-400 mb-6">
                <li>• Unlimited QR codes</li>
                <li>• Advanced analytics</li>
                <li>• Priority support</li>
                <li>• Custom branding</li>
              </ul>
              <button className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition">
                Upgrade to Pro
              </button>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
              <p className="text-3xl font-bold mb-4">€99<span className="text-lg text-gray-400">/month</span></p>
              <ul className="text-left space-y-2 text-gray-400 mb-6">
                <li>• Everything in Pro</li>
                <li>• API access</li>
                <li>• Custom domain</li>
                <li>• Dedicated support</li>
              </ul>
              <button className="w-full py-2 border border-gray-700 hover:border-gray-600 rounded-lg transition">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-800 py-8 px-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <QrCode className="h-6 w-6 text-purple-500" />
            <span className="ml-2 font-semibold">QRGraphics</span>
          </div>
          <p className="text-gray-400 text-sm">© 2024 QRGraphics. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
