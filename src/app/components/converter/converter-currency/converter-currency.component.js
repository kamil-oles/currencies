import templateUrl from './converter-currency.html';
import { Currency } from '../shared/converter.model';

export const converterCurrencyComponent = {
  bindings: {
    currency: '<',
    onUpdate: '&'
  },
  templateUrl,
  controller: class ConverterCurrencyComponent {
    constructor(ComponentsCurrenciesService, EventEmitter) {
      this.currencies = ComponentsCurrenciesService.currencies;
      this.EventEmitter = EventEmitter;
    }

    $onChanges(changes) {
      if (changes.currency) {
        this.currency = Object.assign({}, changes.currency.currentValue);
      }
    }

    update() {
      this.onUpdate(
        this.EventEmitter({
          currency: new Currency(this.currency.active, this.currency.code, this.currency.value)
        })
      );
    }
  }
};