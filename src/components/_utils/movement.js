export const moveCheck = (x, y) => {
  
}

export const getPosition = (props) => {
	let position = [];
	if(props.currentPosition.length) {
      position = props.currentPosition;
    } else {
      position = props.startingPosition;
    }

    return position
}