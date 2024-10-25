import { useEffect } from "react";

import './WaitList.scss';

const WaitList = (
	{
		siteIDs, setSiteIDs, mv }:
		{
			siteIDs: string[],
			setSiteIDs: (siteIDs: string[]) => void,
			mv: (siteID: string) => void
		}
	) => {

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_DOMAIN}/waitlist`)
		.then(response => response.json())
		.then((data: string[]) => {
			setSiteIDs(data);
		})
	}, []);

	const rm = (siteID: string) => {
		if (window.confirm('click OK to confirm deletion')){
			// update sevrver data, then update state
			fetch(`${process.env.REACT_APP_API_DOMAIN}/waitlist/${siteID}`, {
				method: 'DELETE'
			})
			.then(reponse => reponse.json())
			.then(data => {
				console.log('DELETE', data);
				setSiteIDs(siteIDs.filter(id => id !== siteID));
			})
		}
	};

	return (
		<details className='waitlist'>
			<summary><h2>Wait list</h2></summary>
			{
				siteIDs.length ?
					<ul className='waitlist__ul'>
						{
							siteIDs.map(siteID => (
								<li key={siteID} className='waitlist__item'>
									<span className='waitlist__name'>{siteID}</span>
									<div className="buttons__container wait-list__btn-container">
										<button className='button-icon button-icon__switch' onClick={() => { mv(siteID) }}>Add to the Authorized list</button>
										<button className='button-icon button-icon__delete' onClick={() => { rm(siteID) }}>Delete data</button>
									</div>
								</li>
							))
						}
					</ul>
				: <p>No site in wait list</p>
			}
		</details>
	);

};

export default WaitList;