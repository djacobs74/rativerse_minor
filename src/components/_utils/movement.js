export const pathCheck = (hex) => {
	if(Math.abs(hex[0]) > 5 || Math.abs(hex[1]) > 5) {
		return false
	}
	return true
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