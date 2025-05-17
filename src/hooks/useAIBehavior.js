// src/hooks/useAIBehavior.js
import { useReducer, useEffect } from 'react';

/**
 * @typedef {object} AIBehaviorState
 * @property {number} pageViews - Number of pages viewed.
 * @property {{[key: string]: number}} serviceClicks - Count of clicks for each service.
 * @property {boolean} portfolioHovered - Whether the portfolio section has been hovered over.
 * @property {string} scrollBehavior - Describes scroll behavior (e.g., 'scrolled-down', 'scrolled-up').
 */

/** @type {AIBehaviorState} */
const initialState = {
  pageViews: 0,
  serviceClicks: {},
  portfolioHovered: false,
  scrollBehavior: '',
};

/**
 * @typedef {'TRACK_PAGE_VIEW' | 'TRACK_SERVICE_CLICK' | 'TRACK_PORTFOLIO_HOVER' | 'TRACK_SCROLL' | 'RESET_BEHAVIOR'} AIBehaviorActionType
 */

/**
 * @typedef {object} AIBehaviorAction
 * @property {AIBehaviorActionType} type - The type of action.
 * @property {*} [payload] - Optional payload for the action.
 */

/**
 * Reducer function for AI behavior state.
 * @param {AIBehaviorState} state - The current state.
 * @param {AIBehaviorAction} action - The dispatched action.
 * @returns {AIBehaviorState} The new state.
 */
const reducer = (state, action) => {
  switch (action.type) {
    case AIBehaviorActionTypes.TRACK_PAGE_VIEW:
      return { ...state, pageViews: state.pageViews + 1 };
    case AIBehaviorActionTypes.TRACK_SERVICE_CLICK: {
      const { payload: serviceName } = action;
      return {
        ...state,
        serviceClicks: {
          ...state.serviceClicks,
          [serviceName]: (state.serviceClicks[serviceName] ?? 0) + 1, // Use nullish coalescing
        },
      };
    }
    case 'TRACK_PORTFOLIO_HOVER':
      return { ...state, portfolioHovered: action.payload };
    case 'TRACK_SCROLL':
      return { ...state, scrollBehavior: action.payload }; // Consider debouncing or throttling scroll tracking
    case AIBehaviorActionTypes.RESET_BEHAVIOR:
      return { ...initialState };
    default:
      // Ensure action.type is a string before logging
      if (typeof action.type === 'string') {
         console.warn(`Unhandled action type: ${action.type}`);
      } else {
         console.warn('Unhandled action with non-string type:', action.type);
      }
      console.warn(`Unhandled action type: ${action.type}`);
      return state;
  }
};

/**
 * Constants for AI Behavior action types.
 * @readonly
 * @enum {AIBehaviorActionType}
 */
export const AIBehaviorActionTypes = {
  TRACK_PAGE_VIEW: 'TRACK_PAGE_VIEW',
  TRACK_SERVICE_CLICK: 'TRACK_SERVICE_CLICK',
  TRACK_PORTFOLIO_HOVER: 'TRACK_PORTFOLIO_HOVER',
  TRACK_SCROLL: 'TRACK_SCROLL',
  RESET_BEHAVIOR: 'RESET_BEHAVIOR',
};

/**
 * Hook to track user behavior for potential AI insights.
 * State is persisted to localStorage.
 * @returns {AIBehaviorState & {
 *   trackPageView: () => void,
 *   trackServiceClick: (serviceName: string) => void,
 *   trackPortfolioHover: (isHovering: boolean) => void,
 *   trackScroll: (behavior: string) => void,
 *   getMostClickedService: () => string | null,
 *   clearBehavior: () => void
 * }} The current behavior state and functions to track actions.
 */
const useAIBehavior = () => {
  const [state, dispatch] = useReducer(reducer, initialState, (init) => {
    try {
      const saved = localStorage.getItem('aiBehavior');
      return saved ? { ...init, ...JSON.parse(saved) } : init;
    } catch (error) {
      console.error('Failed to load AI behavior from localStorage', error);
      return init;
    }
  });

  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      try { // Wrap localStorage operations in try/catch
        localStorage.setItem('aiBehavior', JSON.stringify(state));
      } catch (error) {
        console.error('Failed to save AI behavior', error);
      }
    }, 500); // debounce saving

    return () => clearTimeout(saveTimeout);
  }, [state]);

  // Memoize dispatch functions to prevent unnecessary re-renders if used as dependencies
  const trackPageView = useCallback(() => dispatch({ type: AIBehaviorActionTypes.TRACK_PAGE_VIEW }), []);
  const trackServiceClick = useCallback((serviceName) => dispatch({ type: AIBehaviorActionTypes.TRACK_SERVICE_CLICK, payload: serviceName }), []);
  const trackPortfolioHover = useCallback((isHovering) => dispatch({ type: AIBehaviorActionTypes.TRACK_PORTFOLIO_HOVER, payload: isHovering }), []);
  const trackScroll = useCallback((behavior) => dispatch({ type: AIBehaviorActionTypes.TRACK_SCROLL, payload: behavior }), []);
  const clearBehavior = useCallback(() => dispatch({ type: AIBehaviorActionTypes.RESET_BEHAVIOR }), []);

  /**
   * Gets the service name with the highest click count.
   */
  const getMostClickedService = () => {
    return Object.entries(state.serviceClicks).reduce((mostClicked, [service, clicks]) => {
      return clicks > (mostClicked.clicks || 0) ? { service, clicks } : mostClicked;
    }, {}).service || null;
  };

  return {
    ...state,
    trackPageView,
    trackServiceClick,
    trackPortfolioHover,
    trackScroll,
    getMostClickedService,
    clearBehavior,
  };
};

export default useAIBehavior;
