# Photography Gallery - Modular Structure

This directory contains the refactored Photography gallery component, organized into a clean, modular structure for better readability and maintainability.

## Directory Structure

```
Photography/
├── index.js                    # Main component - orchestrates everything
├── components/                 # Reusable 3D components
│   ├── Player.js              # Physics-enabled player with FPS controls
│   ├── PhysicsWall.js         # Physics-enabled wall component
│   ├── PhysicsFloor.js        # Physics-enabled floor component
│   ├── PhotoFrame.js          # Photo display component
│   ├── TargetedSpotlight.js   # Spotlight with target positioning
│   └── ExpoScene.js           # Main scene with all 3D objects
├── utils/                      # Utility functions
│   └── keyboard.js            # Keyboard state management
└── constants/                  # Constants and configuration
    └── images.js              # Image asset imports
```

## Component Overview

### `index.js` (Main Component)

- **Purpose**: Entry point for the Photography gallery
- **Responsibilities**:
  - Sets up the Canvas with shadow rendering
  - Configures the Physics world
  - Manages keyboard event listeners
  - Renders the UI overlay with controls

### `components/Player.js`

- **Purpose**: First-person player controller
- **Features**:
  - Physics-enabled sphere for collision detection
  - WASD movement controls
  - Camera synchronization with physics body
  - Configurable movement speed and physics properties

### `components/PhysicsWall.js`

- **Purpose**: Reusable wall component with physics
- **Features**:
  - Static physics body (doesn't move)
  - Casts and receives shadows
  - Configurable position, size, rotation, and color

### `components/PhysicsFloor.js`

- **Purpose**: Floor component with physics
- **Features**:
  - Static physics body
  - Receives shadows from objects above
  - Configurable position, size, and rotation

### `components/PhotoFrame.js`

- **Purpose**: Display photo images in the gallery
- **Features**:
  - Texture loading from image files
  - Receives shadows for realistic lighting
  - Configurable size and position

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

1. Import the image in `constants/images.js`
2. Add a `<PhotoFrame>` in `components/ExpoScene.js`
3. Optionally add a `<TargetedSpotlight>` to illuminate it

### Adding a New Wall

1. Add a `<PhysicsWall>` component in `components/ExpoScene.js`
2. Configure position, size, rotation, and color

### Customizing Lighting

1. Modify spotlight properties in `components/ExpoScene.js`
2. Adjust shadow quality in `components/TargetedSpotlight.js`

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

- Shadow rendering is enabled with 2048x2048 resolution
- Physics simulation runs at 10 iterations per frame
- All components use React best practices (memoization where needed)
- Keyboard state uses a plain object to avoid unnecessary re-renders
