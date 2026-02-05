import { useEffect, useLayoutEffect, useRef, useState } from "react";
import useWindowDimensions from "./utils/useWindowDimensions";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(gsap);

export default function ImageRail({
  active,
  imagePlaceholders,
  width,
  widthUnit,
}) {
  const gapWidth = widthUnit * 2;
  const imageRail = useRef(null);
  const [railHeight, setRailHeight] = useState();
  const [railImages, setRailImages] = useState();
  const [bufferArrayOffset, setBufferArrayOffset] = useState();
  const slideLeftRef = useRef(null);
  const slideRightRef = useRef(null);
  const leftActive = useRef(false);
  const rightActive = useRef(false);
  const buttonLeft = useRef(null);
  const buttonRight = useRef(null);

  const handleMouseMove = (e) => {
    const x = e.clientX;
    const width = window.innerWidth;

    const isLeftSide = x < width * 0.33;
    const isRightSide = x > width * 0.66;

    // LEFT
    if (isLeftSide && !leftActive.current) {
      activateLeft();
    } else if (!isLeftSide && leftActive.current) {
      deactivateLeft();
    }

    // RIGHT
    if (isRightSide && !rightActive.current) {
      activateRight();
    } else if (!isRightSide && rightActive.current) {
      deactivateRight();
    }
  };

  const slideDuration = 0.18;
  const slideEase = "power4.inOut";
  const buttonWidth = 64;

  // const { width, height } = useWindowDimensions();

  useGSAP(() => {
    if (!buttonLeft.current || !buttonRight.current) return;

    slideLeftRef.current = gsap.to(buttonLeft.current, {
      x: buttonWidth,
      duration: slideDuration,
      ease: slideEase,
      paused: true,
    });

    slideRightRef.current = gsap.to(buttonRight.current, {
      x: -buttonWidth,
      duration: slideDuration,
      ease: slideEase,
      paused: true,
    });
  }, []);

  let slideButtonLeft;
  if (buttonLeft.current) {
    slideButtonLeft = gsap.to(buttonLeft.current, {
      x: buttonLeft.current.offsetWidth,
      duration: slideDuration,
      ease: slideEase,
      paused: true,
    });
  }

  let slideButtonRight;
  if (buttonRight.current) {
    slideButtonRight = gsap.to(buttonRight.current, {
      x: -buttonRight.current.offsetWidth,
      duration: slideDuration,
      ease: slideEase,
      paused: true,
    });
  }

  function activateLeft() {
    if (leftActive.current) return;
    leftActive.current = true;
    slideLeftRef.current.play();
  }

  function deactivateLeft() {
    leftActive.current = false;
    slideLeftRef.current.reverse();
  }

  function activateRight() {
    if (rightActive.current) return;
    rightActive.current = true;
    slideRightRef.current.play();
  }

  function deactivateRight() {
    rightActive.current = false;
    slideRightRef.current.reverse();
  }

  // useGSAP(() => {
  //   if (!buttonRight.current) return;
  //   let isActive = false;
  // }, [showButtonRight, buttonRight]);
  //! resize observer might be good here
  // const { width, height } = useWindowDimensions();

  function getAspectRatioFromWidth(aspectRatio) {
    function calculate(aspectWidth, aspectHeight) {
      if (aspectWidth === aspectHeight) {
        return railHeight;
      }
      const unitHeight = railHeight / aspectHeight;
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
      const thisWidth = getAspectRatioFromWidth(el.aspectRatio);
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
  useLayoutEffect(() => {
    if (!imageRail.current) return;

    const ro = new ResizeObserver(([entry]) => {
      setRailHeight(entry.contentRect.height);
    });

    ro.observe(imageRail.current);

    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!active || !widthUnit || !railHeight) return;

    const wideEnoughArr = checkLengthAndDouble(imagePlaceholders);
    setRailImages(wideEnoughArr);
    setBufferArrayOffset(getImagesWidthTotal(imagePlaceholders) + gapWidth + 2);
  }, [active, widthUnit, railHeight]);

  const animatingRef = useRef(false);
  const ease = "none";
  const pixelsPerSecond = 2300;

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
      id="work-explore-image-rail"
      className="work-grid-block work-grid-end-block"
      style={{
        gridColumn: "span 38",
        gridRow: "span 13",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        deactivateLeft();
        deactivateRight();
      }}
    >
      <button
        ref={buttonLeft}
        onClick={handleForward}
        className="work-explore-button left"
        style={{
          width: buttonWidth,
          left: -buttonWidth,
        }}
      >
        <span className="text-1">{`<-`}</span>
      </button>
      <button
        ref={buttonRight}
        onClick={handleBack}
        className="work-explore-button right"
        style={{
          width: buttonWidth,
          right: -buttonWidth,
        }}
      >
        <span className="text-1">{`->`}</span>
      </button>

      <div
        ref={imageRail}
        id="work-explore-rail-container"
        style={{
          gap: gapWidth,
          transform: `translateX(-${bufferArrayOffset}px)`,
        }}
      >
        {Array.isArray(railImages) &&
          railImages.map(({ aspectRatio, img }, i) => {
            return (
              <div
                key={i}
                className="work-explore-image-container"
                style={{
                  height: "100%",
                  aspectRatio: aspectRatio,
                }}
              >
                <img src={img} />
              </div>
            );
          })}
      </div>
    </div>
  );
}
