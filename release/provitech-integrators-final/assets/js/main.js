/**
 * PROVITECH INTEGRATORS — Main Application Entry Point
 * Orchestrates modular vanilla JavaScript modules without build tools.
 */

import { initNavigation } from './navigation.js';
import { initHero } from './hero.js';
import { initContactForm } from './forms.js';
import { initBrandGuidelines } from './brand-guidelines.js';
import { initMotion } from './motion.js';

function initApp() {
  initNavigation();
  initHero();
  initContactForm();
  initBrandGuidelines();
  initMotion();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
