/**
 * Safe Google Analytics 4 (gtag.js) Event Helper
 * Measurement ID: G-03FE91LXDH
 */

/**
 * Dispatch a custom event to Google Analytics
 * @param {string} eventName 
 * @param {Record<string, any>} [eventParams] 
 */
export function trackEvent(eventName, eventParams = {}) {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', eventName, eventParams);
    }
  } catch (err) {
    // Fail silently so analytics blockers or errors never disrupt app execution
    console.debug('[Analytics] Failed to track event:', eventName, err);
  }
}

/**
 * Track specific theory tab switch
 * @param {'odt' | 'hypercomplex'} theoryId 
 */
export function trackTheoryView(theoryId) {
  trackEvent('theory_switch', {
    theory_id: theoryId,
    theory_name: theoryId === 'odt' 
      ? 'Theory II: Oscillating Dimensional Trajectories' 
      : 'Theory I: Quasicrystalline Frustration & Julia Boundaries',
    timestamp: new Date().toISOString()
  });
}
