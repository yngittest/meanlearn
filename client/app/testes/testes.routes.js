'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('testes', {
      url: '/testes',
      template: '<testes></testes>'
    });
}
