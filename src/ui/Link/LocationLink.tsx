import { Link } from "react-router-dom";

interface Props {
  location: string;
  name: string;
}

function LocationLink({ location, name }: Props) {
  return <Link to={location}>{name}</Link>;
}

export default LocationLink;
