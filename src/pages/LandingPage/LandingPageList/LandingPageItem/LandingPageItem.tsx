function LandingPageItem({ link }) {
  return (
    <>
      <li
        id={link.id}
        onClick={link.onClick}
        className=" relative cursor-pointer"
      >
        {link.name}
      </li>
    </>
  );
}

export default LandingPageItem;
