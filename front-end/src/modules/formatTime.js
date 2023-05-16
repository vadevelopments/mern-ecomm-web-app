function formatTime(createdAt) {
	const currentTime = new Date();
	const commentTime = new Date(createdAt);
	const timeDiff = Math.abs(currentTime - commentTime);
	const minutes = Math.floor(timeDiff / (1000 * 60));
	const hours = Math.floor(timeDiff / (1000 * 60 * 60));
	const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
	const months = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30));
	const years = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));

    if (minutes < 60) {
		return `${minutes} min${minutes !== 1 ? 's' : ''}`;
	} else if (hours < 24) {
		return `${hours} h${hours !== 1 ? 's' : ''}`;
	} else if (days < 7) {
		return `${days} d${days !== 1 ? 's' : ''}`;
	} else if (months < 12) {
		return `${months} m${months !== 1 ? 's' : ''}`;
	} else {
		return `${years} y${years !== 1 ? 's' : ''}`;
	}
}

export default formatTime