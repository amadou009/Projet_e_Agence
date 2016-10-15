// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

 .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }

      // On cache le splash screen au bout de 3 sécondes
      setTimeout(function() {
          navigator.splashscreen.hide();
      }, 3000);

      if (window.StatusBar) {

        // On change la couleur des objets (date et heure, batterie, ...)
        StatusBar.style(1); //Light

      }
    });
  })

.config(function($ionicConfigProvider) {
  // Toutes le pages pages filles doivent avoir le bouton Retour
  $ionicConfigProvider.backButton.text('Retour').icon('ion-chevron-left');
  $ionicConfigProvider.backButton.previousTitleText(true).icon('ion-chevron-left');

})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl' 
  })

  .state('app.reclamation', {
    url: '/reclamation',
    views: {
      'menuContent': {
        templateUrl: 'templates/reclamation.html',
        controller: 'reclamationCtrl'
      }
    }
  })

  .state('app.derniereFacture', {
    url: '/derniereFacture',
    views: {
      'menuContent': {
        templateUrl: 'templates/facture.html',
        controller: 'factureCtrl'
      }
    }
  })

  .state('app.accueil', {
    url: '/accueil',
    views: {
      'menuContent': {
        templateUrl: 'templates/accueil.html',
        controller: 'AppCtrl'
      }
    }
  })

  .state('app.device', {
    url: '/device',
    views: {
      'menuContent': {
        templateUrl: 'templates/test.html',
        controller: 'AppCtrl'
      }
    }
  })

  .state('app.module', {
    url: '/module',
    views: {
      'menuContent': {
        templateUrl: 'templates/modules.html',
        controller: 'AppCtrl'
      }
    }
  })

  .state('app.soldes', {
    // cache:false,
    url: '/solde',
    views: {
      'menuContent': {
        templateUrl: 'templates/soldes.html',
        controller: 'soldeCrtl'
      }
    }
  })

  .state('app.solde', {
      url: '/soldes/:soldeId',
      views: {
        'menuContent': {
          templateUrl: 'templates/solde.html',
          controller: 'soldeCrtl'
        }
      }
    })

  // Page par defaut lorsque l'url fournit n'existe pas ou n'est pas renseigné
  $urlRouterProvider.otherwise('/app/accueil');
})

 .constant('ConstEagence', {
    'UTILISATEUR': 'smile'
 }) 

;
