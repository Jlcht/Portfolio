// ============================================================================
// OPTIMIZED PHOTO FRAME COMPONENT
// Merges all frame geometries into single meshes for better performance
// ============================================================================

import React, { useMemo, useEffect } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { mergeBufferGeometries } from 'three-stdlib';

/**
 * OptimizedPhotoFrames - Renders multiple photo frames with merged geometries
 * This reduces draw calls from N*3 to just 3 (where N is number of frames)
 * 
 * @param {Array} frames - Array of frame objects with {position, rotation, imageSrc, size}
 */
export function OptimizedPhotoFrames({ frames }) {
  // Load all textures at once
  const textures = useTexture(frames.map(f => f.imageSrc));
  
  // Optimize all textures
  useEffect(() => {
    textures.forEach(texture => {
      if (texture) {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;
        texture.needsUpdate = true;
      }
    });
  }, [textures]);

  // Create merged geometry for outer frames (black borders)
  const outerFramesGeometry = useMemo(() => {
    const geometries = [];
    
    frames.forEach(frame => {
      const { position, rotation = [0, 0, 0], size = [4, 4] } = frame;
      
      // Create box geometry for this frame
      const geometry = new THREE.BoxGeometry(
        size[0] * 1.35,
        size[1] * 1.35,
        0.1
      );
      
      // Create transformation matrix
      const matrix = new THREE.Matrix4();
      const euler = new THREE.Euler(...rotation);
      const quaternion = new THREE.Quaternion().setFromEuler(euler);
      
      // Calculate offset in local space (before rotation)
      const localOffset = new THREE.Vector3(0, 0, -0.03);
      // Rotate the offset
      localOffset.applyQuaternion(quaternion);
      
      // Set rotation and position
      matrix.makeRotationFromQuaternion(quaternion);
      matrix.setPosition(
        position[0] + localOffset.x,
        position[1] + localOffset.y,
        position[2] + localOffset.z
      );
      
      // Apply transformation
      geometry.applyMatrix4(matrix);
      geometries.push(geometry);
    });
    
    // Merge all geometries into one
    return mergeBufferGeometries(geometries);
  }, [frames]);

  // Create merged geometry for inner frames (cream mat)
  const innerFramesGeometry = useMemo(() => {
    const geometries = [];
    
    frames.forEach(frame => {
      const { position, rotation = [0, 0, 0], size = [4, 4] } = frame;
      
      const geometry = new THREE.BoxGeometry(
        size[0] * 1.30,
        size[1] * 1.30,
        0.05
      );
      
      const matrix = new THREE.Matrix4();
      const euler = new THREE.Euler(...rotation);
      const quaternion = new THREE.Quaternion().setFromEuler(euler);
      
      // Inner frame has no offset, just rotation
      matrix.makeRotationFromQuaternion(quaternion);
      matrix.setPosition(
        position[0],
        position[1],
        position[2]
      );
      
      geometry.applyMatrix4(matrix);
      geometries.push(geometry);
    });
    
    return mergeBufferGeometries(geometries);
  }, [frames]);

  return (
    <>
      {/* Single mesh for all outer frames */}
      <mesh geometry={outerFramesGeometry} receiveShadow>
        <meshBasicMaterial color="#332a1f" />
      </mesh>

      {/* Single mesh for all inner frames */}
      <mesh geometry={innerFramesGeometry} receiveShadow>
        <meshBasicMaterial color="#fce6cd" />
      </mesh>

      {/* Individual photo planes (need separate meshes for different textures) */}
      {frames.map((frame, index) => {
        const { position, rotation = [0, 0, 0], size = [4, 4] } = frame;
        
        // Calculate the offset in the rotated coordinate system
        const euler = new THREE.Euler(...rotation);
        const quaternion = new THREE.Quaternion().setFromEuler(euler);
        const localOffset = new THREE.Vector3(0, 0, 0.06);
        localOffset.applyQuaternion(quaternion);
        
        return (
          <mesh
            key={index}
            position={[
              position[0] + localOffset.x,
              position[1] + localOffset.y,
              position[2] + localOffset.z
            ]}
            rotation={rotation}
            receiveShadow
          >
            <planeGeometry args={[size[0], size[1]]} />
            <meshLambertMaterial
              map={textures[index]}
              toneMapped={false}
            />
          </mesh>
        );
      })}
    </>
  );
}

/**
 * Single PhotoFrame component (for backwards compatibility)
 * Use OptimizedPhotoFrames for better performance when rendering multiple frames
 */
export function PhotoFrame({ position, rotation = [0, 0, 0], imageSrc = '/placeholder.jpg', size = [4, 4] }) {
  const texture = useTexture(imageSrc);
  
  useEffect(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;
      texture.needsUpdate = true;
    }
  }, [texture]);
  
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0, -0.03]} receiveShadow>
        <boxGeometry args={[size[0] * 1.35, size[1] * 1.35, 0.1]} />
        <meshBasicMaterial color="#332a1f" />
      </mesh>

      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[size[0] * 1.30, size[1] * 1.30, 0.05]} />
        <meshBasicMaterial color="#fce6cd" />
      </mesh>

      <mesh position={[0, 0, 0.06]} receiveShadow>
        <planeGeometry args={[size[0], size[1]]} />
        <meshLambertMaterial 
          map={texture}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
