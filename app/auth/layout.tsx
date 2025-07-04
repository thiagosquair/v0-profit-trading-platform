import type React from "react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div 
      className="min-h-screen relative flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url(\"/images/background2.png\")", // <--- THIS IS THE CRUCIAL CHANGE
      }}
    >
      {/* Dark overlay for better form readability */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-md mx-auto p-6">
        {children}
      </div>
    </div>
  )
}
