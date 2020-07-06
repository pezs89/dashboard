import { createReducer, on } from '@ngrx/store';
import { DashboardActions } from '../actions';

export const dashboardFeatureKey = 'dashboard';

export enum Environments {
  PROD = 'prod',
  QAF = 'qaf',
  DEV = 'dev'
}
export interface Region {
  regionCode: string;
  webserviceUrls: {
    qaf: string;
    prod: string;
  };
  markets: { qaf: { [key: string]: string }; prod: { [key: string]: string }, dev?: { [key: string]: string }};
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
      webserviceUrls: {
        qaf:
          'https://choiceservicesqaf.avon.com/myavon/reporting/v1/rest/swagger',
        prod:
          'https://choiceservices-ru.avon.com/myavon/reporting/v1/rest/swagger',
      },
      markets: {
        dev: {
          ru: 'https://dev.office.avon.ru'
        },
        qaf: {
          ru: 'https://qaf.office.avon.ru/ru/Login?targetPage=/RU/Dashboard',
        },
        prod: {
          ru: 'https://myoffice.avon.ru/ru/Login?targetPage=/RU/Dashboard',
        },
      },
    },
    {
      regionCode: 'WEMEA',
      webserviceUrls: {
        qaf:
          'https://choiceservicesqaf.avon.com/myavon/reporting/v1/rest/swagger',
        prod:
          'https://myavonservices-us-eu.avon.com/myavon/reporting/v1/rest/swagger',
      },

      markets: {
        dev: {
          uk: 'https://dev.office.avon.uk',
          it: 'https://dev.office.avon.it',
          mt: 'https://dev.office.avon.mt',
          tr: 'https://dev.office.avon.tr',
          za: 'https://dev.office.avon.za'
        },
        qaf: {
          es: 'https://qaf.office.avon.es/es/Login',
          it: 'https://qaf.office.avon.it/it/Login?targetPage=/IT/Dashboard',
          jt: 'https://qaf.office.justine.co.za/',
          za: 'https://qaf.office.avon.co.za/en/Login',
          uk: 'https://qaf.office.avon.uk.com/UK/Login.html',
          tr: 'https://qaf.office.avon.com.tr/tr/Login',
        },
        prod: {
          es: 'https://mao.avon.es/es_maintenance.html',
          it: 'https://mao.avon.it/it/Login?targetPage=/IT/Dashboard',
          jt: 'https://office.justine.co.za/en/Login?targetPage=/JT/Dashboard',
          tr:
            'https://avonofisim.avon.com.tr/tr/Login?targetPage=/TR/Dashboard',
          uk: 'https://office.avon.uk.com/en/Login?targetPage=/UK/Dashboard',
          za: 'https://office.avon.co.za/en/Login?targetPage=/ZA/Dashboard',
        },
      },
    },
    {
      regionCode: 'CEE',
      webserviceUrls: {
        qaf:
          'https://choiceservicesqaf.avon.com/myavon/reporting/v1/rest/swagger',
        prod:
          'https://choiceservices-uk.avon.com/myavon/reporting/v1/rest/swagger',
      },
      markets: {
        dev: {
          ro: 'https://dev.office.avon.ro',
          ro2: 'https://dev.seconddomain.office.avon.ro',
          cz: 'https://dev.office.avon.cz',
          hu: 'https://dev.office.avon.hu',
          pl: 'https://dev.office.avon.pl'
        },
        qaf: {
          hu: 'https://qaf.office.avon.hu/hu/Login?targetPage=/HU/Dashboard',
          bg: 'https://qaf.office.avon.bg/Login.html',
          cz: 'https://qaf.kancelar.avon.cz/cs/Login?targetPage=/CZ/Dashboard',
          sk: 'https://qaf.office.avon.sk/sk/Login?targetPage=/SK/Dashboard',
          de: 'https://qaf.office.avon.de/de/Login?targetPage=/DE/Dashboard',
          ro: 'https://qaf.office.avon.ro/RO/Login.html',
          pl: 'https://qaf.office.avon.pl/pl/Login?targetPage=/PL/Dashboard',
          ua: 'https://qaf.office.avon.ua/uk/Login?targetPage=/UA/Dashboard',
          rs: 'https://qaf.office.avon.rs/RS/Login.html',
        },
        prod: {
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
    },
    {
      regionCode: 'LATAM',
      webserviceUrls: {
        qaf:
          'https://choiceservicesqaf.avon.com/myavon/reporting/v1/rest/swagger',
        prod:
          'https://myavonservices-us-la.avon.com/myavon/reporting/v1/rest/swagger',
      },
      markets: {
        dev: {},
        qaf: {
          ar: 'https://qaf.office.avon.com.ar/es/Login?targetPage=/AR/Dashboard',
          co: 'https://qaf.office.avon.co/es/Login?targetPage=/CO/Dashboard',
          ec: 'https://qaf.office.avon.com.ec/es/Login?targetPage=/EC/Dashboard',
          pe: 'https://qaf.office.avon.com.pe/es/Login?targetPage=/PE/Dashboard',
        },
        prod: {
          ar:
            'https://mioficina.avon.com.ar/es/Login;jsessionid=88FBEFF30CF142CF8387EB67DA45D382.live-ar_pap3_1',
          co:
            'https://mioficina.avon.co/es/Login;jsessionid=D50A3490FDC703C5789E43448466C57D.live-co_pap3_2?targetPage=/CO/Dashboard',
          ec: 'https://mioficina.avon.com.ec/es/Login?targetPage=/EC/Dashboard',
          pe: 'https://mioficina.avon.com.pe/es/Login?targetPage=/PE/Dashboard',
        },
      },
    },
  ],
};

export const reducer = createReducer(
  initialState,
  on(DashboardActions.getServerStatusesRequest, state => ({
    ...state,
    loading: true,
  })),
  on(DashboardActions.getServerStatusesSuccess, state => ({
    ...state,
    loading: false,
  }))
);
