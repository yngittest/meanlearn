'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './testes.routes';

export class TestesComponent {
  /*@ngInject*/
  constructor(BookList) {
    this.message = 'Hello hoge';
    // BookListを使用
    this.books =  BookList();
  }
}

// BookListをDI
TestesComponent.$inject = ['BookList'];

export default angular.module('meanlearnApp.testes', [uiRouter])
  .config(routes)
  .component('testes', {
    template: require('./testes.pug'),
    controller: TestesComponent,
    controllerAs: 'testesCtrl'
  })
  // BookListを追加
  .value('BookList', function(){
    return [
      {
        isbn: 'hogeisbn1',
        title: 'hoge1',
        price: 3000,
        published: new Date(2015,1,8)
      },
      {
        isbn: 'hogeisbn2',
        title: 'hoge2',
        price: 5000,
        published: new Date(2015,10,23)
      }
    ];
  })
  .name;
