import { useState } from "react";

export default function Player({name, symbol, isActive}){
    const [isEditing, setIsEdintng] = useState(false);
    const [playerName, setPlayerName] = useState(name)
    const onEditClick = () => {
        setIsEdintng((editing) =>{
            return !editing;
        });
    }

    const handleChange = (event) =>{
        setPlayerName(event.target.value);
    }
    return(
        <li className={isActive? 'active':undefined}>
            <span className="player">
                {!isEditing && <span className="player-name">{playerName}</span>}
                {isEditing && <input type="text" required value= {playerName} onChange={handleChange}></input>}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={onEditClick}>{isEditing?"Save" : "Edit"}</button>
        </li>
    );
}