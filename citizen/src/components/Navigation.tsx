"use client"
import { Link, useLocation } from "react-router-dom"
import { Bell, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const Navigation = () => {
  const location = useLocation()
  const { user, logout } = useAuth()

  const isActive = (path: string) => location.pathname === path

  const getInitials = (firstName?: string, lastName?: string) => {
    const f = (firstName || "").trim().charAt(0).toUpperCase()
    const l = (lastName || "").trim().charAt(0).toUpperCase()
    return f + l || "NA"
  }

  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "User"

  return (
    <nav className="bg-card border-b border-border shadow-[var(--shadow-card)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {/* --- LOGO CHANGE HERE --- */}
              {/* The DIV with "CP" has been replaced by this IMG tag */}
              <img
                src="/src/favicon.png" // IMPORTANT: Replace with the path to your logo
                alt="CityPulse Logo"
                className="w-8 h-8 object-contain"
              />
              <Link to="/" className="text-xl font-bold text-primary">
                Citypulse
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                isActive("/")
                  ? "text-primary border-b-2 border-primary pb-1"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/report"
              className={`text-sm font-medium transition-colors ${
                isActive("/report")
                  ? "text-primary border-b-2 border-primary pb-1"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              Report Issue
            </Link>
            <Link
              to="/track"
              className={`text-sm font-medium transition-colors ${
                isActive("/track")
                  ? "text-primary border-b-2 border-primary pb-1"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              Track Issues
            </Link>
            <Link
              to="/community"
              className={`text-sm font-medium transition-colors ${
                isActive("/community")
                  ? "text-primary border-b-2 border-primary pb-1"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              Community
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="relative" aria-label="Notifications">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-accent rounded-full text-xs" />
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-0 rounded-full" aria-label="Open user menu">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={fullName} />
                      <AvatarFallback>{getInitials(user.firstName, user.lastName)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="font-medium">{fullName}</span>
                      {user.email ? <span className="text-xs text-muted-foreground">{user.email}</span> : null}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="w-full">
                      Edit Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault()
                      logout()
                    }}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button size="sm">Sign In</Button>
              </Link>
            )}

            <Button variant="ghost" size="sm" className="md:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}