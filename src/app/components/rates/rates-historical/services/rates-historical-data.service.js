import { RatesHistorical } from '../classes/rates-historical.class';

export class RatesHistoricalDataService {
  constructor($filter, $q, $rootScope, base, RatesHistoricalHttp) {
    this._baseCurrency = base.currency;
    this._filter = $filter;
    this._http = RatesHistoricalHttp;
    this._q = $q;
    this._root = $rootScope;
  }

  initialData(code) {
    const FROM = this._filter('date')(this._setDateFrom(), 'yyyy-MM-dd'),
      SESSION_DATA = JSON.parse(sessionStorage.getItem('rates_historical')),
      TO = this._filter('date')(new Date(), 'yyyy-MM-dd');
    if (code) {
      const DEFERRED = this._q.defer();
      this._http.getRates(code, FROM, TO).then(function prepareData(response) {
        const RESPONSE = response.data,
          DATA = new RatesHistorical(RESPONSE.code, FROM, RESPONSE);
        sessionStorage.setItem('rates_historical', JSON.stringify(DATA));
        DEFERRED.resolve(DATA);
      }, error => {
        this._root.$broadcast('toast', error.data);
        DEFERRED.reject();
      });
      return DEFERRED.promise;
    } else if (SESSION_DATA) {
      return SESSION_DATA;
    } else {
      return new RatesHistorical(this._baseCurrency, FROM);
    }
  }

  _setDateFrom() {
    const START = new Date();
    return new Date(START.setDate(START.getDate() - 7));
  }
}