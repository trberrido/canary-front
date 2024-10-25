import { useState } from 'react';

import Header from './components/Header';
import AuthorizedList from './components/AuthorizedList';
import WaitList from './components/WaitList';

import './App.scss';

const App = () => {

	const [waitList, setWaitList] = useState<string[]>([]);
	const [authorizedList, setAuthorizedList] = useState<string[]>([]);

	const mv = (siteID: string) => {

		if ( !window.confirm('Are you sure ?') )
			return ;

		const from = authorizedList.includes(siteID) ? 'authorized' : 'waitlist';
		const to = waitList.includes(siteID) ? 'authorized' : 'waitlist';
		if (from === to)
			return;

		// update sevrver data, then update state
		// COPY = POST then DELETE
		fetch(`${process.env.REACT_APP_API_DOMAIN}/${to}/${siteID}`, {
			method: 'POST'
		})
		.then(reponse => reponse.json())
		.then(data => {
			console.log('POST', data);
			fetch(`${process.env.REACT_APP_API_DOMAIN}/${from}/${siteID}`, {
				method: 'DELETE'
			})
			.then(reponse => reponse.json())
			.then(data => {
				console.log('DELETE', data);
				if (to === 'authorized') {
					setAuthorizedList([...authorizedList, siteID]);
					setWaitList(waitList.filter(id => id !== siteID));
				} else {
					setWaitList([...waitList, siteID]);
					setAuthorizedList(authorizedList.filter(id => id !== siteID));
				}
			})
		})
	};

	return (
		<div className="App">
			<Header />
			<main className="main">
				<WaitList
					siteIDs={waitList}
					setSiteIDs={setWaitList}
					mv={mv} />
				<AuthorizedList
					siteIDs={authorizedList}
					setSiteIDs={setAuthorizedList}
					mv={mv} />
			</main>
		</div>
	);

};

export default App;
