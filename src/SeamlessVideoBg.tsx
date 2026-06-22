import { useEffect, useRef, useState } from 'react'

interface Props {
  src: string
  fade?: number
  playbackRate?: number
  filter?: string
  className?: string
}

export default function SeamlessVideoBg({ src, fade = 1.4, playbackRate = 1, filter, className }: Props) {
  const refA = useRef<HTMLVideoElement>(null)
  const refB = useRef<HTMLVideoElement>(null)
  const [front, setFront] = useState(0)
  const stateRef = useRef({ active: 0, switching: false })

  useEffect(() => {
    [refA.current, refB.current].forEach(v => { if (v) v.playbackRate = playbackRate })
  }, [playbackRate])

  useEffect(() => {
    const a = refA.current, b = refB.current
    if (!a || !b) return
    const st = stateRef.current
    a.muted = true; b.muted = true
    a.play().catch(() => {})

    const tick = setInterval(() => {
      const vids = [a, b]
      const cur = vids[st.active]
      if (!cur || !cur.duration || st.switching) return
      const remaining = (cur.duration - cur.currentTime) / (cur.playbackRate || 1)
      if (remaining <= fade) {
        st.switching = true
        const next = vids[1 - st.active]
        try { next.currentTime = 0 } catch {}
        next.play().catch(() => {})
        setFront(1 - st.active)
        setTimeout(() => {
          cur.pause()
          st.active = 1 - st.active
          st.switching = false
        }, fade * 1000)
      }
    }, 200)

    return () => clearInterval(tick)
  }, [src, fade])

  const base = 'absolute inset-0 w-full h-full object-cover transition-opacity'
  const dur = `duration-[${Math.round(fade * 1000)}ms]`

  return (
    <div className={className ?? 'absolute inset-0 w-full h-full'} style={filter ? { filter } : undefined}>
      <video ref={refA} src={src} muted playsInline preload="auto" loop={false}
        className={`${base} ${dur} ${front === 0 ? 'opacity-100' : 'opacity-0'}`} />
      <video ref={refB} src={src} muted playsInline preload="auto" loop={false}
        className={`${base} ${dur} ${front === 1 ? 'opacity-100' : 'opacity-0'}`} />
    </div>
  )
}
