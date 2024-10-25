const isDataOutdated = (date: number) => {

	const now = Math.round(Date.now() / 1000);
	const twoDaysAgo = 2 * 24 * 60 * 60;

	return now - date > twoDaysAgo;

};

export default isDataOutdated;