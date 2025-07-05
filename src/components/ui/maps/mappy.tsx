'use client'

import { useState, useMemo } from 'react'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import { Search, MapPin, Clock, Phone, Star, QrCode, X, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/dashboard/card'
import { Badge } from '@/components/ui/badge'
import { useIsMobile } from '@/hooks/use-mobile'
import { Profile } from '@/lib/definitions'
import Link from 'next/link'

interface MapPageProps {
  profiles: Profile[];
}

export default function MapPage({ profiles }: MapPageProps) {
  // Transform profiles into store format
  const stores = profiles.map(profile => ({
    id: profile.profileId,
    name: profile.name,
    position: { lat: profile.coordX, lng: profile.coordY },
    address: profile.location,
    phone: profile.phone,
    hours: '7:00 AM - 10:00 PM', // This should come from profile data in the future
    rating: 4.8, // This should be calculated from profile.reviews
    reviews: profile.reviews.length,
    status: 'open', // This should be determined by business hours
    category: profile.menu[0]?.name || 'Restaurant' // Using first category as main type
  }))
  const [selectedStore, setSelectedStore] = useState<typeof stores[0] | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map')
  const [showSidebar, setShowSidebar] = useState(false)
  const [showQRScanner, setShowQRScanner] = useState(false)
  
  const isMobile = useIsMobile()

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  })

  const center = useMemo(() => ({
    lat: stores[0]?.position.lat || 36.8065,
    lng: stores[0]?.position.lng || 10.1815
  }), [])

  const filteredStores = useMemo(() => {
    return stores.filter(store =>
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  if (loadError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="w-96">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="text-red-500 text-6xl">🗺️</div>
              <h2 className="text-xl font-semibold">Map Failed to Load</h2>
              <p className="text-gray-600">Please check your internet connection and try again.</p>
              <Button onClick={() => window.location.reload()}>
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isLoaded) {
    return null // Let Next.js loading.tsx handle this
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              alt=""
              src="/favicon.ico"
              className="h-8 w-auto"
            />
            <h1 className="text-xl font-semibold text-gray-900">Blink</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* QR Code Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowQRScanner(true)}
              className="hidden sm:flex"
            >
              <QrCode className="w-4 h-4 mr-1" />
              Scan QR
            </Button>
            
            {/* Mobile Menu Button */}
            {isMobile && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSidebar(!showSidebar)}
              >
                <Menu className="w-4 h-4" />
              </Button>
            )}
            
            {/* Desktop View Mode Toggle */}
            {!isMobile && (
              <>
                <Button
                  variant={viewMode === 'map' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('map')}
                >
                  <MapPin className="w-4 h-4 mr-1" />
                  Map
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  List
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 bg-white border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search restaurants, cafés, or addresses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2"
          />
        </div>
        
        {/* Mobile QR Button */}
        {isMobile && (
          <div className="mt-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowQRScanner(true)}
              className="w-full"
            >
              <QrCode className="w-4 h-4 mr-2" />
              Scan QR Code to Find Restaurant
            </Button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {viewMode === 'map' || isMobile ? (
          <div className="flex-1 relative">
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}
              center={center}
              zoom={13}
              options={{
                styles: [
                  {
                    featureType: 'poi',
                    elementType: 'labels',
                    stylers: [{ visibility: 'off' }]
                  }
                ]
              }}
            >
              {filteredStores.map(store => (
                <Marker
                  key={store.id}
                  position={store.position}
                  title={store.name}
                  onClick={() => setSelectedStore(store)}
                  icon={{
                    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="16" cy="16" r="16" fill="#324A59"/>
                        <circle cx="16" cy="16" r="8" fill="white"/>
                      </svg>
                    `),
                    scaledSize: new window.google.maps.Size(32, 32)
                  }}
                />
              ))}

              {selectedStore && (
                <InfoWindow
                  position={selectedStore.position}
                  onCloseClick={() => setSelectedStore(null)}
                >
                  <div className="p-2 max-w-xs">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{selectedStore.name}</h3>
                        <Badge variant="outline" className="text-xs mt-1">
                          {selectedStore.category}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{selectedStore.address}</p>
                    <div className="flex items-center mt-2 space-x-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{selectedStore.rating}</span>
                      <span className="text-sm text-gray-500">({selectedStore.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center mt-2 space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{selectedStore.hours}</span>
                    </div>
                    <div className="flex items-center mt-2 space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{selectedStore.phone}</span>
                    </div>
                      <Button
                        size="sm"
                        className="mt-4 w-full cursor-pointer"
                        onClick={() => window.location.href = `/${selectedStore.id}/menu`}
                      >
                        View Menu
                      </Button>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </div>
        ) : (
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {filteredStores.map(store => (
                <Card key={store.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{store.name}</h3>
                          <Badge variant={store.status === 'open' ? 'default' : 'secondary'}>
                            {store.status}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {store.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{store.address}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span>{store.rating}</span>
                            <span>({store.reviews})</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{store.hours}</span>
                          </div>
                        </div>
                      </div>
                        <Button
                          size="sm"
                          className="ml-4 cursor-pointer"
                          onClick={() => window.location.href = `/${store.id}/menu`}
                        >
                          View Menu
                        </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Store List Sidebar */}
        {(!isMobile || showSidebar) && (
          <div className={`bg-white border-l overflow-y-auto ${
            isMobile 
              ? 'absolute inset-y-0 right-0 w-80 z-50 shadow-xl' 
              : 'w-80'
          }`}>
            {/* Mobile Close Button */}
            {isMobile && (
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="font-semibold text-gray-900">Nearby Restaurants</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSidebar(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
            
            {!isMobile && (
              <div className="p-4 border-b">
                <h2 className="font-semibold text-gray-900">Nearby Restaurants</h2>
                <p className="text-sm text-gray-600 mt-1">Select a restaurant or scan QR code</p>
              </div>
            )}
            
            <div className="p-4 space-y-3">
              {filteredStores.map(store => (
                <Card 
                  key={store.id} 
                  className={`cursor-pointer transition-all ${
                    selectedStore?.id === store.id 
                      ? 'ring-2 ring-blue-500 bg-blue-50' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    setSelectedStore(store)
                    if (isMobile) setShowSidebar(false)
                  }}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-medium text-gray-900 text-sm">{store.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {store.category}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{store.address}</p>
                        <div className="flex items-center space-x-2">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs font-medium">{store.rating}</span>
                          <span className="text-xs text-gray-500">({store.reviews})</span>
                          <Badge variant="outline" className="text-xs">
                            {store.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* QR Scanner Modal */}
      {showQRScanner && (
        <div className="bg-opacity-40 backdrop-blur-sm fixed inset-0 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="text-6xl">📱</div>
                <h2 className="text-xl font-semibold">Scan QR Code</h2>
                <p className="text-gray-600">
                  Point your camera at a restaurant's QR code to instantly access their digital menu
                </p>
                <div className="space-y-2">
                  <Button className="w-full" onClick={() => setShowQRScanner(false)}>
                    Open Camera
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => setShowQRScanner(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
