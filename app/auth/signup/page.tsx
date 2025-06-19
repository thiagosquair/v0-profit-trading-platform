import SignUpForm from "@/components/auth/signup-form"
import { AuthGuard } from "@/components/auth/auth-guard"

export default function SignUpPage() {
  return (
    <AuthGuard requireAuth={false}>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <SignUpForm />
        </div>
      </div>
    </AuthGuard>
  )
}
