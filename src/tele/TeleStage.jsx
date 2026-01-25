import { useRef, useEffect } from "react";
import { useTele } from "./TeleContext";
import TeleCanvas from "./TeleCanvas";

export default function TeleStage() {
  const stageRef = useRef(null);
  const { setCanvasTarget } = useTele();

  useEffect(() => {
    if (stageRef.current) setCanvasTarget(stageRef.current);
  }, [stageRef, setCanvasTarget]);

  return (
    <div
      ref={stageRef}
      id="tele-stage"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
