import { Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Logo({ className, size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  }

  return (
    <div className={cn('flex items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 p-1.5', className)}>
      <Zap className={cn('text-white', sizeClasses[size])} />
    </div>
  )
} 