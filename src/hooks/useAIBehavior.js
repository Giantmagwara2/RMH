// src/hooks/useAIBehavior.js
import { useReducer, useEffect } from 'react';

const initialState = {
  pageViews: 0,
  serviceClicks: {},
  portfolioHovered: false,
  scrollBehavior: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'TRACK_PAGE_VIEW':
      return { ...state, pageViews: state.pageViews + 1 };
    case 'TRACK_SERVICE_CLICK': {
      const { payload: serviceName } = action;
      return {
        ...state,
        serviceClicks: {
          ...state.serviceClicks,
          [serviceName]: (state.serviceClicks[serviceName] || 0) + 1,
        },
      };
    }
    case 'TRACK_PORTFOLIO_HOVER':
      return { ...state, portfolioHovered: action.payload };
    case 'TRACK_SCROLL':
      return { ...state, scrollBehavior: action.payload };
    case 'RESET_BEHAVIOR':
      return { ...initialState };
    default:
      console.warn(`Unhandled action type: ${action.type}`);
      return state;
  }
};

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
      try {
        localStorage.setItem('aiBehavior', JSON.stringify(state));
      } catch (error) {
        console.error('Failed to save AI behavior', error);
      }
    }, 500); // debounce saving

    return () => clearTimeout(saveTimeout);
  }, [state]);

  const trackPageView = () => dispatch({ type: 'TRACK_PAGE_VIEW' });
  const trackServiceClick = (serviceName) => dispatch({ type: 'TRACK_SERVICE_CLICK', payload: serviceName });
  const trackPortfolioHover = (isHovering) => dispatch({ type: 'TRACK_PORTFOLIO_HOVER', payload: isHovering });
  const trackScroll = (behavior) => dispatch({ type: 'TRACK_SCROLL', payload: behavior });
  const clearBehavior = () => dispatch({ type: 'RESET_BEHAVIOR' });

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
