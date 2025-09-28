import React, { createContext, useContext, useReducer, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import api from "@/api/axiosConfig"

// Interfaces like User, AuthState, RegisterData etc. remain the same...
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

// --- FIX #1: Update the type definition for the register function ---
interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>
  register: (userData: FormData) => Promise<any> // Changed from RegisterData to FormData
  logout: () => void
  clearError: () => void
}

interface RegisterData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  phone?: string
  avatar?: any
}

type AuthAction =
  | { type: "AUTH_START" }
  | { type: "AUTH_SUCCESS"; payload: { user: User; token: string } }
  | { type: "AUTH_FAILURE"; payload: string }
  | { type: "LOGOUT" }
  | { type: "CLEAR_ERROR" }
  | { type: "SET_LOADING"; payload: boolean }

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isLoading: true,
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
      return { ...state, isLoading: false, isAuthenticated: false, user: null, token: null, error: action.payload }
    case "LOGOUT":
      return { ...state, isAuthenticated: false, user: null, token: null, error: null }
    case "CLEAR_ERROR":
      return { ...state, error: null }
    case "SET_LOADING":
      return { ...state, isLoading: action.payload }
    default:
      return state
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
        const response = await api.get("/auth/me")
        dispatch({
          type: "AUTH_SUCCESS",
          payload: { user: response.data.user, token },
        })
      } catch (error) {
        localStorage.removeItem("token")
        localStorage.removeItem("refreshToken")
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
      const response = await api.post("/auth/login", { email, password })
      const { user, token, refreshToken } = response.data

      localStorage.setItem("token", token)
      localStorage.setItem("refreshToken", refreshToken)

      dispatch({ type: "AUTH_SUCCESS", payload: { user, token } })
      navigate("/")
    } catch (error: any) {
      const message = error.response?.data?.message || "Network error. Please try again."
      dispatch({ type: "AUTH_FAILURE", payload: message })
      throw error
    }
  }

  // --- FIX #2: Update the function to accept FormData ---
  const register = async (userData: FormData) => { // Changed from RegisterData
    dispatch({ type: "AUTH_START" })
    try {
      // Axios will automatically set the correct 'Content-Type' header
      const response = await api.post("/auth/register", userData)
      dispatch({ type: "SET_LOADING", payload: false })
      return response.data
    } catch (error: any) {
      const message = error.response?.data?.message || "Network error. Please try again."
      dispatch({ type: "AUTH_FAILURE", payload: message })
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("refreshToken")
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