import React from 'react'
import { motion } from 'motion/react'

interface LinkCardProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  number: number
  title: string
  description: string
  imageUrl: string
  href: string
}

const LinkCard = React.forwardRef<HTMLAnchorElement, LinkCardProps>(
  ({ className, number, title, description, imageUrl, href, ...props }, ref) => {
    return (
      <motion.a
        ref={ref}
        href={href}
        className={[
          'group relative flex h-72 w-full flex-col justify-between overflow-hidden',
          'rounded-2xl border border-gray-200 dark:border-white/10',
          'bg-[#FBF6F0] dark:bg-[#0D3A35] p-7 shadow-sm no-underline',
          className || '',
        ].join(' ')}
        initial={{ scale: 1, y: 0 }}
        whileHover={{ scale: 1.025, y: -5, transition: { type: 'spring', stiffness: 300, damping: 15 } }}
        aria-label={title}
        {...(props as any)}
      >
        {/* Step number + title */}
        <div className="z-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-7 h-7 rounded-full bg-[#276152] text-white text-sm font-black flex items-center justify-center shrink-0">
              {number}
            </span>
            <h3 className="text-lg font-black text-[#0D3A35] dark:text-[#ECEFE9]">{title}</h3>
          </div>
          <p className="text-sm text-[#0D3A35]/60 dark:text-[#ECEFE9]/55 max-w-[65%] leading-relaxed">
            {description}
          </p>
        </div>

        {/* Image — bottom-right, partially cropped */}
        <div className="absolute bottom-0 right-0 h-44 w-44 translate-x-6 translate-y-6">
          <img
            src={imageUrl}
            alt=""
            className="h-full w-full object-cover rounded-xl transition-transform duration-300 ease-out group-hover:scale-110"
          />
        </div>
      </motion.a>
    )
  }
)

LinkCard.displayName = 'LinkCard'

export { LinkCard }
