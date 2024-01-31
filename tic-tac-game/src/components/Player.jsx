import { useState } from "react";

const Player = ({ initialName, symbol, isActive }) => {
  const [playername, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  const handleButtonClick = () => {
    setIsEditing((prevEditingValue) => !prevEditingValue); //react recomands as best practise, to use a callback when needed to change previuos state in other, that's because in this way React is sure to pass the latest value to the function
  };

  const handleChange = (event) => {
    setPlayerName(event.target.value);
  };

  let editablePlayerName = <span className="player-name">{playername}</span>;
  //rendering conditionally the input if the edit button is clicked
  if (isEditing) {
    editablePlayerName = (
      <input
        type="text"
        required
        value={playername}
        onChange={handleChange}
      ></input>
    );
  }

  return (
    <li className={isActive ? 'active' : undefined } >
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleButtonClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
};

export default Player;
