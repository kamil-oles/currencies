import angular from 'angular';
import templateUrl from './converter-currency.html';
import { Currency } from '../shared/converter-currency.model';

export const converterCurrencyComponent = {
  bindings: {
    currency: '<',
    onUpdate: '&',
    order: '@'
  },
  templateUrl,
  controller: class ConverterCurrencyComponent {
    constructor(ComponentsCurrenciesService, EventEmitter) {
      this.currencies = ComponentsCurrenciesService.currencies;
      this.EventEmitter = EventEmitter;
    }

    $onChanges(changes) {
      if (changes.currency) {
        this.currency = angular.copy(changes.currency.currentValue);
      }
    }

    update() {
      this.onUpdate(
        this.EventEmitter({
          currency: new Currency(this.currency.code, this.currency.value)
        })
      );
    }
  }
};