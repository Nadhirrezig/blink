import { Card, CardContent } from '@/components/ui/dashboard/card'

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-96">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="animate-spin text-4xl">🗺️</div>
            <h2 className="text-xl font-semibold">Loading Map</h2>
            <p className="text-gray-600">Please wait while we load your map...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 