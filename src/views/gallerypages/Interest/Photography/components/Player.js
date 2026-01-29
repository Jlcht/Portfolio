// ============================================================================
// PHYSICS-ENABLED PLAYER COMPONENT
// ============================================================================

import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useSphere } from '@react-three/cannon';
import * as THREE from 'three';
import { keyboard } from '../utils/keyboard';

export function Player() {
  // Get access to the Three.js camera from the Canvas context
  const { camera } = useThree();
  
  // Create persistent references to 3D vectors (don't recreate every frame)
  const frontVector = useRef(new THREE.Vector3());   // Direction camera is facing
  const sideVector = useRef(new THREE.Vector3());    // Direction perpendicular to camera (for strafing)
  
  // ========================================
  // CREATE PHYSICS BODY FOR PLAYER
  // ========================================
  
  // useSphere creates an invisible sphere that has physics properties
  // This sphere represents the player in the physics world
  const [ref, api] = useSphere(() => ({
    // PHYSICS PROPERTIES:
    mass: 1,                    // Mass of the player (affects how forces move it)
    type: 'Dynamic',            // Dynamic = can move and be affected by forces
    position: [-20, 3, -10],    // Starting position [x, y, z]
    args: [0.5],                // Radius of the sphere (0.5 units = player size)
    
    // MOVEMENT PROPERTIES:
    fixedRotation: true,        // Prevent the sphere from tumbling/rotating
    linearDamping: 0.95,        // Friction/drag (0.95 = 95% of velocity retained each frame)
                                // Higher = more friction, slower movement
                                // Lower = less friction, more sliding
    
    // COLLISION PROPERTIES:
    material: {
      friction: 0.1,            // How much the player sticks to surfaces (low = slippery)
      restitution: 0            // Bounciness (0 = no bounce, 1 = perfect bounce)
    }
  }));
  // ref: Reference to the mesh (for rendering)
  // api: API to control the physics body (set velocity, position, etc.)
  
  // ========================================
  // SYNC CAMERA WITH PHYSICS BODY
  // ========================================
  
  // Subscribe to physics body position changes and update camera
  React.useEffect(() => {
    // api.position.subscribe() calls this function whenever the physics body moves
    const unsubscribe = api.position.subscribe((position) => {
      // position is an array [x, y, z] from the physics engine
      // Update the camera to follow the physics body
      camera.position.set(position[0], position[1], position[2]);
    });
    
    // Cleanup: unsubscribe when component unmounts to prevent memory leaks
    return unsubscribe;
  }, [api, camera]);
  
  // ========================================
  // APPLY MOVEMENT FORCES EVERY FRAME
  // ========================================
  
  // useFrame runs this code every frame (60 times per second)
  useFrame(() => {
    // Movement speed multiplier - increase for faster movement
    const speed = 20;
    
    // === STEP 1: Calculate camera's current facing direction ===
    // Get the direction the camera is looking at (forward vector)
    camera.getWorldDirection(frontVector.current);
    
    // Calculate the "right" direction (perpendicular to forward and up)
    // crossVectors creates a vector perpendicular to two other vectors
    // This is used for strafing left/right
    sideVector.current.crossVectors(camera.up, frontVector.current);
    
    // === STEP 2: Calculate desired movement direction ===
    // Convert boolean to number: true=1, false=0
    // frontMovement will be: 1 (forward), -1 (backward), or 0 (no movement)
    const frontMovement = Number(keyboard.forward) - Number(keyboard.backward);
    
    // sideMovement will be: -1 (left), 1 (right), or 0 (no movement)
    const sideMovement = Number(keyboard.leftward) - Number(keyboard.rightward);
    
    // verticalMovement will be: 1 (up), -1 (down), or 0 (no vertical movement)
    const verticalMovement = Number(keyboard.upward) - Number(keyboard.downward);
    
    // === STEP 3: Calculate velocity vector ===
    // Combine forward/backward and left/right movement
    // Multiply by speed to control how fast the player moves
    const velocityX = (sideVector.current.x * sideMovement + frontVector.current.x * frontMovement) * speed;
    const velocityZ = (sideVector.current.z * sideMovement + frontVector.current.z * frontMovement) * speed;
    const velocityY = verticalMovement * speed;
    
    // === STEP 4: Apply velocity to physics body ===
    // This tells the physics engine to move the player at this velocity
    // The physics engine will automatically handle collisions with walls
    api.velocity.set(velocityX, velocityY, velocityZ);
  });
  
  // Return the mesh (invisible, just for physics)
  // The ref connects this mesh to the physics body
  return <mesh ref={ref} />;
}
