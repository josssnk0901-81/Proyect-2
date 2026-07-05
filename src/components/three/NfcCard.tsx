import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Float, RoundedBox } from '@react-three/drei'
import { MathUtils } from 'three'
import type { Group } from 'three'

const VOLT = '#2f66ff'

/**
 * Tarjeta NFC estilizada, construida solo con primitivas — cero modelos
 * externos, bajo conteo de polígonos. Sigue al cursor con suavizado en
 * desktop; en táctil el puntero queda al centro y solo flota.
 */
export function NfcCard() {
  const group = useRef<Group>(null)

  // Escala la tarjeta para que siempre quepa, aun en pantallas muy angostas
  const viewportWidth = useThree((state) => state.viewport.width)
  const scale = Math.min(1, viewportWidth / 4.1)

  const reduceMotion = useMemo(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )

  useFrame((state, delta) => {
    const g = group.current
    if (!g || reduceMotion) return
    g.rotation.y = MathUtils.damp(g.rotation.y, state.pointer.x * 0.35, 3, delta)
    g.rotation.x = MathUtils.damp(g.rotation.x, -state.pointer.y * 0.25, 3, delta)
  })

  return (
    <group ref={group} scale={scale}>
      <Float
        speed={reduceMotion ? 0 : 1.6}
        rotationIntensity={reduceMotion ? 0 : 0.35}
        floatIntensity={reduceMotion ? 0 : 0.9}
      >
        <group rotation={[0.12, -0.4, 0.05]}>
          {/* Cuerpo de la tarjeta */}
          <RoundedBox args={[3.4, 2.15, 0.09]} radius={0.13} smoothness={4}>
            <meshPhysicalMaterial
              color="#151c2e"
              metalness={0.7}
              roughness={0.25}
              clearcoat={1}
              clearcoatRoughness={0.18}
            />
          </RoundedBox>

          {/* Chip de contacto */}
          <RoundedBox
            args={[0.52, 0.4, 0.03]}
            radius={0.06}
            smoothness={3}
            position={[-1.05, 0.28, 0.05]}
          >
            <meshStandardMaterial color="#d7b26d" metalness={1} roughness={0.35} />
          </RoundedBox>

          {/* Símbolo NFC: tres ondas + punto de origen */}
          {[0.16, 0.3, 0.44].map((radius) => (
            <mesh key={radius} position={[0.98, 0.42, 0.05]} rotation={[0, 0, -Math.PI / 4]}>
              <torusGeometry args={[radius, 0.018, 8, 24, Math.PI / 2]} />
              <meshStandardMaterial
                color={VOLT}
                emissive={VOLT}
                emissiveIntensity={1.6}
                toneMapped={false}
              />
            </mesh>
          ))}
          <mesh position={[0.98, 0.42, 0.05]}>
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshStandardMaterial
              color={VOLT}
              emissive={VOLT}
              emissiveIntensity={1.6}
              toneMapped={false}
            />
          </mesh>

          {/* Relieve del nombre */}
          <mesh position={[-0.85, -0.5, 0.05]}>
            <boxGeometry args={[1.2, 0.07, 0.02]} />
            <meshStandardMaterial color="#566175" metalness={0.5} roughness={0.5} />
          </mesh>
          <mesh position={[-1.08, -0.68, 0.05]}>
            <boxGeometry args={[0.74, 0.07, 0.02]} />
            <meshStandardMaterial color="#3c4658" metalness={0.5} roughness={0.5} />
          </mesh>

          {/* Filo luminoso derecho */}
          <mesh position={[1.68, 0, 0]}>
            <boxGeometry args={[0.02, 1.85, 0.06]} />
            <meshStandardMaterial
              color="#0a0d15"
              emissive={VOLT}
              emissiveIntensity={2.2}
              toneMapped={false}
            />
          </mesh>
        </group>
      </Float>
    </group>
  )
}
