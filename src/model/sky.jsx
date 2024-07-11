import { useGLTF } from '@react-three/drei'
import React from 'react'

import SkyScene from '../asset/3d/back.glb'

const Sky = () => {
   const Sky = useGLTF(SkyScene);
  return (
    <mesh>
        <primitive object={Sky.scene}/>
    </mesh>
  )
}

export default Sky
