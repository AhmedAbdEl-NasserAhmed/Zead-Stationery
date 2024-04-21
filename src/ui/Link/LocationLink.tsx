import { Link } from "react-router-dom";

interface Props {
  location: string;
  name: string;
  icon: React.ReactNode;
}

function LocationLink({ location, name, icon }: Props) {
  return (
    <Link to={location}>
      <div className="flex gap-8 items-center text-purple-800 ">
        <span className="text-4xl font-semibold ">{name}</span>
        <span className="text-4xl">{icon}</span>
      </div>
    </Link>
  );
}

export default LocationLink;
