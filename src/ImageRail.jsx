import { useEffect, useLayoutEffect, useRef, useState } from "react";
import useWindowDimensions from "./utils/useWindowDimensions";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(gsap);

export default function ImageRail({ active, imagePlaceholders, widthUnit }) {
  //so we go through the array of images
  //calculate their widths, and the width of the gaps
  //and before we populate the images we add as many extra elements as neccesary.

  console.log(imagePlaceholders);
  const gapWidth = widthUnit * 2;
  const imageRail = useRef(null);
  const [railImages, setRailImages] = useState([]);

  //! resize observer might be good here
  const { width, height } = useWindowDimensions();

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

  //! there is an issue with this on page refresh or direct nav to project page. May have to useContext appReady state from Home

  //initial set of the iamge data, and repeat entries until we have enough to cover the whole screen width
  useEffect(() => {
    if (!imageRail.current) return;
    if (!active) return;
    console.log("UE");
    let imagesWidth = 0;
    let index = 0;
    let failsafe = 50;
    const imagesArr = imagePlaceholders;

    //this is all very buggy and probably needs a wholesale rewrite
    while (
      imagesWidth <
        width + aspectRatioToWidth(imagePlaceholders[1].aspectRatio) &&
      index < failsafe
    ) {
      const loopedIndex = index % imagePlaceholders.length;
      const thisWidth = aspectRatioToWidth(
        imagePlaceholders[loopedIndex].aspectRatio,
      );

      imagesWidth = imagesWidth + thisWidth + gapWidth;

      if (index >= imagePlaceholders.length) {
        console.log(imagePlaceholders[loopedIndex]);
        imagesArr.push(imagePlaceholders[loopedIndex]);
      }
    }

    setRailImages(imagesArr);
  }, [active, imageRail, imagePlaceholders]);

  const animatingRef = useRef(false);
  const duration = 0.25;
  const distance = 100;

  function handleForward() {
    if (animatingRef.current) return;
    animatingRef.current = true;
    gsap.to("#work-explore-rail-container", {
      x: `+=${aspectRatioToWidth(railImages[0].aspectRatio) + gapWidth}`,
      duration: duration,
      ease: "none",
      onComplete: () => {
        animatingRef.current = false;
        // const newArr = [...railImages];
        // newArr.unshift(newArr.pop());
        // // console.log(newArr);
        // setRailImages(newArr);
      },
    });
  }

  useEffect(() => {
    console.log("updated rail images");
    console.log(railImages);
  }, [railImages]);

  function handleBack() {
    // if (animatingRef.current) return;
    // animatingRef.current = true;
    // gsap.to("#work-explore-rail-container", {
    //   x: `-=${distance}`,
    //   duration: duration,
    //   ease: "none",
    //   onComplete: () => {
    //     gsap.set("#work-explore-rail-container", { x: - });
    //     animatingRef.current = false;
    //   },
    // });
  }

  //   console.log(railImages[0].aspectRatio);
  //first when user clicks left, we shift the entire container to the left
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
      {/* <button onClick={handleBack} className="work-explore-button left">
        <span className="text-1">{`<-`}</span>
      </button> */}
      <button onClick={handleForward} className="work-explore-button right">
        <span className="text-1">{`->`}</span>
      </button>
      {Array.isArray(railImages) && railImages.length > 0 && (
        <div
          id="work-explore-rail-container"
          //   onClick={() =>
          //     console.log(
          //       ,
          //     )
          //   }
          style={{
            gap: gapWidth,
            transform: `translateX(-${aspectRatioToWidth(railImages[0].aspectRatio) + gapWidth}px)`,
            //   transform: `translateX(-${aspectRatioToWidth(railImages[0].aspectRatio)}px)`,
            // Array.isArray(railImages) &&
            // aspectRatioToWidth(railImages[0].aspectRatio) + gapWidth,
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
