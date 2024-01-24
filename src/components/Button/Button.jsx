import { useState } from 'react';

function ButtonColor() {
    const [buttonColor, setButtonColor] = useState(false);
    // const [buttonText, setButtonText] = useState();

function handleClick() {
    setButtonColor(buttonColor => !buttonColor);
    // setButtonText(buttonText => !buttonText);
}

let toggleColor = buttonColor ? 'black' : 'tan';
// let toggleText = buttonText ? 'No' : 'Yes'

return(
    <button className={`${toggleColor}`} onClick={handleClick}>Completed</button>
)
}

export default ButtonColor;