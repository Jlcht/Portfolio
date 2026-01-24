// ============================================================================
// INSTRUCTIONS FRAME COMPONENT - 3D Instructions Panel
// ============================================================================

import React, { useMemo } from 'react';
import * as THREE from 'three';

export function InstructionsFrame({ position, rotation = [0, 0, 0] }) {
  // Create a canvas texture with the instructions
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1536;
    const ctx = canvas.getContext('2d');
    
    // No background - transparent
    // (Don't fill the canvas, leave it transparent)
    
    // Set font
    ctx.fillStyle = '#a47b4e';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Title
    ctx.font = 'bold 120px Georgia, serif';
    ctx.fillText('CONTROLS', canvas.width / 2, 200);
    
    // Instructions
    ctx.font = '90px Georgia, serif';
    const instructions = [
      { text: 'ZQSD', color: '#a47b4e', suffix: ' : Move around', y: 450 },
      { text: 'MOUSE', color: '#a47b4e', suffix: ' : Look around', y: 600 },
      { text: 'Click anywhere to explore', color: '#a47b4e', y: 800, italic: true },
      { text: 'ESC', color: '#a47b4e', suffix: ' : Unlock mouse', y: 1100 }
    ];
    
    instructions.forEach(({ text, color, suffix, y, italic }) => {
      if (italic) {
        ctx.font = 'italic 80px Georgia, serif';
        ctx.fillStyle = color;
        ctx.fillText(text, canvas.width / 2, y);
        ctx.font = '90px Georgia, serif';
      } else {
        // Draw colored key
        ctx.fillStyle = color;
        const keyWidth = ctx.measureText(text).width;
        ctx.fillText(text, canvas.width / 2 - (suffix ? ctx.measureText(suffix).width / 2 : 0), y);
        
        // Draw suffix
        if (suffix) {
          ctx.fillStyle = '#a47b4e';
          ctx.fillText(suffix, canvas.width / 2 + keyWidth / 2, y);
        }
      }
    });
    
    const canvasTexture = new THREE.CanvasTexture(canvas);
    canvasTexture.needsUpdate = true;
    return canvasTexture;
  }, []);
  
  return (
    <mesh position={position} rotation={rotation} receiveShadow>
      {/* planeGeometry: Creates a flat rectangular surface */}
      <planeGeometry args={[8, 6]} />
      
      {/* meshLambertMaterial: Same as PhotoFrame - reacts to light */}
      <meshLambertMaterial 
        map={texture}
        transparent={true}       // Enable transparency
        toneMapped={false}       // Disable tone mapping for accurate colors
      />
    </mesh>
  );
}
