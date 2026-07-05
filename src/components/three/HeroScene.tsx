import { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, Environment, Lightformer } from '@react-three/drei'
import { NfcCard } from './NfcCard'

/**
 * Escena del hero. Export default para poder cargarla con React.lazy —
 * three.js queda en un chunk aparte y no pesa en la carga inicial.
 * El render se pausa cuando el hero sale del viewport.
 */
export default function HeroScene() {
  const wrapper = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(true)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const el = wrapper.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) =>
      setInView(entry.isIntersecting),
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={wrapper}
      className={`h-full w-full transition-opacity duration-700 ${
        ready ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <Canvas
        frameloop={inView ? 'always' : 'never'}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5.8], fov: 38 }}
        gl={{
          alpha: true,
          // En pantallas de alta densidad el antialias casi no se nota
          // y sí cuesta — se activa solo donde hace diferencia
          antialias: window.devicePixelRatio <= 1.3,
          powerPreference: 'high-performance',
        }}
        onCreated={() => setReady(true)}
      >
        <ambientLight intensity={0.7} />
        <NfcCard />
        <ContactShadows
          position={[0, -1.7, 0]}
          opacity={0.4}
          scale={8}
          blur={2.6}
          far={2.2}
          resolution={128}
          color="#000000"
        />
        {/* Iluminación de estudio generada localmente — sin HDRIs de red.
            Resolución baja: el costo de generar el mapa (PMREM) baja mucho
            y en superficies curvas la diferencia visual es mínima */}
        <Environment resolution={64} frames={1}>
          <Lightformer intensity={2.2} position={[0, 3, 4]} scale={[7, 3, 1]} />
          <Lightformer
            intensity={1.6}
            color="#2f66ff"
            position={[-5, -1, 3]}
            scale={[3, 4, 1]}
          />
          <Lightformer
            intensity={1.4}
            position={[5, 1, -3]}
            rotation-y={Math.PI / 2}
            scale={[3, 5, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  )
}
