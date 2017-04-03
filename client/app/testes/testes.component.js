'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './testes.routes';

export class TestesComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello hoge';
  }
}

export default angular.module('meanlearnApp.testes', [uiRouter])
  .config(routes)
  .component('testes', {
    template: require('./testes.pug'),
    controller: TestesComponent,
    controllerAs: 'testesCtrl'
  })
  .name;
