// ===========================
// MAIN API MODULE (Refactored)
// ===========================
// This file now re-exports from individual API modules
// for backward compatibility

export * from './index';

// Default export remains the same
export { default } from './apiClient';
