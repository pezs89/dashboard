import { Environments } from '../reducers/dashboard.reducer';

export const transformDashboardData = (
  regionMarkets: {
    [key: string]: {
      [key: string]: string;
    };
  }[]
) =>
  regionMarkets
    .map(markets => Object.keys(markets))
    .reduce(
      (acc, curr, index) => {
        const [dev, qaf, qam, prod] = curr;
        const marketUrls = curr.map(key => regionMarkets[index][key]);
        const marketUrlsByEnv = marketUrls.map(urls => Object.values(urls));
        console.log(marketUrlsByEnv)
        acc[dev].push(...marketUrlsByEnv[0]);
        acc[qaf].push(...marketUrlsByEnv[1]);
        acc[qam].push(...marketUrlsByEnv[2]);
        acc[prod].push(...marketUrlsByEnv[3]);
        return acc;
      },
      { qaf: [] as string[], qam: [] as string[], prod: [] as string[], dev: [] as string[] }
    );