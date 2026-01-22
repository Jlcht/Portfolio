// React core imports for component functionality
import React, { Suspense, useRef, useEffect, useCallback } from 'react';
// Suspense: Shows loading state while 3D content loads
// useRef: Creates references to 3D objects that persist between renders
// useEffect: Runs code when component mounts (for keyboard listeners)
// useCallback: Optimizes function performance (currently unused, can be removed)

// React Three Fiber - React wrapper for Three.js 3D library
import { Canvas, useFrame, useThree } from '@react-three/fiber';


// Drei - Helper components for React Three Fiber
import { PointerLockControls } from '@react-three/drei';

import * as THREE from 'three';

import { TextureLoader } from 'three';  

import barcelona from '../../../assets/images/photo/barcelona.jpg';
import bucarest from '../../../assets/images/photo/bucarest.jpg';
import malta from '../../../assets/images/photo/malta.jpg';


// Object to track keyboard state (true = key is pressed, false = released)
const keyboard = { 
  forward: false,   // Z key (forward movement)
  backward: false,  // S key (backward movement)
  leftward: false,  // Q key (strafe left)
  rightward: false, // D key (strafe right)
  upward: false,    // Space key (move up)
  downward: false   // E key (move down)
};


function handleKeyDown(e) {
  // e.code gives the physical key position (works with AZERTY keyboards)
  if (e.code === 'KeyW') keyboard.forward = true;    // Z on AZERTY keyboard
  if (e.code === 'KeyS') keyboard.backward = true;   // S on AZERTY keyboard
  if (e.code === 'KeyA') keyboard.leftward = true;   // Q on AZERTY keyboard
  if (e.code === 'KeyD') keyboard.rightward = true;  // D on AZERTY keyboard
  if (e.code === 'Space') keyboard.upward = true;    // Space to go up
  if (e.code === 'KeyE') keyboard.downward = true;   // E to go down
}


function handleKeyUp(e) {
  // Set keyboard state back to false when key is released
  if (e.code === 'KeyW') keyboard.forward = false;   // Z on AZERTY
  if (e.code === 'KeyS') keyboard.backward = false;  // S on AZERTY
  if (e.code === 'KeyA') keyboard.leftward = false;  // Q on AZERTY
  if (e.code === 'KeyD') keyboard.rightward = false; // D on AZERTY
  if (e.code === 'Space') keyboard.upward = false;   // Space to go up
  if (e.code === 'KeyE') keyboard.downward = false;  // E to go down
}


function FPSController() {
  // Get access to the Three.js camera
  const { camera } = useThree();
  
  // Create persistent references to 3D vectors (don't recreate every frame)
  const velocity = useRef(new THREE.Vector3());      // Current movement velocity
  const direction = useRef(new THREE.Vector3());     // Combined movement direction
  const frontVector = useRef(new THREE.Vector3());   // Direction camera is facing
  const sideVector = useRef(new THREE.Vector3());    // Direction perpendicular to camera (for strafing)
  const upwardVector = useRef(new THREE.Vector3());  // Direction perpendicular to camera (for upward movement)

  // useFrame runs this code every frame (60 times per second)
  useFrame(() => {
    // Movement speed (units per frame) - increase for faster movement
    const speed = 0.1;
    
    // === STEP 1: Calculate camera's current facing direction ===
    // Get the direction the camera is looking at (forward vector)
    camera.getWorldDirection(frontVector.current);
    
    // Calculate the "right" direction (perpendicular to forward and up)
    // crossVectors creates a vector perpendicular to two other vectors
    sideVector.current.crossVectors(camera.up, frontVector.current);
    
    // === STEP 2: Reset movement direction ===
    // Start with no movement each frame
    direction.current.set(0, 0, 0);
    
    // === STEP 3: Calculate forward/backward movement ===
    // Convert boolean to number: true=1, false=0
    // frontMovement will be: 1 (forward), -1 (backward), or 0 (no movement)
    const frontMovement = Number(keyboard.forward) - Number(keyboard.backward);
    
    // Add forward/backward movement to direction
    // multiplyScalar scales the vector by the movement amount
    direction.current.add(frontVector.current.multiplyScalar(frontMovement));
    
    // === STEP 4: Calculate left/right strafe movement ===
    // sideMovement will be: -1 (left), 1 (right), or 0 (no movement)
    const sideMovement = Number(keyboard.leftward) - Number(keyboard.rightward);
    
    // Add strafe movement to direction
    direction.current.add(sideVector.current.multiplyScalar(sideMovement));
    
    // === STEP 5: Calculate vertical movement ===
    // verticalMovement will be: 1 (up), -1 (down), or 0 (no vertical movement)
    const verticalMovement = Number(keyboard.upward) - Number(keyboard.downward);
    
    // === STEP 6: Normalize and apply speed ===
    // normalize() makes the vector length = 1 (prevents faster diagonal movement)
    // multiplyScalar(speed) applies the movement speed
    direction.current.normalize().multiplyScalar(speed);
    
    // === STEP 7: Add vertical movement AFTER normalization ===
    // Add vertical movement separately so it doesn't affect horizontal speed
    direction.current.y = verticalMovement * speed;
    
    // === STEP 7: Apply movement to camera ===
    // Add the movement direction to camera's current position
    camera.position.add(direction.current);
    
    // === STEP 8: Apply boundaries ===
    // Clamp camera position to stay within the room
    // Math.max/min keeps value between minimum and maximum
    camera.position.x = Math.max(-29, Math.min(29, camera.position.x));   // Left/Right bounds
    camera.position.z = Math.max(-59, Math.min(-1, camera.position.z));    // Forward/Back bounds
  });

  return null;
}


