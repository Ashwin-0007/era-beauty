import { useLocation, useNavigate } from 'react-router-dom'
import type { BaseButtonProps, SmoothScrollProps } from '../../types/ui'
import { Button } from './Button'

export interface SmoothScrollButtonProps extends BaseButtonProps, SmoothScrollProps {}

export function SmoothScrollButton({
  targetId,
  targetPath,
  variant = 'outline',
  size = 'md',
  className = '',
  icon,
  children,
}: SmoothScrollButtonProps) {
  const location = useLocation()
  const navigate = useNavigate()

  const handleClick = () => {
    const isCurrentPage = !targetPath || location.pathname === targetPath

    if (isCurrentPage) {
      const element = document.getElementById(targetId)
      if (element) {
        const headerOffset = window.innerWidth >= 1024 ? 112 : 96
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth',
        })
        window.history.pushState(null, '', `#${targetId}`)
        return
      }
    }

    const destination = targetPath ? `${targetPath}#${targetId}` : `#${targetId}`
    navigate(destination)
  }

  return (
    <Button
      type="button"
      onClick={handleClick}
      variant={variant}
      size={size}
      icon={icon}
      className={className}
    >
      {children}
    </Button>
  )
}
