import { Link } from "react-router-dom";

function ArtifactCard({ artifact }) {
  return (
    <Link to={`/artifacts/${artifact.slug}`}>
      <div className="artifact-card">
        <img src={artifact.image} alt={artifact.name} />
        <h3>{artifact.name}</h3>
        <p>{artifact.period}</p>
      </div>
    </Link>
  );
}

export default ArtifactCard;
