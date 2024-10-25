import './PriorityTags.scss';

import { SiteDataOK, PluginsList, Version } from "../types/SiteData";
import { diff as versionDiff } from 'semver';
import isDataOutdated from '../utils/isOutdated';

const Tag = ({level, label}: {level: string; label: string;}) => {
	return (
		<div className={'priority-tag priority-tag--' + level}>
			{label} {level && level !== 'valid' && level !== 'outdated-data' && label !== 'Plugins' ? '(' + level + ')' : '' }
		</div>
	);
}

const PriorityTags = ({ siteData, versionsReference}: { siteData: SiteDataOK; versionsReference: Version}) => {

	function objectToArray(plugins: PluginsList[] | object) : PluginsList[]{
		if (Array.isArray(plugins)) {
		  return plugins;
		}
		return Object.values(plugins);
	  }

	const areUpdatesAvailable = (plugins:PluginsList[]): boolean => {
		return plugins.reduce((acc, plugin) => acc || plugin.updateAvailable, false);
	}
	return (
		<div className='priority-tags__container'>
			<Tag label='PHP' level={versionDiff(siteData.phpVersion, versionsReference.php) ?? 'valid'} />
			<Tag label='WP' level={versionDiff(siteData.wpVersion, versionsReference.wp) ?? 'valid'} />
			<Tag label='Plugins' level={areUpdatesAvailable(objectToArray(siteData.plugins)) ? 'major' : ''} />
			{
				isDataOutdated(siteData.date) ?
					<Tag label='Data older than 2 days' level='outdated-data' />
				:
					null
			}
		</div>
	);
}

export default PriorityTags;