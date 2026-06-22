import React, { useState, useEffect } from 'react'
import { motion, useSpring } from 'motion/react'

function Star({
  mousePos,
  containerRef,
}: {
  mousePos: { x: number | null; y: number | null }
  containerRef: React.RefObject<HTMLDivElement>
}) {
  const [pos] = useState(() => ({ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }))
  const [size] = useState(() => 1 + Math.random() * 2)
  const [dur] = useState(() => 2 + Math.random() * 3)
  const [delay] = useState(() => Math.random() * 5)
  const cfg = { stiffness: 100, damping: 15, mass: 0.1 }
  const sx = useSpring(0, cfg)
  const sy = useSpring(0, cfg)

  useEffect(() => {
    if (!containerRef.current || mousePos.x === null || mousePos.y === null) {
      sx.set(0); sy.set(0); return
    }
    const r = containerRef.current.getBoundingClientRect()
    const dx = mousePos.x - (r.left + (parseFloat(pos.left) / 100) * r.width)
    const dy = mousePos.y - (r.top  + (parseFloat(pos.top)  / 100) * r.height)
    const d = Math.sqrt(dx * dx + dy * dy)
    if (d < 600) { const f = 1 - d / 600; sx.set(dx * f * 0.5); sy.set(dy * f * 0.5) }
    else { sx.set(0); sy.set(0) }
  }, [mousePos, pos, containerRef, sx, sy])

  return (
    <motion.div
      className="absolute bg-[#0D3A35] dark:bg-[#ECEFE9] rounded-full"
      style={{ top: pos.top, left: pos.left, width: `${size}px`, height: `${size}px`, x: sx, y: sy }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: dur, repeat: Infinity, delay }}
    />
  )
}

export function Starfield({
  count = 150,
  mousePos,
  containerRef,
}: {
  count?: number
  mousePos: { x: number | null; y: number | null }
  containerRef: React.RefObject<HTMLDivElement>
}) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} mousePos={mousePos} containerRef={containerRef} />
      ))}
    </div>
  )
}
