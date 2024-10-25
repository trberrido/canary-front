import { useEffect, useState } from "react";

import Loader from "./Loader";
import SiteTable from './SiteTable';

import './AuthorizedList.scss';

import { Version } from "../types/SiteData";

const AuthorizedList = ({ siteIDs, setSiteIDs, mv }: { siteIDs: string[], setSiteIDs: (siteIDs: string[]) => void, mv: (siteID: string) => void }) => {

	const [versionsReference, setVersionsReferences] = useState<Version | null>(null);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_DOMAIN}/versions`)
		.then(response => response.json())
		.then((data: Version) => {
			setVersionsReferences(data);
		});
	}, []);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_DOMAIN}/authorized`)
		.then(response => response.json())
		.then((data: string[]) => {
			setSiteIDs(data);
		});
	}, []);

	return (
		<>
			<h2>Authorized list</h2>
			<div className='authorizedlist__container'>
				{
					versionsReference && siteIDs.length ?
						siteIDs.map(siteID => (
							<SiteTable key={siteID} versionsReference={versionsReference} siteID={siteID} mv={mv}/>
						))
					: <Loader />
				}
			</div>
		</>
	);

};

export default AuthorizedList;