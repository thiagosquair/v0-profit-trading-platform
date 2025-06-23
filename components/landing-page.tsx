import type React from "react"

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <img src="/images/profitz-logo.png" alt="ProFitz Trading Psychology Lab" className="h-12 w-auto" />
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Home
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                About
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Services
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Contact
              </a>
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <a href="#" className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Unlock Your Trading Potential</h1>
            <p className="text-lg text-gray-600 mb-8">
              Master your emotions and make smarter trading decisions with ProFitz.
            </p>
            <a
              href="#"
              className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-xl"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-2">Emotional Intelligence</h3>
              <p className="text-gray-600">Develop the skills to manage your emotions effectively.</p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-2">Risk Management</h3>
              <p className="text-gray-600">Learn how to assess and mitigate risks in your trading strategies.</p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-2">Performance Tracking</h3>
              <p className="text-gray-600">Monitor your progress and identify areas for improvement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-8 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center mb-4">
                <img src="/images/profitz-logo.png" alt="ProFitz Trading Psychology Lab" className="h-16 w-auto" />
              </div>
              <p className="text-gray-400">© 2023 ProFitz. All rights reserved.</p>
            </div>
            <div>
              <nav className="flex flex-col space-y-2">
                <a href="#" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  Contact Us
                </a>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
