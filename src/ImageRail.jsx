import { useEffect, useLayoutEffect, useRef, useState } from "react";
import useWindowDimensions from "./utils/useWindowDimensions";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(gsap);

export default function ImageRail({ active, imagePlaceholders, widthUnit }) {
  //so we go through the array of images
  //calculate their widths, and the width of the gaps
  //and before we populate the images we add as many extra elements as neccesary.
  const gapWidth = widthUnit * 2;
  const imageRail = useRef(null);
  const [railImages, setRailImages] = useState();

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
    if (!active || !imageRail.current) return;

    setRailImages([...imagePlaceholders]);
  }, [active, imageRail, imagePlaceholders]);

  //"forward", "back" or false;
  const animatingRef = useRef(false);
  const ease = "none";
  const duration = 0.2;

  function handleForward() {
    if (animatingRef.current) return;
    animatingRef.current = "forward";
    let newArr = [...railImages];
    const last = newArr.pop();
    newArr.unshift(last);
    console.log("fwd: ", newArr);
    setRailImages(newArr);
  }

  useEffect(() => {
    if (animatingRef.current === "forward") {
      const distance = aspectRatioToWidth(railImages[0].aspectRatio) + gapWidth;

      gsap
        .timeline()
        .set("#work-explore-rail-container", {
          x: `-=${distance}`,
        })
        .to("#work-explore-rail-container", {
          x: `+=${distance}`,
          duration: duration,
          ease: ease,
          onComplete: () => (animatingRef.current = false),
        });
    }
  }, [railImages]);

  function handleBack() {
    if (animatingRef.current) return;
    animatingRef.current = "back";
    const distance =
      aspectRatioToWidth(railImages[railImages.length - 1].aspectRatio) +
      gapWidth;

    gsap.timeline().to("#work-explore-rail-container", {
      x: `-=${distance}`,
      duration: duration,
      ease: ease,
      onComplete: () => {
        let newArr = [...railImages];
        const first = newArr.shift();
        newArr.push(first);
        console.log("back: ", newArr);
        setRailImages(newArr);
      },
    });
  }

  useEffect(() => {
    if (animatingRef.current === "back") {
      const distance = aspectRatioToWidth(railImages[0].aspectRatio) + gapWidth;

      gsap.timeline().set("#work-explore-rail-container", {
        x: `+=${distance}`,
      });
      animatingRef.current = false;
    }
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
