import { useEffect, useState } from "react";
import { diff as versionDiff } from 'semver';
import isDataOutdated from "../utils/isOutdated";

import { SiteData, PluginsList, Version } from "../types/SiteData";

import "./SiteTable.scss";

import Loader from "./Loader";
import PriorityTags from './PriorityTags';

const TRDate = ({date}: {date: number}) => {

  return (
    <tr className={"table__row--no-border" + ( isDataOutdated(date) ? ' site-table__row--major' : '')}>
      <th colSpan={2}>Data date</th>
      <td colSpan={2}>
        {new Date(date * 1000).toLocaleString(
          "default",
          {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
          }
        )}
      </td>
    </tr>
  );
}

const SiteCommands = ({siteID, mv, updateSite}: { siteID: string; mv: (siteID: string) => void; updateSite: (siteId: string, cmd: string) => void; }) => {
  return (
    <div className="site-list__btn-container buttons__container">
    <button className='button-icon button-icon__switch' onClick={() => { mv(siteID)} } >
      Remove from the Authorized list
    </button>
    <button className='button-icon button-icon__update' onClick={() => { updateSite(siteID, "force")}} >
      Request data update
    </button>
  </div>
  );
}

const SiteTable = ({ siteID, versionsReference, mv }: { siteID: string; versionsReference: Version; mv: (siteID: string) => void; }) => {

  function objectToArray(plugins: PluginsList[] | object) : PluginsList[]{
    if (Array.isArray(plugins)) {
      return plugins;
    }
    return Object.values(plugins);
  }

  const [siteData, setSiteData] = useState<SiteData | null>(null);

  const updateSite = (siteID: string, option: string = "") => {

    // the fetch force command request the update of data,
    // and thus a second fetch most be proceed
    const cmd = option === "force" ? "/?cmd=force" : "";
    setSiteData(null);
    fetch(`${process.env.REACT_APP_API_DOMAIN}/authorized/${siteID}${cmd}`, {
      method: "GET",
      signal: AbortSignal.timeout(5000)
    })
      .then((response) => {
          return response.json();
      })
      .then((data: SiteData) => {
          setSiteData(data)
       })
      .catch(error => {
        console.log(error);
        setSiteData({error: error.toString()})
      });

  };

  useEffect(() => {
    updateSite(siteID);
  }, [siteID]);

  return (
    <article>
      {siteData ?
        'error' in siteData ?
          <div className='site-list__error-container'>
            <div className='site-list__error'>
              <p className='error__message'><b>{siteID}</b> Error: {siteData.error}</p>
              <SiteCommands siteID={siteID} mv={mv} updateSite={updateSite} />
            </div>
          </div>
        :
          <details>
            <summary>
              <div className="site-list__infos">
                <header><h3 className="site-list__title">{siteData.name} {siteData.marker ? '( ' + siteData.marker + ' )':''}</h3></header>
                <PriorityTags siteData={siteData} versionsReference={versionsReference} />
              </div>
              <SiteCommands siteID={siteID} mv={mv} updateSite={updateSite} />
            </summary>
            <div className="table__container display-none">
              <table>
                <tbody>
                  <TRDate date={siteData.date} />
                  <tr className="">
                    <th colSpan={2}>IP</th>
                    <td colSpan={2}>{siteData.IP}</td>
                  </tr>
                  <tr className={'site-table__row site-table__row--' + versionDiff(siteData.phpVersion, versionsReference.php)}>
                    <th colSpan={2}>PHP Version</th>
                    <td colSpan={2}>{siteData.phpVersion} {versionDiff(siteData.phpVersion, versionsReference.php) === null ? '' : `(latest: ${versionsReference.php})`}</td>
                  </tr>
                  <tr className={'site-table__row site-table__row--' + versionDiff(siteData.wpVersion, versionsReference.wp)}>
                    <th colSpan={2}>WP Version</th>
                    <td colSpan={2}>{siteData.wpVersion}  {versionDiff(siteData.wpVersion, versionsReference.wp) === null ? '' : `(latest: ${versionsReference.wp})`}</td>
                  </tr>
                  <tr>
                    <th colSpan={2}>admin</th>
                    <td colSpan={2}>{siteData.admin}</td>
                  </tr>
                  <tr>
                    <th colSpan={2}>URL</th>
                    <td colSpan={2}>{siteData.wpUrl}</td>
                  </tr>
                  {objectToArray(siteData.plugins).map(
                    (plugin, index, array) => (
                      <tr
                        key={plugin.name + plugin.version}
                        className={index === 0 ? "table__row--no-border": ''}
                      >
                        {index === 0 && (
                          <th scope="rowgroup" rowSpan={array.length}>
                            Plugins
                          </th>
                        )}
                         <th className={'site-table__row th' + (plugin.updateAvailable ? ' site-table__row--major' : '') }>{plugin.name}</th>
                         <td className={'site-table__row td' + (plugin.updateAvailable ? ' site-table__row--major' : '') }>{plugin.version} {plugin.updateAvailable ? '( ' + plugin.newVersion + ' )' : ''}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </details>
       :
        <Loader />
      }
    </article>
  );
};

export default SiteTable;
