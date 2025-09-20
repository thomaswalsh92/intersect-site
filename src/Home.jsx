import "./Home.scss";

function IntersectLogoLeft() {
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 375 1500"
    >
      <g id="s-left">
        <path
          class="cls-1"
          d="M54.92,695.08c35.16,35.16,82.85,54.92,132.58,54.92h0c49.73,0,97.42,19.75,132.58,54.92h0c35.16,35.16,54.92,82.85,54.92,132.58v-375h0V187.5c0,49.73-19.75,97.42-54.92,132.58h0c-35.16,35.16-82.85,54.92-132.58,54.92h0c-49.73,0-97.42,19.75-132.58,54.92h0C19.75,465.08,0,512.77,0,562.5H0C0,612.23,19.75,659.92,54.92,695.08h0Z"
        />
        <path
          class="cls-1"
          d="M375,1312.5v-375c0,49.73-19.75,97.42-54.92,132.58h0c-35.16,35.16-82.85,54.92-132.58,54.92h0c-49.73,0-97.42,19.75-132.58,54.92h0C19.75,1215.08,0,1262.77,0,1312.5H0C0,1362.23,19.75,1409.92,54.92,1445.08h0c35.16,35.16,82.85,54.92,132.58,54.92h0c49.73,0,97.42-19.75,132.58-54.92h0c35.16-35.16,54.92-82.85,54.92-132.58h0Z"
        />
      </g>
    </svg>
  );
}

function IntersectLogoCenter() {
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 375 1500"
    >
      <g id="i">
        <path
          id="i-body"
          class="cls-1"
          d="M54.92,1179.92h0c35.16-35.16,54.92-82.85,54.92-132.58v-32.17c0-49.73-19.75-97.42-54.92-132.58h0C19.75,847.42,0,799.73,0,750H0C0,700.27,19.75,652.58,54.92,617.42h0c35.16-35.16,82.85-54.92,132.58-54.92h0c49.73,0,97.42,19.75,132.58,54.92h0c35.16,35.16,54.92,82.85,54.92,132.58h0c0,49.73-19.75,97.42-54.92,132.58h0c-35.16,35.16-54.92,82.85-54.92,132.58v32.17c0,49.73,19.75,97.42,54.92,132.58h0c35.16,35.16,54.92,82.85,54.92,132.58h0c0,49.73-19.75,97.42-54.92,132.58h0c-35.16,35.16-82.85,54.92-132.58,54.92h0c-49.73,0-97.42-19.75-132.58-54.92h0C19.75,1409.92,0,1362.23,0,1312.5H0C0,1262.77,19.75,1215.08,54.92,1179.92Z"
        />
        <path
          id="i-dot"
          class="cls-1"
          d="M187.5,0h0c-49.73,0-97.42,19.75-132.58,54.92h0C19.75,90.08,0,137.77,0,187.5H0c0,49.73,19.75,97.42,54.92,132.58h0c35.16,35.16,82.85,54.92,132.58,54.92h0c49.73,0,97.42-19.75,132.58-54.92h0c35.16-35.16,54.92-82.85,54.92-132.58h0c0-49.73-19.75-97.42-54.92-132.58h0C284.92,19.75,237.23,0,187.5,0Z"
        />
      </g>
    </svg>
  );
}

function IntersectLogoRight() {
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 375 1500"
    >
      <g id="s-right">
        <path
          class="cls-1"
          d="M320.08,805.08c-35.16-35.16-82.85-54.92-132.58-54.92h0c-49.73,0-97.42-19.75-132.58-54.92h0C19.75,660.08,0,612.39,0,562.66v375H0v375C0,1262.94,19.75,1215.24,54.92,1180.08h0c35.16-35.16,82.85-54.92,132.58-54.92h0c49.73,0,97.42-19.75,132.58-54.92h0c35.16-35.16,54.92-82.85,54.92-132.58h0c0-49.73-19.75-97.42-54.92-132.58h0Z"
        />
        <path
          class="cls-1"
          d="M0,187.66v375C0,512.94,19.75,465.24,54.92,430.08h0c35.16-35.16,82.85-54.92,132.58-54.92h0c49.73,0,97.42-19.75,132.58-54.92h0c35.16-35.16,54.92-82.85,54.92-132.58h0c0-49.73-19.75-97.42-54.92-132.58h0C284.92,19.92,237.23.16,187.5.16h0C137.77.16,90.08,19.92,54.92,55.08h0C19.75,90.24,0,137.94,0,187.66H0Z"
        />
      </g>
    </svg>
  );
}

export default function Home() {
  const landingCapabilties = ["WEB", "UX", "GRAPHICS", "BRAND", "MOTION", "3D"];

  return (
    <div id="home">
      <div id="navbar">
        <p id="navbar-title" className="text-1">
          INTERSECT
        </p>
        <div id="navbar-menu">
          <p className="text-2">HOME</p>
          <p className="text-2">WORK</p>
          <p className="text-2">INFO</p>
        </div>
      </div>
      <div id="home-bg">
        <div className="home-bg-logo-container" id="logo-lower">
          <IntersectLogoLeft />
          <IntersectLogoCenter />
          <IntersectLogoRight />
        </div>
        <div id="home-bg-invert-layer"></div>
      </div>
      <div id="home-content">
        <div id="landing">
          <div id="landing-capabilities" className="text-2">
            <p>DESIGN & DEVELOPMENT</p>
            <p className="indent-1">{"{"}</p>
            {landingCapabilties.map((item) => {
              return <p className="indent-2">{`<${item} />`}</p>;
            })}
            <p className="indent-1">{"}"}</p>
          </div>
          <div id="landing-flavour">
            <p className="text-2">
              <span className="text-1">INTERSECT</span> (verb): the integration
              technology, art, design, life.
            </p>
            <p className="text-2" style={{ "margin-top": 8 }}>
              {" "}
              In pursuit of <span className="text-1">DREAMS</span> through
              digital means.
            </p>
          </div>
          <div id="landing-title-container">
            <span id="landing-title" className="text-1">
              INTERSECT
            </span>
          </div>
        </div>
        <div id="reel">
          <span id="landing-title" className="text-1">
            REEL
          </span>
        </div>
        <div id="work">
          <span id="landing-title" className="text-1">
            WORK
          </span>
        </div>
        <div id="info">
          <span id="landing-title" className="text-1">
            INFO
          </span>
        </div>
      </div>
    </div>
  );
}
