'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react'
import { useState, useEffect } from 'react'

export type ToastType = 'success' | 'error' | 'info'

interface ToastProps {
  type: ToastType
  message: string
  duration?: number
  onClose?: () => void
}

export function Toast({ type, message, duration = 5000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onClose?.()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const iconMap = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <AlertCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
  }

  const colorMap = {
    success: 'bg-green-50 text-green-900 border-green-200',
    error: 'bg-red-50 text-red-900 border-red-200',
    info: 'bg-blue-50 text-blue-900 border-blue-200',
  }

  const iconColorMap = {
    success: 'text-green-600',
    error: 'text-red-600',
    info: 'text-blue-600',
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: -20, x: 20 }}
          className={`${colorMap[type]} border rounded-lg p-4 flex items-start gap-3 max-w-md shadow-lg`}
        >
          <span className={iconColorMap[type]}>{iconMap[type]}</span>
          <p className="flex-1 font-medium text-sm">{message}</p>
          <button
            onClick={() => setIsVisible(false)}
            className="text-current opacity-50 hover:opacity-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Hook for managing toasts
export function useToast() {
  const [toasts, setToasts] = useState<Array<ToastProps & { id: string }>>([])

  const addToast = (toast: ToastProps) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts((prev) => [...prev, { ...toast, id }])

    return id
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return { toasts, addToast, removeToast }
}
