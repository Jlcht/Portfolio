// ============================================================================
// INSTRUCTIONS FRAME COMPONENT - 3D Instructions Panel
// ============================================================================

import React, { useMemo } from 'react';
import * as THREE from 'three';

export function InstructionsFrame({ position, rotation = [0, 0, 0] }) {
  // Create a canvas texture with the instructions
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;  // Reduced from 2048 for better performance
    canvas.height = 768;  // Reduced from 1536 for better performance
    const ctx = canvas.getContext('2d');
    
    // No background - transparent
    // (Don't fill the canvas, leave it transparent)
    
    // Set font
    ctx.fillStyle = '#1e170e';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Title - scaled down for 1024x768 canvas
    ctx.font = 'bold 60px Georgia, serif';  // Was 120px
    ctx.fillText('CONTROLS', canvas.width / 2, 100);  // Was 200
    
    // Instructions - scaled down
    ctx.font = '45px Georgia, serif';  // Was 90px
    const instructions = [
      { text: 'ZQSD', color: '#1e170e', suffix: ' : Move around', y: 225 },      // Was 450
      { text: 'MOUSE', color: '#1e170e', suffix: ' : Look around', y: 300 },     // Was 600
      { text: 'Click anywhere to explore', color: '#1e170e', y: 400, italic: true },  // Was 800
      { text: 'ESC', color: '#1e170e', suffix: ' : Unlock mouse', y: 550 }       // Was 1100
    ];
    
    instructions.forEach(({ text, color, suffix, y, italic }) => {
      if (italic) {
        ctx.font = 'italic 40px Georgia, serif';  // Was 80px
        ctx.fillStyle = color;
        ctx.fillText(text, canvas.width / 2, y);
        ctx.font = '45px Georgia, serif';  // Reset to main font size
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
    // Optimize canvas texture
    canvasTexture.minFilter = THREE.LinearFilter;
    canvasTexture.magFilter = THREE.LinearFilter;
    canvasTexture.generateMipmaps = false;  // Save memory
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
