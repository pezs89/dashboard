import { createReducer, on } from '@ngrx/store';
import { DashboardActions } from '../actions';

export const dashboardFeatureKey = 'dashboard';

export interface Region {
  regionCode: string;
  webserviceUrl: string;
  markets: { [key: string]: string };
}

export interface DashboardState {
  regions: Region[];
  loading: boolean;
}

export const initialState: DashboardState = {
  loading: false,
  regions: [
    {
      regionCode: 'RU',
      webserviceUrl:
        'https://choiceservices-ru.avon.com/myavon/reporting/v1/rest/swagger',
      markets: {
        ru: 'https://myoffice.avon.ru/ru/Login?targetPage=/RU/Dashboard',
      },
    },
    {
      regionCode: 'WEMEA',
      webserviceUrl:
        'https://myavonservices-us-eu.avon.com/myavon/reporting/v1/rest/swagger',
      markets: {
        es: 'https://mao.avon.es/es_maintenance.html',
        it: 'https://mao.avon.it/it/Login?targetPage=/IT/Dashboard',
        jt: 'https://office.justine.co.za/en/Login?targetPage=/JT/Dashboard',
        tr: 'https://avonofisim.avon.com.tr/tr/Login?targetPage=/TR/Dashboard',
        uk: 'https://office.avon.uk.com/en/Login?targetPage=/UK/Dashboard',
        za: 'https://office.avon.co.za/en/Login?targetPage=/ZA/Dashboard',
      },
    },
    {
      regionCode: 'CEE',
      webserviceUrl:
        'https://choiceservices-uk.avon.com/myavon/reporting/v1/rest/swagger',
      markets: {
        bg: 'https://office.avon.bg/bg/Login?targetPage=/BG/Dashboard',
        cz: 'https://kancelar.avon.cz/cs/Login?targetPage=/CZ/Dashboard',
        de: 'https://mao.avon.de/de/Login?targetPage=/DE/Dashboard',
        hu: 'https://office.avon.hu/hu/Login?targetPage=/HU/Dashboard',
        pl: 'https://office.avon.pl/pl/Login?targetPage=/PL/Dashboard',
        ro: 'https://office.avon.ro/ro/Login?targetPage=/RO/Dashboard',
        rs: 'https://office.avon.rs/sr/Login?targetPage=/RS/Dashboard',
        sk: 'https://kancelaria.avon.sk/sk/Login?targetPage=/SK/Dashboard',
        ua: 'https://mao.avon.ua/uk/Login?targetPage=/UA/Dashboard',
      },
    },
    {
      regionCode: 'LATAM',
      webserviceUrl:
        'https://myavonservices-us-la.avon.com/myavon/reporting/v1/rest/swagger',
      markets: {
        ar:
          'https://mioficina.avon.com.ar/es/Login;jsessionid=88FBEFF30CF142CF8387EB67DA45D382.live-ar_pap3_1',
        co:
          'https://mioficina.avon.co/es/Login;jsessionid=D50A3490FDC703C5789E43448466C57D.live-co_pap3_2?targetPage=/CO/Dashboard',
        ec: 'https://mioficina.avon.com.ec/es/Login?targetPage=/EC/Dashboard',
        pe: 'https://mioficina.avon.com.pe/es/Login?targetPage=/PE/Dashboard',
      },
    },
  ],
};

export const reducer = createReducer(
  initialState,
  on(DashboardActions.getServerStatusesRequest, (state) => ({
    ...state,
    loading: true,
  })),
  on(DashboardActions.getServerStatusesSuccess, (state) => ({
    ...state,
    loading: false,
  }))
);
