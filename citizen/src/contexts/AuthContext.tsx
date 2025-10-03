import React, { createContext, useContext, useReducer, useEffect, ReactNode } from "react"
// Note: You might need to install react-router-dom if you haven't already
import { useNavigate } from "react-router-dom"
import api from "@/api/axiosConfig"

// --- Interfaces ---
interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: "citizen"
  avatar?: string
  isEmailVerified: boolean
  preferences: {
    notifications: {
      email: boolean
      push: boolean
      sms: boolean
    }
    language: string
    theme: string
  }
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>
  register: (userData: FormData) => Promise<any>
  logout: () => void
  clearError: () => void
}

type AuthAction =
  | { type: "AUTH_START" }
  | { type: "AUTH_SUCCESS"; payload: { user: User; token: string } }
  | { type: "AUTH_FAILURE"; payload: string }
  | { type: "LOGOUT" }
  | { type: "CLEAR_ERROR" }
  | { type: "SET_LOADING"; payload: boolean }

// --- Initial State and Reducer ---
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isLoading: true, // Start with loading true to check token
  error: null,
}

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, isLoading: true, error: null }
    case "AUTH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      }
    case "AUTH_FAILURE":
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      return { ...state, isLoading: false, isAuthenticated: false, user: null, token: null, error: action.payload }
    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      return { ...state, isAuthenticated: false, user: null, token: null, error: null }
    case "CLEAR_ERROR":
      return { ...state, error: null }
    case "SET_LOADING":
      return { ...state, isLoading: action.payload }
    default:
      return state
  }
}

// --- Context and Provider ---
const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)
  const navigate = useNavigate()

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token")
      if (!token) {
        dispatch({ type: "SET_LOADING", payload: false })
        return
      }

      try {
        // *** FIX #1: Corrected API path for fetching user data ***
        const response = await api.get("/api/auth/me")
        dispatch({
          type: "AUTH_SUCCESS",
          payload: { user: response.data.user || response.data, token },
        })
      } catch (error) {
        dispatch({ type: "LOGOUT" })
      } finally {
        dispatch({ type: "SET_LOADING", payload: false })
      }
    }
    verifyToken()
  }, [])

  const login = async (email: string, password: string) => {
    dispatch({ type: "AUTH_START" })
    try {
      // *** FIX #2: Corrected API path for login ***
      const response = await api.post("/api/auth/login", { email, password })
      const { user, token, refreshToken } = response.data

      localStorage.setItem("token", token)
      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken)
      }

      dispatch({ type: "AUTH_SUCCESS", payload: { user, token } })
      navigate("/") // Redirect to home on successful login
    } catch (error: any) {
      const message = error.response?.data?.message || "Network error. Please try again."
      dispatch({ type: "AUTH_FAILURE", payload: message })
      throw error
    }
  }

  const register = async (userData: FormData) => {
    dispatch({ type: "AUTH_START" })
    try {
      // *** FIX #3: Corrected API path for registration ***
      const response = await api.post("/api/auth/register", userData)
      // On successful registration, you might want to log the user in
      // or simply return the success message.
      dispatch({ type: "SET_LOADING", payload: false })
      return response.data
    } catch (error: any) {
      const message = error.response?.data?.message || "Network error. Please try again."
      dispatch({ type: "AUTH_FAILURE", payload: message })
      throw error
    }
  }

  const logout = () => {
    dispatch({ type: "LOGOUT" })
    navigate("/login")
  }

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" })
  }

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    clearError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

