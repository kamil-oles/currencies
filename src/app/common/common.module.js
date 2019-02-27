import { APP_FOOTER } from './footer/footer.module';
import { APP_HEADER } from './header/header.module';
import { APP_SELECT } from './select/select.module';
import { APP_SIDE_MENU } from './side-menu/side-menu.module';
import { APP_SUBMIT_BUTTON } from './submit-button/submit-button.module';
import { COMMON_COMPONENT } from './common.component';
import { BackToTopDirective } from './directives/back-to-top.directive';
import { ToastDirective } from './directives/toast.directive';

import './common.scss';

export const APP_COMMON = angular
  .module('appCommon', [APP_FOOTER, APP_HEADER, APP_SELECT, APP_SIDE_MENU, APP_SUBMIT_BUTTON])
  .component('appCommon', COMMON_COMPONENT)
  .directive('backToTop', BackToTopDirective)
  .directive('toast', ToastDirective)
  .config(function moduleConfig($stateProvider) {
    $stateProvider.state('appCommon', {
      url: '/',
      component: 'appCommon',
      redirectTo: 'appConverter'
    });
  })
  .name;