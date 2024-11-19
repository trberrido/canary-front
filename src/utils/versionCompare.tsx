const versionCompare = (version1: string, version2: string) => {

	if (!version1 || !version2) return 'major';

	const v1Parts = version1.split('.');
    const v2Parts = version2.split('.');

	while (v1Parts.length < 3) v1Parts.push('0');
    while (v2Parts.length < 3) v2Parts.push('0');

	if (v1Parts[0] !== v2Parts[0]) return 'major';

	if (v1Parts[1] !== v2Parts[1]) return 'minor';

	if (v1Parts[2] !== v2Parts[2]) return 'patch';

	return '';
}

export default versionCompare;