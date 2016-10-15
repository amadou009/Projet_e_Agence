angular.module('starter.controllers', ['ionic', 'ngCordova'])

.controller('AppCtrl', function($scope, $rootScope, $ionicModal, $timeout, $cordovaSpinnerDialog, $cordovaDialogs, $cordovaToast, $ionicLoading, ConstEagence, $cordovaDevice) {

    $rootScope.AfficherMessage = function(message) {
      $ionicLoading.show({
        template: message
      });
    };

    $rootScope.CacherMessage = function(){
      $ionicLoading.hide();
    };

    $rootScope.effacerHistoriqueNavigation = function() {

      // Cette fonction me permet d'effacer l'historique de navigation de sorte à ne pas afficher le bouton de retour

      $ionicViewService.nextViewOptions({
        disableAnimate: true,
        disableBack: true
      }); 
    };

    $scope.ServiceIndisponible = function(){
      
      $cordovaToast.showShortCenter('Module non encore implémenté !', 'long', 'center')
        .then(function(success) {

        }, function (error) {
          $cordovaDialogs.alert("Module non encore implémenté !", "Module", 'OK');
      });
    };

    $scope.UpdateServiceSelectionne = function(serviceSelectionne){
      $rootScope.ServiceEnCours = serviceSelectionne;
      $scope.operateurSelectionne = true;
    };
})

.controller('reclamationCtrl', function($scope, $rootScope, $stateParams, $state, $cordovaToast, $cordovaDialogs, $cordovaDialogs, $ionicLoading, $timeout, ConstEagence) {

  $scope.DataReclamation = {};

  $scope.reclamations = [{
    id: 0,
    name: 'Eclairage publique'
  }, {
    id: 1,
    name: 'Facturation'
  }, {
    id: 2,
    name: 'Services des sociétés'
  }, {
    id: 3,
    name: 'Nouveaux modes de paiement (NMPF)'
  }];

  $scope.goToServiceReclamation = function(){

    if ($rootScope.ServiceEnCours == undefined || $rootScope.ServiceEnCours == ""){

      $cordovaToast.showShortCenter('Veuillez identifier la compagnie avant de poursuivre', 'short', 'center')
        .then(function(success) {

        }, function (error) {
          $cordovaDialogs.alert("Veuillez identifier la compagnie avant de poursuivre !", "e-agence", 'OK');
      });

      $rootScope.effacerHistoriqueNavigation();
      $state.go('app.accueil');

    }else{
      $state.go('app.reclamation');
    }  
  };  

  $scope.soumettreReclamation = function(dataReclamation){

      if (dataReclamation.referenceClient == undefined || dataReclamation.referenceClient == ""){

        $cordovaToast.showShortCenter('Veuillez saisir votre identifiant', 'short', 'center')
          .then(function(success) {

          }, function (error) {
            $cordovaDialogs.alert("Veuillez saisir votre identifiant", "e-agence", 'OK');
        });

      }else{

        if (dataReclamation.nomPrenomClient == undefined || dataReclamation.nomPrenomClient == "" || angular.lowercase(dataReclamation.referenceClient) != "smile"){

          $cordovaToast.showShortCenter('Désolé identifiant non valide !', 'short', 'center')
            .then(function(success) {

            }, function (error) {
              $cordovaDialogs.alert("Désolé identifiant non valide !", "e-agence", 'OK');
          });

        }
        else{

          if (dataReclamation.categorie == undefined || dataReclamation.categorie == ""){

            $cordovaToast.showShortCenter('Veuillez préciser la catégorie de votre réclamation', 'short', 'center')
              .then(function(success) {

              }, function (error) {
                $cordovaDialogs.alert("Veuillez préciser la catégorie de votre réclamation", "e-agence", 'OK');
            });

          }else{

            if (dataReclamation.objet == undefined || dataReclamation.objet == ""){

              $cordovaToast.showShortCenter("Veuillez saisir le contenu de votre réclamation", 'short', 'center')
                .then(function(success) {

                }, function (error) {
                  $cordovaDialogs.alert("Veuillez saisir le contenu de votre réclamation", "e-agence", 'OK');
              });

            }else{

              $rootScope.AfficherMessage("Nous transmettons votre reclamation, patientez quelques instants...");

              // On exécute cette fonction au bout de 4 sécondes
              $timeout(function() { 
                
                $rootScope.CacherMessage();
                $scope.DataReclamation = {};

                $cordovaDialogs.alert('Votre réclamation a été transmise avec succès !', "e-agence", 'OK')
                  .then(function() {
                    $state.go('app.module'); // On retourne à la page des modules
                  });
                
              }, 4000);  

            }

          }

        }

      }
  };

  $scope.annulerReclamation = function(){

    if ($scope.DataReclamation.nomPrenomClient != undefined && $scope.DataReclamation.nomPrenomClient != ""){

       $cordovaDialogs.confirm("Confirmez - vous l'action ?", 'e-agence', ['Non','Oui'])
      .then(function(ReponseUtilisateur) 
      {
        if (ReponseUtilisateur == 2) $scope.DataReclamation = {};
      });

    }else{
      $scope.DataReclamation.referenceClient = "";
      $scope.DataReclamation.categorie = "";
      $scope.DataReclamation.objet = "";
    }
  };

  $scope.searchClient = function(referenceClient){

    if (referenceClient == undefined || referenceClient == ""){
        
        $scope.DataReclamation.nomPrenomClient = "";
        $scope.DataReclamation.emailClient = "";
        $scope.DataReclamation.contactClient = "";
    }
    else{

      if(referenceClient.length >= 5){

        $rootScope.AfficherMessage("Vérification de votre référence, patientez quelques instants...");

        // On exécute cette fonction au bout de 4 sécondes
        $timeout(function() { 
          
          if (angular.lowercase(referenceClient) == ConstEagence.UTILISATEUR){

            $rootScope.AfficherMessage("Récupération de vos informations ...");
            
            // On exécute cette fonction au bout de 3 sécondes également
            $timeout(function() { 
              
              $rootScope.CacherMessage();

              $scope.DataReclamation.nomPrenomClient = "SMILE CI";
              $scope.DataReclamation.emailClient = "commerce@smile.ci";
              $scope.DataReclamation.contactClient = "+225 22 51 60 10";
              
            }, 3000);  

          }
          else{
            $rootScope.CacherMessage();
            $cordovaDialogs.alert("Votre référence client est incorrecte !", "e-agence", 'OK');

            $scope.DataReclamation.nomPrenomClient = "";
            $scope.DataReclamation.emailClient = "";
            $scope.DataReclamation.contactClient = "";

          }

        }, 4000);

      }else{
        $scope.DataReclamation.nomPrenomClient = "";
        $scope.DataReclamation.emailClient = "";
        $scope.DataReclamation.contactClient = "";
      }
      
    }
  };
})

