import { SignUpForm } from "@/components/auth/signup-form"

export default function SignUpPage() {
  return (
    <div className="min-h-screen relative flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/background2.png')",
        }}
      >
        {/* Dark overlay for better form readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-md mx-auto p-6">
        <SignUpForm />
      </div>
    </div>
  )
}

