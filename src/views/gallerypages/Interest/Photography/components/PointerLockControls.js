// ============================================================================
// CUSTOM POINTER LOCK CONTROLS - With Error Handling
// ============================================================================

import React, { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { PointerLockControls as PointerLockControlsImpl } from 'three-stdlib';

export function PointerLockControls() {
  const { camera, gl } = useThree();
  const controlsRef = useRef();

  useEffect(() => {
    const controls = new PointerLockControlsImpl(camera, gl.domElement);
    controlsRef.current = controls;

    // Add click listener to lock pointer
    const handleClick = async () => {
      try {
        await controls.lock();
      } catch (error) {
        // Silently ignore pointer lock errors
        // These are usually "user exited lock" errors which are harmless
      }
    };

    gl.domElement.addEventListener('click', handleClick);

    // Suppress console.error for pointer lock messages
    const originalError = console.error;
    console.error = (...args) => {
      const message = args[0]?.toString() || '';
      
      // Filter out pointer lock related errors
      if (
        message.includes('The user has exited the lock') ||
        message.includes('Unable to use Pointer Lock API') ||
        message.includes('PointerLockControls')
      ) {
        return; // Silently ignore
      }
      
      // Log all other errors normally
      originalError.apply(console, args);
    };

    // Suppress unhandled promise rejections for pointer lock
    const handleRejection = (event) => {
      const message = event.reason?.message || event.reason?.toString() || '';
      
      if (
        message.includes('The user has exited the lock') ||
        message.includes('Pointer Lock')
      ) {
        event.preventDefault(); // Prevent the error from being logged
      }
    };

    window.addEventListener('unhandledrejection', handleRejection);

    // Cleanup
    return () => {
      gl.domElement.removeEventListener('click', handleClick);
      window.removeEventListener('unhandledrejection', handleRejection);
      controls.dispose();
      console.error = originalError; // Restore original console.error
    };
  }, [camera, gl]);

  return null;
}
