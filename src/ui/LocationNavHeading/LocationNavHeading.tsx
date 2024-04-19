interface Props {
  name: string;
}

function LocationNavHeading({ name }: Props) {
  return <h2>{name}</h2>;
}

export default LocationNavHeading;
