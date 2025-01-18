import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Progress({
  index,
  total,
}: {
  index: number;
  total: number;
}) {
  return (
    <div className="progress">
      {Array.from({ length: total }).map((_, i) => (
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          className={`star ${i < index ? "active" : ""}`}
          fillOpacity={i < index ? 1 : 0.5}
        />
      ))}
    </div>
  );
}
