import { HttpResponseBase } from '@angular/common/http';
import { Region } from '../reducers/dashboard.reducer';
import { RegionStatus, ServerStatus } from '../reducers/region-list.reducer';

export const serverStatusResponseTransformHelper = (
  regions: Region[],
  responsesMarket: HttpResponseBase[],
  responsesWs: HttpResponseBase[]
): RegionStatus[] => {
  return regions.reduce((acc, curr, index) => {
    const values = Object.values(curr.markets) as string[];
    const newVals = values.map((value) =>
      responsesMarket.find((response) => response.url === value)
    );
    const keys = Object.keys(curr.markets);
    const newStatuses = keys.reduce((initial, val, statusIndex) => {
      initial[val] = createServerStatus(newVals, statusIndex);
      return initial;
    }, {});
    const regionStatus: RegionStatus = {
      regionCode: regions[index].regionCode,
      wsStatus: createServerStatus(responsesWs, index),
      status: newStatuses,
    };
    acc.push(regionStatus);
    return acc;
  }, []);
};

const createServerStatus = (
  vals: HttpResponseBase[],
  index: number
): ServerStatus => ({
  lastUpdated: getDateByTimeZone(),
  url: vals[index].url,
  serverStatus: vals[index].statusText,
  serverResponseCode: vals[index].status,
  responseType: vals[index].type,
});

const getDateByTimeZone = (): string => {
  const date = new Date();
  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getUTCHours(),
      date.getMinutes(),
      date.getSeconds()
    )
  ).toString();
};