function PhotoFrame({ position, rotation = [0, 0, 0], imageSrc = '/placeholder.jpg' }) {
  // position: [x, y, z] coordinates in 3D space
  // rotation: [x, y, z] rotation in radians (default: no rotation)
  // imageSrc: path to the image file
  
  return (
    // mesh: A 3D object that can be rendered
    <mesh position={position} rotation={rotation}>
      
      {/* planeGeometry: Creates a flat rectangular surface */}
      {/* args={[width, height]} - 4 units wide, 3 units tall */}
      <planeGeometry args={[4, 4]} />
      
      {/* meshLambertMaterial: Surface material that reacts to light */}
      <meshLambertMaterial 
        map={new THREE.TextureLoader().load(imageSrc)}  // Load image as texture
        toneMapped={false}  // Disable tone mapping for accurate colors
      />
    </mesh>
  );
}


function ExpoScene() {
  return (
    <>
      {/* === LIGHTING === */}
      {/* ambientLight: Soft light that illuminates everything equally */}
      <ambientLight intensity={2} />
      
      {/* pointLight: Light source at a specific point (like a light bulb) */}
      <pointLight position={[10, 10, 10]} />
      
      {/* === FLOOR === */}
      {/* Horizontal plane rotated to be flat on the ground */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]}  // Rotate 90° to make it horizontal
        position={[0, 0, -30]}            // Center of the room
      >
        <planeGeometry args={[60, 60]} />  {/* 60x60 units square */}
        <meshLambertMaterial color="#e8e8e8" />  {/* Light gray color */}
      </mesh>

      {/* === FRONT WALL === */}
      {/* Wall in front of starting position */}
      <mesh position={[0, 4, 0]}>  {/* x=0 (center), y=4 (height), z=5 (forward) */}
        <boxGeometry args={[60, 8, 0.2]} />  {/* width=60, height=8, depth=0.2 */}
        <meshLambertMaterial color="#ff0000" />  {/* Red - Front wall */}
      </mesh>
      
      {/* === BACK WALL === */}
      {/* Wall at the far end of the room */}
      <mesh position={[0, 4, -60]}>  {/* z=-50 (far back) */}
        <boxGeometry args={[60, 8, 0.2]} />
        <meshLambertMaterial color="#00fa26" />  {/* Green - Back wall */}
      </mesh>
      
      {/* === LEFT SIDE WALL === */}
      <mesh 
        position={[-30, 4, -30]}           // Left side (x=-30)
        rotation={[0, Math.PI / 2, 0]}     // Rotate 90° to face inward
      >
        <boxGeometry args={[60, 8, 0.2]} />
        <meshLambertMaterial color="#0051ff" />  {/* Blue - Left wall */}
      </mesh>
      
      {/* === RIGHT SIDE WALL === */}
      <mesh 
        position={[30, 4, -30]}            // Right side (x=30)
        rotation={[0, -Math.PI / 2, 0]}    // Rotate -90° to face inward
      >
        <boxGeometry args={[60, 8, 0.2]} />
        <meshLambertMaterial color="#ff00ea" />  {/* Magenta - Right wall */}
      </mesh>

      {/* === GALLERY === */}   
      {/* === GALLERY WALL WITH CARVED OPENING === */}
      {/* This wall is split into 4 sections to create a rectangular opening */}
      <group position={[0.5, 3, -30]} rotation={[0, 0, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[30, 10, 0.2]} />
          <meshLambertMaterial color="#716363" />
        </mesh>

        <mesh position={[-30, 0, 0]}>
          <boxGeometry args={[22, 10, 0.2]} />
          <meshLambertMaterial color="#716363" />
        </mesh>

        <mesh position={[30, 0, 0]}>
          <boxGeometry args={[22, 10, 0.2]} />
          <meshLambertMaterial color="#716363" />
        </mesh>

        <mesh position={[-17, 4, 0]}>
          <boxGeometry args={[4, 2, 0.2]} />
          <meshLambertMaterial color="#716363" />
        </mesh>

        <mesh position={[17, 4, 0]}>
          <boxGeometry args={[4, 2, 0.2]} />
          <meshLambertMaterial color="#716363" />
        </mesh>
      </group>

      <group position={[0, 3, -30]} rotation={[0, Math.PI / 2, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[20, 10, 0.2]} />
          <meshLambertMaterial color="#000000" />
        </mesh>

        <mesh position={[-30, 0, 0]}>
          <boxGeometry args={[32, 10, 0.2]} />
          <meshLambertMaterial color="#000000" />
        </mesh>

        <mesh position={[30, 0, 0]}>
          <boxGeometry args={[32, 10, 0.2]} />
          <meshLambertMaterial color="#000000" />
        </mesh>

        <mesh position={[-12, 4, 0]}>
          <boxGeometry args={[4, 2, 0.2]} />
          <meshLambertMaterial color="#000000" />
        </mesh>

        <mesh position={[12, 4, 0]}>
          <boxGeometry args={[4, 2, 0.2]} />
          <meshLambertMaterial color="#000000" />
        </mesh>
      </group>

      {/* === PHOTOS === */}
      <PhotoFrame 
        position={[-15, 2, -5]}  // x=-15 (left), y=2 (eye level), z=-5 (slightly back)
        imageSrc={barcelona} 
      />
      
      <PhotoFrame 
        position={[-15, 2, -3]}        // Center position
        rotation={[0, 0., 0]}        // Rotate 0.3 radians (~17°) for visual interest
        imageSrc={bucarest} 
      />
      
      <PhotoFrame 
        position={[-15, 2, 0]}  // x=15 (right), further back (z=-15)
        imageSrc={malta} 
      />
    </>
  );
}


// ============================================================================
// MAIN COMPONENT - Sets up the entire 3D photography gallery
// ============================================================================

export default function Photography() {
  // useEffect runs once when component mounts
  useEffect(() => {
    // Add keyboard event listeners to the entire document
    document.addEventListener('keydown', handleKeyDown);  // Listen for key presses
    document.addEventListener('keyup', handleKeyUp);      // Listen for key releases
    
    // Cleanup function: runs when component unmounts
    return () => {
      // Remove event listeners to prevent memory leaks
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []); // Empty array = run only once on mount

  return (
    // Main container - fills entire viewport
    <div style={{ 
      width: '100vw',      // 100% of viewport width
      height: '100vh',     // 100% of viewport height
      position: 'fixed',   // Fixed position (doesn't scroll)
      background: '#111'   // Dark background color
    }}>
      
      {/* Suspense: Shows fallback while 3D content loads */}
      <Suspense fallback={
        <div style={{
          color:'white', 
          position:'fixed', 
          top:50, 
          left:'50%', 
          transform:'translateX(-50%)'  // Center horizontally
        }}>
          Loading Photo Expo...
        </div>
      }>
        
        {/* Canvas: Container for all 3D content */}
        <Canvas camera={{ 
          position: [-20, 2, -10],  // Starting position: center, eye level, forward
          fov: 75               // Field of view in degrees (wider = more visible)
        }}>
          
          {/* PointerLockControls: Enables mouse look (FPS-style camera) */}
          <PointerLockControls />
          
          {/* FPSController: Handles keyboard movement */}
          <FPSController />
          
          {/* ExpoScene: The gallery room with walls and photos */}
          <ExpoScene />
          
        </Canvas>
      </Suspense>
      
      {/* Instructions overlay - shows controls to user */}
      <div style={{
        position: 'absolute',     // Position over the 3D canvas
        top: 20,                  // 20px from top
        left: 20,                 // 20px from left
        color: 'white',           // White text
        zIndex: 100,              // Ensure it's on top
        fontFamily: 'monospace',  // Monospace font
        pointerEvents: 'none'     // Don't block mouse clicks
      }}>
        Click → ZQSD walk | Mouse look | Explore photos
      </div>
      
    </div>
  );
}


// ============================================================================
// HOW TO MODIFY THIS CODE:
// ============================================================================
// 
// 1. CHANGE MOVEMENT SPEED:
//    - Line 91: Change `const speed = 0.1;` to a higher/lower value
//
// 2. ADD MORE PHOTOS:
//    - Import the image at the top (lines 6-8)
//    - Add a new <PhotoFrame> in ExpoScene (around line 185)
//    - Set position={[x, y, z]} and imageSrc={yourImage}
//
// 3. CHANGE ROOM SIZE:
//    - Floor size: Line 165 - args={[60, 60]}
//    - Wall positions: Lines 172, 178, 185, 193
//    - Camera bounds: Lines 113-114
//
// 4. CHANGE COLORS:
//    - Floor: Line 166 - color="#e8e8e8"
//    - Walls: Lines 173, 179, 188, 196 - color="#aaa"
//    - Background: Line 230 - background: '#111'
//
// 5. CHANGE LIGHTING:
//    - Ambient light: Line 158 - intensity={0.6}
//    - Point light: Line 161 - position={[10, 10, 10]}
//
// 6. CHANGE STARTING POSITION:
//    - Line 238 - position: [0, 2, 5]
//
// ============================================================================
