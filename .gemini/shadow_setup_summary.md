# Shadow Rendering Setup - Photography Gallery

## Overview

Proper shadow rendering has been implemented in the Photography gallery to create realistic lighting effects where lights are blocked by walls and cast shadows on surfaces.

## Changes Made

### 1. Canvas Configuration

**File**: `Photography.js` (line ~577)

```javascript
<Canvas
  shadows  // Enable shadow rendering
  camera={{
    position: [-20, 2, -10],
    fov: 75
  }}
>
```

- Added `shadows` prop to enable shadow rendering in the entire scene

### 2. PhysicsWall Component

**File**: `Photography.js` (line ~219)

```javascript
<mesh ref={ref} castShadow receiveShadow>
```

- **`castShadow`**: Walls block light and cast shadows
- **`receiveShadow`**: Walls can show shadows from other objects

### 3. PhysicsFloor Component

**File**: `Photography.js` (line ~244)

```javascript
<mesh ref={ref} receiveShadow>
```

- **`receiveShadow`**: Floor displays shadows cast by walls and objects

### 4. PhotoFrame Component

**File**: `Photography.js` (line ~262)

```javascript
<mesh position={position} rotation={rotation} receiveShadow>
```

- **`receiveShadow`**: Photos can show shadows for added depth

### 5. TargetedSpotlight Component (Enhanced)

**File**: `Photography.js` (line ~279)

Added shadow quality configuration:

```javascript
// Configure shadow properties for better quality
if (castShadow && spotlightRef.current.shadow) {
  spotlightRef.current.shadow.mapSize.width = 1024; // Shadow resolution
  spotlightRef.current.shadow.mapSize.height = 1024; // Higher = better quality
  spotlightRef.current.shadow.camera.near = 0.5; // Shadow camera near plane
  spotlightRef.current.shadow.camera.far = 50; // Shadow camera far plane
  spotlightRef.current.shadow.bias = -0.0001; // Prevents shadow artifacts
}
```

## Shadow Quality Settings Explained

### Shadow Map Size (1024x1024)

- Controls the resolution of shadows
- Higher values = sharper shadows but more GPU intensive
- Options: 512, 1024, 2048, 4096
- Current: 1024 (good balance between quality and performance)

### Shadow Camera Near/Far

- **Near (0.5)**: How close to the light shadows start rendering
- **Far (50)**: How far from the light shadows render
- Adjust based on your scene size

### Shadow Bias (-0.0001)

- Prevents "shadow acne" artifacts
- Negative values push shadows slightly away from surfaces
- Adjust if you see strange shadow patterns

## How Shadows Work

```
Spotlight (castShadow=true)
    ↓
    Light rays
    ↓
Wall (castShadow=true) ← Blocks light
    ↓
    Shadow cast
    ↓
Floor (receiveShadow=true) ← Shows shadow
```

## Performance Considerations

Shadows are GPU-intensive. If you experience performance issues:

1. **Reduce shadow map size**: Change 1024 to 512
2. **Limit shadow-casting lights**: Only enable `castShadow` on key lights
3. **Reduce shadow-receiving objects**: Remove `receiveShadow` from less important objects
4. **Use soft shadows**: Increase `penumbra` value for softer, less detailed shadows

## Customization Examples

### Higher Quality Shadows

```javascript
spotlightRef.current.shadow.mapSize.width = 2048;
spotlightRef.current.shadow.mapSize.height = 2048;
```

### Longer Shadow Distance

```javascript
spotlightRef.current.shadow.camera.far = 100;
```

### Fix Shadow Artifacts

If you see strange patterns:

```javascript
spotlightRef.current.shadow.bias = -0.001; // Increase magnitude
```

## Current Lighting Setup

1. **Ambient Light**: Soft overall illumination (no shadows)
2. **Point Light**: General light source (no shadows by default)
3. **General Ceiling Spotlight**: Wide cone for overall illumination (with shadows)
4. **Photo Spotlights**: Focused lights on each photo (with shadows)

All spotlights now properly cast shadows that are blocked by walls!
