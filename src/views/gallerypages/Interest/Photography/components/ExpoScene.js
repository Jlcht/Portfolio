// ============================================================================
// EXPO SCENE COMPONENT - Contains all 3D objects
// ============================================================================

import React from 'react';
import { PhysicsWall } from './PhysicsWall';
import { PhysicsFloor } from './PhysicsFloor';
import { OptimizedPhotoFrames } from './OptimizedPhotoFrame';
import { TargetedSpotlight } from './TargetedSpotlight';
import { InstructionsFrame } from './InstructionsFrame';
import { photoFramesData } from '../constants/photoFramesData';

export function ExpoScene() {
  return (
    <>
      {/* ========================================
          LIGHTING
          ======================================== */}
      
      {/* ambientLight: Soft light that illuminates everything equally */}
      <ambientLight intensity={0.3} />
      
      {/* pointLight: Light source at a specific point (like a light bulb) */}
      <pointLight position={[10, 10, 10]} />

      {/*Corner Lights*/}  
      <TargetedSpotlight 
        position={[-30, 10, 0]}      
        targetPosition={[0, 0, -30]} 
        intensity={ 500}              
        angle={Math.PI / 3}          
        penumbra={0.5}               
        color="#FDF4DC"              
        distance={ 40}
        castShadow={false}
      />

      <TargetedSpotlight 
        position={[30, 10, 0]}      
        targetPosition={[0, 0, -30]} 
        intensity={500}              
        angle={Math.PI / 3}          
        penumbra={0.5}               
        color="#FDF4DC"              
        distance={40}
        castShadow={false}
      />

      <TargetedSpotlight 
        position={[-30, 10, -60]}      
        targetPosition={[0, 0, -30]} 
        intensity={500}              
        angle={Math.PI / 3}          
        penumbra={0.5}               
        color="#FDF4DC"              
        distance={40}
        castShadow={false}
      />
      
      <TargetedSpotlight 
        position={[30, 10, -60]}      
        targetPosition={[0, 0, -30]} 
        intensity={500}              
        angle={Math.PI / 3}          
        penumbra={0.5}               
        color="#FDF4DC"              
        distance={40}
        castShadow={false}
      />
      
      
      
      {/* ========================================
          FLOOR (Physics-enabled)
          ======================================== */}
      
      {/* Floor is a thin box rotated to be horizontal */}
      <PhysicsFloor
        position={[0, -0.1, -30]}           
        args={[60, 0.2, 60]}               
        rotation={[0, Math.PI / 2, 0]}     
        color="#a47b4e"                     
      />

      {/* Instructions panel */}
      <InstructionsFrame 
        position={[-20, 4, -0.2]}     // In front of the wall, left side, eye level
        rotation={[0, Math.PI, 0]}   // Rotate 180° to face into the room (toward -z)
      />
      
      <TargetedSpotlight 
        position={[-20, 10, -11]}      
        targetPosition={[-20, 4, -0.2]}
        intensity={500}
        angle={Math.PI / 8}
        penumbra={0.5}
        color="#FDF4DC"
        distance={16}
        castShadow={false}                
      />


      
      {/* ========================================
          WALLS (Physics-enabled)
          ======================================== */}
      
      <PhysicsWall 
        position={[0, 4, 0]}                
        args={[60, 8, 0.2]}                 
        color="#D9C6A0"                     
      />
      
      <PhysicsWall 
        position={[0, 4, -60]}              
        args={[60, 8, 0.2]}
        color="#D9C6A0"                     
      />
      
      <PhysicsWall 
        position={[-30, 4, -30]}            
        args={[60, 8, 0.2]}
        rotation={[0, Math.PI / 2, 0]}      
        color="#D9C6A0"                     
      />
    
      <PhysicsWall 
        position={[30, 4, -30]}             
        args={[60, 8, 0.2]}
        rotation={[0, -Math.PI / 2, 0]}     
        color="#D9C6A0"                     
      />
      
      {/* ========================================
          GALLERY DIVIDER WALLS (Physics-enabled)
          ======================================== */}
      
      {/* NOTE: These walls are positioned with ABSOLUTE coordinates (not in groups)
           because Cannon.js physics bodies need absolute world positions.
           The group's position [0.5, 3, -30] has been added to each wall's position. */}
      
      {/* Center section - Main wall piece */}
      <PhysicsWall 
        position={[0.5, 3, -30]}              // Middle wall 
        args={[30, 10, 0.2]} 
        color="#F5F0E1" 
      />
      
      {/* Left section - Wall piece on the left side */}
      <PhysicsWall 
        position={[-29.5, 3, -30]}            // Left wall
        args={[22, 10, 0.2]} 
        color="#F5F0E1" 
      />
      
      {/* Right section - Wall piece on the right side */}
      <PhysicsWall 
        position={[30.5, 3, -30]}             // Right wall
        args={[22, 10, 0.2]} 
        color="#F5F0E1" 
      />
      
      {/* Top left section - Above doorway on left */}
      <PhysicsWall 
        position={[-16.5, 7, -30]}            // Left top wall
        args={[4, 2, 0.2]} 
        color="#F5F0E1" 
      />
      
      {/* Top right section - Above doorway on right */}
      <PhysicsWall 
        position={[17.5, 7, -30]}             // Right top wall
        args={[4, 2, 0.2]} 
        color="#F5F0E1" 
      />
      
      {/* ========================================
          GALLERY DIVIDER WALLS (Black) - Perpendicular wall with doorway
          ======================================== */}
      
      {/* Center section - Main perpendicular wall */}
      <PhysicsWall 
        position={[0, 3, -30]}                // Middle wall
        args={[20, 10, 0.2]} 
        rotation={[0, Math.PI / 2, 0]}        
        color="#F5F0E1" 
      />
      
      {/* Left section - When rotated 90°, local [-30, 0, 0] becomes world [0, 0, -30] */}
      <PhysicsWall 
        position={[0, 3, -60]}                // Left wall
        args={[32, 10, 0.2]} 
        rotation={[0, Math.PI / 2, 0]} 
        color="#F5F0E1" 
      />
      
      {/* Right section - When rotated 90°, local [30, 0, 0] becomes world [0, 0, 30] */}
      <PhysicsWall 
        position={[0, 3, 0]}                  // Right wall
        args={[32, 10, 0.2]} 
        rotation={[0, Math.PI / 2, 0]} 
        color="#F5F0E1" 
      />
      
      {/* Top left section - Above doorway, rotated */}
      <PhysicsWall 
        position={[0, 7, -42]}                // Left top wall
        args={[4, 2, 0.2]} 
        rotation={[0, Math.PI / 2, 0]} 
        color="#F5F0E1" 
      />
      
      {/* Top right section - Above doorway, rotated */}
      <PhysicsWall 
        position={[0, 7, -18]}                // Right top wall
        args={[4, 2, 0.2]} 
        rotation={[0, Math.PI / 2, 0]} 
        color="#F5F0E1" 
      />
      
      {/* ========================================
          PHOTO FRAMES (Optimized - Merged Geometry)
          ======================================== */}
      
      {/* All 40 photo frames rendered with merged geometries for better performance
          - Outer frames (black borders): 1 merged mesh
          - Inner frames (cream mats): 1 merged mesh  
          - Photo planes: 40 separate meshes (different textures)
          Total: 42 draw calls instead of 120 (~65% reduction) */}
      <OptimizedPhotoFrames frames={photoFramesData} />
      

      {/* Spotlight for Barcelona photo */}
      <TargetedSpotlight 
        position={[-27, 15, -25]}      
        targetPosition={[-27, 4, -29.5]} // Point at Barcelona photo
        intensity={1000}              // Bright focused light
        angle={Math.PI / 16}          // Narrow cone (11.25 degrees)
        penumbra={0.5}               // Soft edges for dramatic effect
        color="#FDF4DC"              // Warm white
        distance={16}
        castShadow={false}                // Limit range to prevent bleeding through walls
      />



      {/* Spotlight for Barcelona photo */}
      <TargetedSpotlight 
        position={[-22, 15, -25]}      
        targetPosition={[-22, 4, -29.8]} // Point at Barcelona photo
        intensity={1000}              // Bright focused light
        angle={Math.PI / 16}          // Narrow cone (11.25 degrees)
        penumbra={0.5}               // Soft edges for dramatic effect
        color="#FDF4DC"              // Warm white
        distance={16}
        castShadow={false}                // Limit range to prevent bleeding through walls
      />
      
      
      <TargetedSpotlight 
        position={[-10, 15, -25]}      
        targetPosition={[-10, 4, -29.8]}
        intensity={1500}
        angle={Math.PI / 16}
        penumbra={0.5}
        color="#FDF4DC"
        distance={16}
        castShadow={false}                // Limit range to prevent bleeding through walls
      />

      <TargetedSpotlight 
        position={[-4, 15, -25]}      
        targetPosition={[-4, 4, -29.8]}
        intensity={1000}
        angle={Math.PI / 16}
        penumbra={0.5}
        color="#FDF4DC"
        distance={16}
        castShadow={false}                // Limit range to prevent bleeding through walls
      />
      
      
      <TargetedSpotlight 
        position={[-6, 15, -4]}      
        targetPosition={[-0.2, 4, -4]}
        intensity={3000}
        angle={Math.PI / 16}
        penumbra={0.5}
        color="#FDF4DC"
        distance={16}
        castShadow={false}                // Limit range to prevent bleeding through walls
      />

      <TargetedSpotlight 
        position={[-6, 15, -11]}      
        targetPosition={[-0.2, 4, -11]}
        intensity={3000}
        angle={Math.PI / 16}
        penumbra={0.5}
        color="#FDF4DC"
        distance={16}
        castShadow={false}                // Limit range to prevent bleeding through walls
      />
      

      
      <TargetedSpotlight 
        position={[-6, 15, -24]}      
        targetPosition={[-0.2, 4, -24]}
        intensity={3000}
        angle={Math.PI / 16}
        penumbra={0.5}
        color="#FDF4DC"
        distance={16}
        castShadow={false}                // Limit range to prevent bleeding through walls
      />

      
      <TargetedSpotlight 
        position={[6, 15, -6]}      
        targetPosition={[6, 4, -0.2]}
        intensity={3000}
        angle={Math.PI / 16}
        penumbra={0.5}
        color="#FDF4DC"
        distance={16}
        castShadow={false}                // Limit range to prevent bleeding through walls
      />

      
      <TargetedSpotlight 
        position={[15, 15, -6]}      
        targetPosition={[15, 4, -0.2]}
        intensity={3000}
        angle={Math.PI / 16}
        penumbra={0.5}
        color="#FDF4DC"
        distance={16}
        castShadow={false}                // Limit range to prevent bleeding through walls
      />

      
      <TargetedSpotlight 
        position={[25, 15, -6]}      
        targetPosition={[25, 4, -0.2]}
        intensity={3000}
        angle={Math.PI / 16}
        penumbra={0.5}
        color="#FDF4DC"
        distance={16}
        castShadow={false}                // Limit range to prevent bleeding through walls
      />

      
      <TargetedSpotlight 
        position={[7, 15, -25]}      
        targetPosition={[7, 4, -29.8]}
        intensity={3000}
        angle={Math.PI / 16}
        penumbra={0.5}
        color="#FDF4DC"
        distance={16}
        castShadow={false}                // Limit range to prevent bleeding through walls
      />

      
      <TargetedSpotlight 
        position={[24, 15, -25]}      
        targetPosition={[24, 4, -29.8]}
        intensity={3000}
        angle={Math.PI / 16}
        penumbra={0.5}
        color="#FDF4DC"
        distance={16}
        castShadow={false}                // Limit range to prevent bleeding through walls
      />

      
      <TargetedSpotlight 
        position={[25, 15, -20]}      
        targetPosition={[29.8, 4, -20]}
        intensity={3000}
        angle={Math.PI / 16}
        penumbra={0.5}
        color="#FDF4DC"
        distance={16}
        castShadow={false}                // Limit range to prevent bleeding through walls
      />

      
      <TargetedSpotlight 
        position={[25, 15, -10]}      
        targetPosition={[29.8, 4, -10]}
        intensity={3000}
        angle={Math.PI / 16}
        penumbra={0.5}
        color="#FDF4DC"
        distance={16}
        castShadow={false}                // Limit range to prevent bleeding through walls
      />  

      
      <TargetedSpotlight 
        position={[6, 15, -55]}      
        targetPosition={[6, 4, -59.8]}
        intensity={3000}
        angle={Math.PI / 16}
        penumbra={0.5}
        color="#FDF4DC"
        distance={16}
        castShadow={false}                // Limit range to prevent bleeding through walls
      />  

      
      <TargetedSpotlight 
        position={[16, 15, -55]}      
        targetPosition={[16, 4, -59.8]}
        intensity={3000}
        angle={Math.PI / 16}
        penumbra={0.5}
        color="#FDF4DC"
        distance={16}
        castShadow={false}                // Limit range to prevent bleeding through walls
      />  

      
      <TargetedSpotlight 
        position={[25, 15, -55]}      
        targetPosition={[25, 4, -59.8]}
        intensity={3000}
        angle={Math.PI / 16}
        penumbra={0.5}
        color="#FDF4DC"
        distance={16}
        castShadow={false}                // Limit range to prevent bleeding through walls
      />  

      
      <TargetedSpotlight 
        position={[25, 15, -54]}      
        targetPosition={[29.8, 4, -54]}
        intensity={3000}
        angle={Math.PI / 16}
        penumbra={0.5}
        color="#FDF4DC"
        distance={16}
        castShadow={false}                // Limit range to prevent bleeding through walls
      />  

      
      <TargetedSpotlight 
        position={[25, 15, -45]}      
        targetPosition={[29.8, 4, -45]}
        intensity={3000}
        angle={Math.PI / 16}
        penumbra={0.5}
        color="#FDF4DC"
        distance={16}
        castShadow={false}                // Limit range to prevent bleeding through walls
      />  

      
      <TargetedSpotlight 
        position={[25, 15, -36]}      
        targetPosition={[29.8, 4, -36]}
        intensity={3000}
        angle={Math.PI / 16}
        penumbra={0.5}
        color="#FDF4DC"
        distance={16}
        castShadow={false}                // Limit range to prevent bleeding through walls
      />  

      
      <TargetedSpotlight 
        position={[6, 15, -52]}      
        targetPosition={[0.2, 4, -52]}
        intensity={3000}
        angle={Math.PI / 16}
        penumbra={0.5}
        color="#FDF4DC"
        distance={16}
        castShadow={false}                // Limit range to prevent bleeding through walls
      />  

      
      <TargetedSpotlight 
        position={[6, 15, -35]}      
        targetPosition={[0.2, 4, -35]}
        intensity={3000}
        angle={Math.PI / 16}
        penumbra={0.5}
        color="#FDF4DC"
        distance={16}
        castShadow={false}                // Limit range to prevent bleeding through walls
      />  

      
      <TargetedSpotlight 
        position={[10, 15, -35]}      
        targetPosition={[10, 4, -30.2]}
        intensity={3000}
        angle={Math.PI / 16}
        penumbra={0.5}
        color="#FDF4DC"
        distance={16}
        castShadow={false}                // Limit range to prevent bleeding through walls
      />  

      
      <TargetedSpotlight 
        position={[25, 15, -35]}      
        targetPosition={[25, 4, -30.2]}
        intensity={3000}
        angle={Math.PI / 16}
        penumbra={0.5}
        color="#FDF4DC"
        distance={16}
        castShadow={false}                // Limit range to prevent bleeding through walls
      />  

      
      <TargetedSpotlight 
        position={[-24, 15, -55]}      
        targetPosition={[-24, 4, -59.8]}
        intensity={3000}
        angle={Math.PI / 16}
        penumbra={0.5}
        color="#FDF4DC"
        distance={16}
        castShadow={false}                // Limit range to prevent bleeding through walls
      />  

      
      <TargetedSpotlight 
        position={[-15, 15, -55]}      
        targetPosition={[-15, 4, -59.8]}
        intensity={3000}
        angle={Math.PI / 16}
        penumbra={0.5}
        color="#FDF4DC"
        distance={16}
        castShadow={false}                // Limit range to prevent bleeding through walls
      />  

      
      <TargetedSpotlight 
        position={[-6, 15, -55]}      
        targetPosition={[-6, 4, -59.8]}
        intensity={3000}
        angle={Math.PI / 16}
        penumbra={0.5}
        color="#FDF4DC"
        distance={16}
        castShadow={false}                // Limit range to prevent bleeding through walls
      />  

      
      <TargetedSpotlight 
        position={[-25, 15, -54]}      
        targetPosition={[-29.8, 4, -54]}
        intensity={3000}
        angle={Math.PI / 16}
        penumbra={0.5}
        color="#FDF4DC"
        distance={16}
        castShadow={false}                // Limit range to prevent bleeding through walls
      />  

      
      <TargetedSpotlight 
        position={[-25, 15, -45]}      
        targetPosition={[-29.8, 4, -45]}
        intensity={3000}
        angle={Math.PI / 16}
        penumbra={0.5}
        color="#FDF4DC"
        distance={16}
        castShadow={false}                // Limit range to prevent bleeding through walls
      />  

      
      <TargetedSpotlight 
        position={[-25, 15, -36]}      
        targetPosition={[-29.8, 4, -36]}
        intensity={3000}
        angle={Math.PI / 16}
        penumbra={0.5}
        color="#FDF4DC"
        distance={16}
        castShadow={false}                // Limit range to prevent bleeding through walls
      />  

      
      <TargetedSpotlight 
        position={[-7, 15, -36]}      
        targetPosition={[-7, 4, -30.2]}
        intensity={3000}
        angle={Math.PI / 16}
        penumbra={0.5}
        color="#FDF4DC"
        distance={16}
        castShadow={false}                // Limit range to prevent bleeding through walls
      />  

      
      <TargetedSpotlight 
        position={[-24, 15, -36]}      
        targetPosition={[-24, 4, -30.2]}
        intensity={3000}
        angle={Math.PI / 16}
        penumbra={0.5}
        color="#FDF4DC"
        distance={16}
        castShadow={false}                // Limit range to prevent bleeding through walls
      />  

      
      <TargetedSpotlight 
        position={[-6, 15, -50]}      
        targetPosition={[-0.2, 4, -50]}
        intensity={3000}
        angle={Math.PI / 16}
        penumbra={0.5}
        color="#FDF4DC"
        distance={16}
        castShadow={false}                // Limit range to prevent bleeding through walls
      />  

      
      <TargetedSpotlight 
        position={[-6, 15, -35]}      
        targetPosition={[-0.2, 4, -35]}
        intensity={3000}
        angle={Math.PI / 16}
        penumbra={0.5}
        color="#FDF4DC"
        distance={16}
        castShadow={false}                // Limit range to prevent bleeding through walls
      />  
    </>
  );
}