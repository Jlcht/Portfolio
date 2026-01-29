// ============================================================================
// KEYBOARD STATE MANAGEMENT
// ============================================================================

// Object to track keyboard state (true = key is pressed, false = released)
// This is a plain JavaScript object, NOT React state, because we need to
// access it every frame (60 times per second) without triggering re-renders
export const keyboard = { 
  forward: false,   // W key (forward movement)
  backward: false,  // S key (backward movement)
  leftward: false,  // A key (strafe left)
  rightward: false, // D key (strafe right)
  upward: false,    // Space key (move up)
  downward: false   // Shift key (move down)
};

// ============================================================================
// KEYBOARD EVENT HANDLERS
// ============================================================================

export function handleKeyDown(e) {
  // e.code gives the physical key position (works with AZERTY keyboards)
  // When a key is pressed, set the corresponding keyboard state to true
  if (e.code === 'KeyW') keyboard.forward = true;    // W or Z on AZERTY
  if (e.code === 'KeyS') keyboard.backward = true;   // S
  if (e.code === 'KeyA') keyboard.leftward = true;   // A or Q on AZERTY
  if (e.code === 'KeyD') keyboard.rightward = true;  // D
  if (e.code === 'Space') keyboard.upward = true;    // Space to go up
  if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') keyboard.downward = true; // Shift to go down
}

export function handleKeyUp(e) {
  // When a key is released, set the corresponding keyboard state to false
  if (e.code === 'KeyW') keyboard.forward = false;
  if (e.code === 'KeyS') keyboard.backward = false;
  if (e.code === 'KeyA') keyboard.leftward = false;
  if (e.code === 'KeyD') keyboard.rightward = false;
  if (e.code === 'Space') keyboard.upward = false;
  if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') keyboard.downward = false;
}
