import './App.css';
import { Suspense, useLayoutEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

export default function App() {
  return (
    <Canvas shadows camera={{ position: [10, 4, 0 ], near: 0.1, far: 50 }}>
      <ambientLight intensity={0.8} />
      <spotLight angle={0.2} color="#ffd0d0" penumbra={1} position={[60, 60, -40]} shadow-mapSize={[2048, 2048]} shadow-bias={-0.0001} castShadow />
      <Suspense fallback={null}>
          <Harrypotter scale={0.5} position={[0, 0, 0]} />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minAzimuthAngle={Math.PI / 3}
        maxAzimuthAngle={Math.PI / 1.5}
        maxPolarAngle={Math.PI / 2.5}
        minPolarAngle={Math.PI / 2.5}
        screenSpacePanning={false}
        rotateSpeed={0.5}
      />
    </Canvas>
  )
}

function Harrypotter({ ...props }) {
  const { scene, nodes } = useGLTF('/harrypotter.glb')
  useLayoutEffect(() => Object.values(nodes).forEach((node) => (node.receiveShadow = node.castShadow = true)))
  useFrame((state, delta) => {
    state.camera.lookAt(0, 0, 0)
  })
  return <primitive object={scene} {...props} />
}


useGLTF.preload('/harrypotter.glb')