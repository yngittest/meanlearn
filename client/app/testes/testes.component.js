'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');
const base64 = require('angular-base64-upload');

import routes from './testes.routes';

export class TestesComponent {
  /*@ngInject*/
  constructor(BookList, $sce, $filter, $http, $resource) {
    this.message = 'Hello hoge';
    // BookListを使用
    // this.books =  BookList();
    // this.len = 1;
    // this.start = 0;

    this.myName = '佐藤';
    this.memo = $sce.trustAsHtml('<button>aaa</button>');
    this.favs = ['aaa', 'bbb', 'ccc', 'ddd', 'eee'];
    // this.url = $sce.trustAs($sce.RESOURCE_URL, 'http://www.wings.msn.to/');
    this.templates = [
      {title: 'execution', url: 'templates/execution.html'},
      {title: 'tempo', url: 'templates/tempo.html'}
    ];
    this.path = 'http://iphone-mania.jp/wp-content/uploads/2016/09/IMG_8216.jpg';

    this.price = 1000;
    console.log($filter('currency')(this.price, '¥'));

    this.members = [
      {name: '鈴木太郎', old: 55},
      {name: '田中一郎', old: 58},
      {name: '山田りお', old: 25},
      {name: '腰掛奈美', old: 35},
      {name: '佐藤大輔', old: 45}
    ];
    this.$filter = $filter;

    this.$http = $http;
    this.result = 'GET初期値';
    this.postResult = 'POST初期値';

    this.Book = $resource(
      '/api/angtests/:_id',
      { _id: '@_id'},
      { update: { method: 'PUT' } }
    );
    this.books = this.Book.query();
  }

  oninsert() {
    this.Book.save(
      this.book,
      function() {
        this.books = this.Book.query();
      }
    );
  }

  onedit(_id) {
    this.book = this.Book.get({_id: _id});
  }

  onupdate() {
    this.Book.update(
      this.book,
      function() {
        this.books = this.Book.query();
      }
    );
  }

  ondelete(_id) {
    this.Book.delete(
      {_id: _id},
      function() {
        this.books = this.Book.query();
      }
    );
  }

  // onClick2(){
  //   this.$http.get('/api/angtests')
  //     .then(response => {
  //       this.result = response.data;
  //     });
  // }
  //
  // onClickPost(){
  //   this.$http.post('/api/angtests', {
  //     name: this.postName,
  //   })
  //   .then(response => {
  //     this.postResult = response.data;
  //   });
  //   this.postName = '';
  // }
  postImage() {
    console.log(this.hoge.filename);
    this.$http.post('/api/angtests', {
      imgFilename: this.hoge.filename,
      imgBase64: this.hoge.base64
    });
  }
  getImage(){
    this.$http.get('/api/angtests')
      .then(response => {
        this.imgGetResult = response.data;
      });
  }

  onLoad() {
    console.log(this.template);
  }

  onClick() {
    this.greeting = 'こんにちは、' + this.myName + 'さん';
  }

  onmouseover(e) {
    console.log(e);
    this.path = 'http://www.gizmodo.jp/images/2015/09/UDvrcXquKg1l31nW_R.jpg';
  }
  onmouseleave() {
    this.path = 'http://iphone-mania.jp/wp-content/uploads/2016/09/IMG_8216.jpg';
  }

  sort(exp, reverse) {
    this.members = this.$filter('orderBy')(this.members, exp, reverse);
  }
  // pager(page){
  //   this.start = this.len * page;
  // }

}

// BookListをDI
TestesComponent.$inject = ['BookList', '$sce', '$filter', '$http', '$resource'];

export default angular.module('meanlearnApp.testes', [uiRouter, 'ngResource', base64])
  .config(routes)
  .component('testes', {
    template: require('./testes.pug'),
    controller: TestesComponent,
    controllerAs: 'testesCtrl'
  })
  // BookListを追加
  .value('BookList', function() {
    return [
      {
        isbn: 'hogeisbn1',
        title: 'hoge1',
        price: 3000,
        published: new Date(2015, 1, 8)
      }, {
        isbn: 'hogeisbn2',
        title: 'hoge2',
        price: 5000,
        published: new Date(2015, 10, 23)
      }
    ];
  })
  .name;
