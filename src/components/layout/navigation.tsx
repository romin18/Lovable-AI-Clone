import Link from 'next/link'
import { cn } from '@/lib/utils'

interface NavigationProps {
  mobile?: boolean
}

const navigationItems = [
  { href: '/community', label: 'Community' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/enterprise', label: 'Enterprise' },
  { href: '/learn', label: 'Learn' },
  { href: '/launched', label: 'Launched' },
]

export function Navigation({ mobile = false }: NavigationProps) {
  return (
    <nav className={cn(
      mobile 
        ? 'flex flex-col space-y-2' 
        : 'flex items-center space-x-6'
    )}>
      {navigationItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            mobile 
              ? 'py-2 px-0 text-left'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
} 