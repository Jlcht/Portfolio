# Photography Gallery - Modular Structure

This directory contains the refactored Photography gallery component, organized into a clean, modular structure for better readability and maintainability.

## Directory Structure

```
Photography/
├── index.js                       # Main component - orchestrates everything
├── components/                    # Reusable 3D components
│   ├── Player.js                 # Physics-enabled player with FPS controls
│   ├── PointerLockControls.js    # Mouse look controls (FPS-style camera)
│   ├── PhysicsWall.js            # Physics-enabled wall component
│   ├── PhysicsFloor.js           # Physics-enabled floor component
│   ├── OptimizedPhotoFrame.js    # Optimized photo display component
│   ├── InstructionsFrame.js      # Interactive instructions display
│   ├── TargetedSpotlight.js      # Spotlight with target positioning
│   └── ExpoScene.js              # Main scene with all 3D objects
├── utils/                         # Utility functions
│   └── keyboard.js               # Keyboard state management
└── constants/                     # Constants and configuration
    ├── images.js                 # Image asset imports
    └── photoFramesData.js        # Photo frame positions and configurations
```

## Component Overview

### `index.js` (Main Component)

- **Purpose**: Entry point for the Photography gallery
- **Responsibilities**:
  - Sets up the Canvas with shadow rendering
  - Configures the Physics world with custom gravity and collision settings
  - Manages keyboard event listeners
  - Implements Suspense with custom loading progress bar
  - Integrates PointerLockControls for FPS-style camera movement

### `components/Player.js`

- **Purpose**: First-person player controller
- **Features**:
  - Physics-enabled sphere for collision detection
  - WASD movement controls
  - Camera synchronization with physics body
  - Configurable movement speed and physics properties
  - Smooth movement with velocity-based physics

### `components/PointerLockControls.js`

- **Purpose**: Mouse look controls for FPS-style camera
- **Features**:
  - Pointer lock API integration (click to lock mouse)
  - Smooth mouse look with configurable sensitivity
  - Escape key to unlock pointer
  - Seamless integration with Three.js camera

### `components/PhysicsWall.js`

- **Purpose**: Reusable wall component with physics
- **Features**:
  - Static physics body (doesn't move)
  - Casts and receives shadows
  - Configurable position, size, rotation, and color
  - Optimized for gallery room construction

### `components/PhysicsFloor.js`

- **Purpose**: Floor component with physics
- **Features**:
  - Static physics body
  - Receives shadows from objects above
  - Configurable position, size, and rotation

### `components/OptimizedPhotoFrame.js`

- **Purpose**: Optimized photo display component
- **Features**:
  - Efficient texture loading with proper disposal
  - Shadow receiving for realistic lighting
  - Configurable size, position, and rotation
  - Performance optimizations for multiple frames
  - Support for various image formats

### `components/InstructionsFrame.js`

- **Purpose**: Interactive instructions display in the gallery
- **Features**:
  - 3D text rendering with custom styling
  - Displays movement and interaction controls
  - Positioned strategically for user guidance
  - Integrated lighting for visibility

### `components/TargetedSpotlight.js`

- **Purpose**: Spotlight that points at a specific target
- **Features**:
  - Dynamic target positioning
  - High-quality shadow rendering (2048x2048)
  - Configurable intensity, angle, color, and penumbra
  - Automatic shadow configuration

### `components/ExpoScene.js`

- **Purpose**: Contains all 3D objects in the gallery
- **Features**:
  - Lighting setup (ambient, point, spotlights)
  - Room walls and floor
  - Gallery divider walls with doorways
  - Photo frames with dedicated spotlights

### `utils/keyboard.js`

- **Purpose**: Keyboard state management
- **Exports**:
  - `keyboard` - Object tracking key states
  - `handleKeyDown` - Key press handler
  - `handleKeyUp` - Key release handler

### `constants/images.js`

- **Purpose**: Centralized image imports
- **Exports**:
  - `images` - Object containing all photo assets
  - Organized imports for easy maintenance

### `constants/photoFramesData.js`

- **Purpose**: Configuration data for photo frame placement
- **Exports**:
  - `photoFramesData` - Array of frame configurations
  - Each entry contains position, rotation, size, and image reference
  - Enables data-driven gallery layout

## Usage

Import the Photography component from the index file:

```javascript
import Photography from "./Photography";

// Use in your app
<Photography />;
```

## Benefits of This Structure

1. **Modularity**: Each component has a single responsibility
2. **Reusability**: Components can be easily reused in other projects
3. **Maintainability**: Easy to find and update specific functionality
4. **Testability**: Individual components can be tested in isolation
5. **Readability**: Smaller files are easier to understand
6. **Scalability**: Easy to add new features without cluttering files

## Adding New Features

### Adding a New Photo

1. Import the image in `constants/images.js`:
   ```javascript
   import newPhoto from "../assets/new-photo.jpg";
   ```
2. Add the image to the `images` object export
3. Add a new entry in `constants/photoFramesData.js`:
   ```javascript
   {
     position: [x, y, z],
     rotation: [0, Math.PI / 2, 0],
     size: [width, height],
     image: images.newPhoto
   }
   ```
4. The frame will automatically render with its dedicated spotlight

### Adding a New Wall

1. Add a `<PhysicsWall>` component in `components/ExpoScene.js`
2. Configure position, size, rotation, and color
3. Ensure proper collision detection by verifying physics properties

### Customizing Lighting

1. Modify spotlight properties in `components/ExpoScene.js`
2. Adjust shadow quality in `components/TargetedSpotlight.js`
3. Each photo frame automatically gets a dedicated spotlight based on `photoFramesData.js`

### Customizing Controls

1. Adjust movement speed in `components/Player.js`
2. Modify mouse sensitivity in `components/PointerLockControls.js`
3. Update keyboard mappings in `utils/keyboard.js`

## Migration from Old Structure

The old `Photography.js` file has been split into this modular structure. All functionality remains the same, but the code is now organized for better maintainability.

To use the new structure, update your import:

```javascript
// Old
import Photography from "./Photography.js";

// New
import Photography from "./Photography";
// or
import Photography from "./Photography/index.js";
```

## Performance Notes

- **Shadow Rendering**: Enabled with 2048x2048 resolution for high-quality shadows
- **Physics Simulation**: Runs at 10 iterations per frame for accurate collision detection
- **Optimized Components**:
  - `OptimizedPhotoFrame` uses efficient texture loading and disposal
  - Data-driven rendering from `photoFramesData.js` reduces code duplication
- **React Best Practices**:
  - Memoization used where needed to prevent unnecessary re-renders
  - Keyboard state uses plain object to avoid re-render triggers
- **Loading Experience**:
  - Suspense boundary with custom progress bar
  - Smooth loading feedback for better UX
- **Controls**:
  - Pointer lock API for immersive FPS experience
  - Velocity-based physics for smooth player movement
- **No Gravity**: Physics world configured with zero gravity for floating camera feel
