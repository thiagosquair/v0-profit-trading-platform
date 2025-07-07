// app/dashboard/layout.tsx - FIXED VERSION
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar'
import { UserProvider } from '@/contexts/UserContext'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <UserProvider>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <DashboardSidebar />
        
        {/* Main content area */}
        <div className="flex-1 flex flex-col ml-64">
          {/* Header */}
          <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-900">
                Trading Psychology Dashboard
              </h1>
            </div>
          </header>
          
          {/* Page content */}
          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </UserProvider>
  )
}
