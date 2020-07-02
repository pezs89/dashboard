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
        const [dev, qaf, prod] = curr;
        const marketUrls = curr.map(key => regionMarkets[index][key]);
        const marketUrlsByEnv = marketUrls.map(urls => Object.values(urls));
        acc[dev].push(...marketUrlsByEnv[0]);
        acc[qaf].push(...marketUrlsByEnv[1]);
        acc[prod].push(...marketUrlsByEnv[2]);
        return acc;
      },
      { qaf: [] as string[], prod: [] as string[], dev: [] as string[] }
    );
