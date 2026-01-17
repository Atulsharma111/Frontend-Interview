import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { PenSquare, Home } from 'lucide-react'

export function Header() {
  const location = useLocation()

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary text-primary-foreground rounded-lg p-2">
              <Home className="h-5 w-5" />
            </div>
            <span className="font-bold text-xl">Blog App</span>
          </Link>

          <nav className="flex items-center gap-4">
            <Button
              variant={location.pathname === '/' ? 'default' : 'ghost'}
              asChild
            >
              <Link to="/">All Blogs</Link>
            </Button>
            <Button
              variant={location.pathname === '/create' ? 'default' : 'outline'}
              asChild
            >
              <Link to="/create">
                <PenSquare className="mr-2 h-4 w-4" />
                Create Blog
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
