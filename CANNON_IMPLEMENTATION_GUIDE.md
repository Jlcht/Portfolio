# Cannon.js Wall Collision Implementation Guide

## Overview

This guide shows how to implement physics-based wall collision in your Photography gallery using Cannon.js.

## Key Concepts

### 1. Physics World

- A simulation environment where physics calculations happen
- Runs independently from the visual rendering
- Handles gravity, collisions, forces, etc.

### 2. Physics Bodies

- Invisible objects that have physical properties (mass, velocity, friction)
- **Dynamic bodies**: Can move and be affected by forces (player)
- **Static bodies**: Don't move, used for walls and floors

### 3. Collision Detection

- Cannon.js automatically detects when bodies intersect
- Resolves collisions by pushing bodies apart
- More realistic than simple boundary clamping

## Implementation Steps

### Step 1: Wrap Your Scene with Physics Provider

```jsx
import { Physics } from "@react-three/cannon";

export default function Photography() {
  return (
    <Canvas>
      <Physics gravity={[0, -9.81, 0]}>
        {" "}
        {/* Add gravity if needed */}
        <ExpoScene />
        <FPSController />
      </Physics>
    </Canvas>
  );
}
```

### Step 2: Create Physics Walls

Replace your visual walls with physics-enabled walls:

```jsx
import { useBox } from "@react-three/cannon";

function PhysicsWall({ position, args, rotation = [0, 0, 0], color = "#aaa" }) {
  // Create a static physics body (doesn't move)
  const [ref] = useBox(() => ({
    type: "Static", // Wall doesn't move
    position: position, // Position in 3D space
    args: args, // Size [width, height, depth]
    rotation: rotation, // Rotation in radians
  }));

  return (
    <mesh ref={ref} position={position} rotation={rotation}>
      <boxGeometry args={args} />
      <meshLambertMaterial color={color} />
    </mesh>
  );
}

// Usage in ExpoScene:
<PhysicsWall position={[0, 4, 0]} args={[60, 8, 0.2]} color="#ff0000" />;
```

### Step 3: Create Player Physics Body

Create an invisible sphere that represents the player:

```jsx
import { useSphere } from "@react-three/cannon";

function Player() {
  const { camera } = useThree();

  // Create a dynamic physics body (can move)
  const [ref, api] = useSphere(() => ({
    mass: 1, // Has mass, affected by forces
    type: "Dynamic", // Can move
    position: [0, 2, 5], // Starting position
    args: [0.5], // Radius of sphere (player size)
    fixedRotation: true, // Prevent tumbling
    linearDamping: 0.9, // Friction/drag
  }));

  // Store velocity reference
  const velocity = useRef([0, 0, 0]);

  // Subscribe to physics body position changes
  useEffect(() => {
    const unsubscribe = api.position.subscribe((p) => {
      camera.position.set(p[0], p[1], p[2]);
    });
    return unsubscribe;
  }, [api, camera]);

  // Subscribe to velocity changes
  useEffect(() => {
    const unsubscribe = api.velocity.subscribe((v) => {
      velocity.current = v;
    });
    return unsubscribe;
  }, [api]);

  // Apply movement forces based on keyboard input
  useFrame(() => {
    const speed = 5; // Movement force strength

    // Calculate movement direction
    camera.getWorldDirection(frontVector.current);
    sideVector.current.crossVectors(camera.up, frontVector.current);

    // Calculate desired velocity
    const frontMovement = Number(keyboard.forward) - Number(keyboard.backward);
    const sideMovement = Number(keyboard.leftward) - Number(keyboard.rightward);

    const newVelocity = [
      sideVector.current.x * sideMovement * speed +
        frontVector.current.x * frontMovement * speed,
      velocity.current[1], // Keep vertical velocity
      sideVector.current.z * sideMovement * speed +
        frontVector.current.z * frontMovement * speed,
    ];

    // Apply velocity to physics body
    api.velocity.set(newVelocity[0], newVelocity[1], newVelocity[2]);
  });

  return <mesh ref={ref} />; // Invisible mesh
}
```

### Step 4: Complete Example Structure

```jsx
import { Physics, useBox, useSphere } from "@react-three/cannon";

export default function Photography() {
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        background: "#111",
      }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <Canvas camera={{ position: [0, 2, 5], fov: 75 }}>
          <PointerLockControls />

          {/* Wrap everything in Physics */}
          <Physics gravity={[0, 0, 0]}>
            {" "}
            {/* No gravity for FPS feel */}
            <Player />
            <ExpoScene />
          </Physics>
        </Canvas>
      </Suspense>
    </div>
  );
}
```

## Advantages of Cannon.js

1. **Realistic Collisions**: Smooth sliding along walls instead of hard stops
2. **Automatic Resolution**: No manual boundary checking needed
3. **Physics Interactions**: Can add gravity, jumping, pushing objects
4. **Performance**: Optimized collision detection
5. **Extensible**: Easy to add more physics features later

## Common Issues & Solutions

### Issue: Player falls through floor

**Solution**: Make sure floor has `type: 'Static'` and proper position

### Issue: Player gets stuck in walls

**Solution**: Reduce player sphere radius or adjust wall thickness

### Issue: Movement feels floaty

**Solution**: Increase `linearDamping` (0.9-0.95) for more friction

### Issue: Camera jitters

**Solution**: Use `fixedRotation: true` on player body

## Performance Tips

1. Use simple collision shapes (spheres, boxes) instead of complex meshes
2. Set `gravity={[0, 0, 0]}` if you don't need gravity
3. Use `linearDamping` instead of manually resetting velocity
4. Keep physics bodies count reasonable (< 100 for good performance)

## Next Steps

1. Add jumping with `api.velocity.set(x, jumpForce, z)`
2. Add crouching by changing player sphere radius
3. Add physics-based objects you can push
4. Implement stairs with ramps
5. Add collision sounds using collision events
