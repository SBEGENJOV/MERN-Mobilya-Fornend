const navbar = () => {
  return (
    <div className="collapse navbar-collapse menu-ui-design" id="navbar-menu">
      <ul
        className="nav navbar-nav navbar-center"
        data-in="fadeInDown"
        data-out="fadeOutUp"
      >
        <li className=" scroll active">
          <a href="#home">home</a>
        </li>
        <li className="scroll">
          <a href="#new-arrivals">new arrival</a>
        </li>
        <li className="scroll">
          <a href="#feature">features</a>
        </li>
        <li className="scroll">
          <a href="#blog">blog</a>
        </li>
        <li className="scroll">
          <a href="#newsletter">contact</a>
        </li>
      </ul>
    </div>
  );
};

export default navbar;
