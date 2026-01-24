//styling
import "./scss/Home.scss";

export default function ExplorePage({ proj }) {
  console.log(proj);
  return (
    <div className="text-1" style={{ color: "#ffffff", fontSize: 96 }}>
      Project Page for {proj.project}
    </div>
  );
}
