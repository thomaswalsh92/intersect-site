import { createContext, useContext, useState } from "react";

const TeleContext = createContext(null);

export function TeleProvider({ children }) {
  const [canvasTarget, setCanvasTarget] = useState(null);

  return (
    <TeleContext.Provider value={{ canvasTarget, setCanvasTarget }}>
      {children}
    </TeleContext.Provider>
  );
}

export function useTele() {
  return useContext(TeleContext);
}
