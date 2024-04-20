import { Link } from "react-router-dom";

interface Props {
  location: string;
  name: string;
}

function LocationLink({ location, name }: Props) {
  return (
    <Link to={location}>
      <span className="text-4xl font-semibold text-purple-800">{name}</span>
    </Link>
  );
}

export default LocationLink;
