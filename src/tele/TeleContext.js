import { createContext, useContext, useRef, useMemo } from "react";

const TeleContext = createContext(null);

export function TeleProvider({ children }) {
  const canvasTargetRef = useRef(null);

  const value = useMemo(
    () => ({
      canvasTargetRef,
      setCanvasTarget: (el) => {
        canvasTargetRef.current = el;
      },
    }),
    []
  );

  return <TeleContext.Provider value={value}>{children}</TeleContext.Provider>;
}

export function useTele() {
  return useContext(TeleContext);
}
