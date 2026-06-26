'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  actionLabel?: string
  onAction?: () => void
  loading?: boolean
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  actionLabel,
  onAction,
  loading = false,
}: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card border border-border rounded-lg shadow-2xl w-full max-w-md z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-2xl font-bold text-foreground">{title}</h2>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">{children}</div>

            {/* Footer */}
            {actionLabel && (
              <div className="flex gap-4 p-6 border-t border-border">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-border text-foreground rounded-lg font-semibold hover:bg-secondary transition disabled:opacity-50"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={onAction}
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 inline-flex items-center justify-center gap-2"
                  disabled={loading}
                >
                  {loading && <span className="animate-spin">⏳</span>}
                  {actionLabel}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
