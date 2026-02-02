import { useEffect, useLayoutEffect, useRef, useState } from "react";
import useWindowDimensions from "./utils/useWindowDimensions";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(gsap);

export default function ImageRail({ active, imagePlaceholders, widthUnit }) {
  const gapWidth = widthUnit * 2;
  const imageRail = useRef(null);
  const [railImages, setRailImages] = useState();
  const [bufferArrayOffset, setBufferArrayOffset] = useState();

  //! resize observer might be good here
  // const { width, height } = useWindowDimensions();

  function aspectRatioToWidth(aspectRatio) {
    function calculate(aspectWidth, aspectHeight) {
      if (aspectWidth === aspectHeight) {
        return imageRail.current.offsetHeight;
      }
      const unitHeight = imageRail.current.offsetHeight / aspectHeight;
      return unitHeight * aspectWidth;
    }
    //! add supported aspect ratios here
    switch (aspectRatio) {
      case "4 / 5":
        return calculate(4, 5);

      case "9 / 16":
        return calculate(9, 16);

      case "16 / 9":
        return calculate(16, 9);

      case "1 / 1":
        return calculate(1, 1);

      default:
        return null;
    }
  }

  function getImagesWidthTotal(arr) {
    let imagesWidthTotal = 0;

    arr.forEach((el) => {
      const thisWidth = aspectRatioToWidth(el.aspectRatio);
      el.width = thisWidth;
      imagesWidthTotal += thisWidth;
    });

    imagesWidthTotal = imagesWidthTotal + gapWidth * (arr.length - 1);

    return imagesWidthTotal;
  }

  function checkLengthAndDouble(arr, depth = 0) {
    const totalWidth = getImagesWidthTotal(arr);
    const extraLoopBuffer = getImagesWidthTotal(imagePlaceholders);
    if (totalWidth > window.innerWidth + extraLoopBuffer && depth >= 1) {
      return arr;
    }
    let newArr;
    newArr = [...arr, ...arr];
    let newDepth = depth + 1;
    return checkLengthAndDouble(newArr, newDepth);
  }

  useEffect(() => {
    if (!active || !imageRail.current || !widthUnit) return;

    const wideEnoughArr = checkLengthAndDouble(imagePlaceholders);
    setRailImages(wideEnoughArr);
    setBufferArrayOffset(getImagesWidthTotal(imagePlaceholders) + gapWidth);
  }, [active, imageRail, imagePlaceholders]);

  //"forward", "back" or false;
  const animatingRef = useRef(false);
  const ease = "none";
  const pixelsPerSecond = 1900;

  function calcConstantDuration(width) {
    return width / pixelsPerSecond;
  }

  function handleForward() {
    if (animatingRef.current) return;
    animatingRef.current = "forward";

    const distance = railImages[railImages.length - 1].width + gapWidth;

    gsap.timeline().to("#work-explore-rail-container", {
      x: `+=${distance}px`,
      duration: calcConstantDuration(distance),
      ease: ease,
      onComplete: () => {
        let newArr = [...railImages];
        const last = newArr.pop();
        newArr.unshift(last);
        setRailImages(newArr);
      },
    });
  }

  function handleBack() {
    if (animatingRef.current) return;
    animatingRef.current = "back";
    const distance = railImages[0].width + gapWidth;

    gsap.timeline().to("#work-explore-rail-container", {
      x: `-=${distance}px`,
      duration: calcConstantDuration(distance),
      ease: ease,
      onComplete: () => {
        let newArr = [...railImages];
        const first = newArr.shift();
        newArr.push(first);
        setRailImages(newArr);
      },
    });
  }

  useGSAP(() => {
    gsap.set("#work-explore-rail-container", {
      x: -bufferArrayOffset,
      onComplete: () => (animatingRef.current = false),
    });
  }, [railImages]);

  return (
    <div
      ref={imageRail}
      id="work-explore-image-rail"
      className="work-grid-block work-grid-end-block"
      style={{
        gridColumn: "span 38",
        gridRow: "span 13",
      }}
    >
      <button onClick={handleBack} className="work-explore-button left">
        <span className="text-1">{`<-`}</span>
      </button>
      <button onClick={handleForward} className="work-explore-button right">
        <span className="text-1">{`->`}</span>
      </button>
      {Array.isArray(railImages) &&
        railImages.length > 0 &&
        bufferArrayOffset && (
          <div
            id="work-explore-rail-container"
            style={{
              gap: gapWidth,
              transform: `translateX(-${bufferArrayOffset}px)`,
            }}
          >
            {Array.isArray(railImages) &&
              railImages.map(({ aspectRatio, color }) => {
                return (
                  <div
                    className="work-explore-image-container"
                    style={{
                      height: "100%",
                      aspectRatio: aspectRatio,
                      background: color,
                    }}
                  ></div>
                );
              })}
          </div>
        )}
    </div>
  );
}