.controller('factureCtrl', function($scope, $rootScope, $stateParams, $state, $cordovaToast, $cordovaDialogs, $ionicLoading, $timeout, $ionicModal, ConstEagence) {

  $scope.goToServiceDerniereFacture = function(){

    if ($rootScope.ServiceEnCours == undefined || $rootScope.ServiceEnCours == ""){

      $cordovaToast.showShortCenter('Veuillez identifier la compagnie avant de poursuivre', 'short', 'center')
        .then(function(success) {

        }, function (error) {
          $cordovaDialogs.alert("Veuillez identifier la compagnie avant de poursuivre !", "e-agence", 'OK');
      });

      $rootScope.effacerHistoriqueNavigation();
      $state.go('app.accueil');

    }else{
      $state.go('app.derniereFacture');
    }
  };

  $scope.VisualiserDerniereFacture = function(derniereFacture){

    if (derniereFacture.referenceClient == undefined || derniereFacture.referenceClient == ""){
      $cordovaDialogs.alert("Veuillez saisir votre référence client !", "e-agence", 'OK');
    }else{

      $rootScope.AfficherMessage("Vérification de votre reférence client ...");

      // On exécute cette fonction au bout de 3 sécondes
      $timeout(function() {

        if (angular.lowercase(derniereFacture.referenceClient) == ConstEagence.UTILISATEUR){

          $rootScope.AfficherMessage("Récupération de votre dernière facture...");
          
          // On exécute cette fonction au bout de 3 sécondes également
          $timeout(function() { 
            
            $rootScope.CacherMessage();

            if ($rootScope.ServiceEnCours == "CIE"){
              // Facture de CIE
               $scope.showImage(1);
            }else{
              // Facture de SODECIE
               $scope.showImage(2);
            }
            
          }, 3000);  

        }
        else{
          $rootScope.CacherMessage();
          $cordovaDialogs.alert("Votre référence client est invalide !", "e-agence", 'OK');
        }

      }, 3000); 

    }
  };

 $ionicModal.fromTemplateUrl('image-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function() {
      $scope.modal.show();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });

    $scope.$on('modal.hide', function() {
      // Execute action
    });

    $scope.$on('modal.removed', function() {
      // Execute action
    });

    $scope.$on('modal.shown', function() {
      // Execute action
    });

    $scope.imageSrc = 'img/cie.png';

    $scope.showImage = function(index) {
      
      switch(index) {
        
        case 1: // Cas de CIE
          $scope.imageSrc = 'img/cie.png';
          break;

        case 2: // Cas de SODECI
          $scope.imageSrc  = 'img/sodeci.png';
          break;
      }

      $scope.openModal();
    }
})

.controller('soldeCrtl', function($scope, $rootScope, $stateParams, $state, $cordovaToast, $cordovaDialogs, $ionicLoading, $timeout, ConstEagence) {

  $scope.goToServiceSoldeActuel = function(){

    if ($rootScope.ServiceEnCours == undefined || $rootScope.ServiceEnCours == null || $rootScope.ServiceEnCours == ""){

      $cordovaToast.showShortCenter('Veuillez identifier la compagnie avant de poursuivre', 'short', 'center')
        .then(function(success) {

        }, function (error) {
          $cordovaDialogs.alert("Veuillez identifier la compagnie avant de poursuivre !", "e-agence", 'OK');
      });

      $rootScope.effacerHistoriqueNavigation();
      $state.go('app.accueil');

    }else{
      $state.go('app.soldes');
    }

  };

    $scope.dataSolde = {};

    $scope.VisualiserSoldeActuel = function(dataSolde){

    if (dataSolde.referenceClient == undefined || dataSolde.referenceClient == ""){
      $cordovaDialogs.alert("Veuillez saisir votre référence client !", "e-agence", 'OK');
    }else{

      $rootScope.AfficherMessage("Vérification de votre reférence client ...");

      // On exécute cette fonction au bout de 3 sécondes
      $timeout(function() {

        if (angular.lowercase(dataSolde.referenceClient) == ConstEagence.UTILISATEUR){

          $rootScope.AfficherMessage("Récupération de votre dernier solde ...");
          
          // On exécute cette fonction au bout de 3 sécondes également
          $timeout(function() { 
            
            $rootScope.CacherMessage();
            $state.go('app.solde'); // On affiche le détail du solde actuel
            
          }, 3000);  

        }
        else{
          $rootScope.CacherMessage();
          $cordovaDialogs.alert("Votre référence client est invalide !", "e-agence", 'OK');
        }

      }, 3000); 

    }
  };
})

;
