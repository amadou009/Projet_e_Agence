
angular.module('starter.services', [])

.service("WebService", ["$http", "ConstKirikou", "$interval", function($http, ConstKirikou, $interval){

	var baseUrl = ConstKirikou.BASE_URL + "/" + ConstKirikou.TOKEN_SECURITY+ "/" + ConstKirikou.PASSWORD_SECURITY;
	var transfertUrl = ConstKirikou.TRANSFERT_URL; // + "/" + ConstKirikou.TOKEN_SECURITY+ "/" + ConstKirikou.PASSWORD_SECURITY;

	var construct = function (action) {

		var actionUrl = baseUrl+"/"+action;
		var actionTransfertUrl = transfertUrl;

		var url = "";

		return{

			create: function(data){
				url = "/create";
				return $http.post(actionUrl+url, data);
			},

			update: function(data){
				url = "/update";
				return $http.post(actionUrl+url, data);
			},

			get: function(data){
				url = "/getByCriteria";
				return $http.post(actionUrl+url, data);
			},

			getAll: function(data){
				url = "/getAll";
				return $http.get(actionUrl+url);
			},

			delete: function(data){
				url = "/delete";
				return $http.delete(actionUrl+url, data);
			},

			executeTransfert: function(operation,data){
				var options = {
					headers : {"content-type" : "application/json"}
				};
				url = "/"+operation;
			 	return $http.post(actionTransfertUrl+url, data, options);
			},

			execute: function(operation, data){
				url = "/"+operation;
			 	return $http.post(actionUrl+url, data);
			}

		};
	};
	return {
		construct: construct
	};
}])

.service('nguser', ['$state', '$cookies', function ($state,  $cookies) {
    var currentUser = function(){
    	return JSON.parse(sessionStorage.getItem("user")) || {};
    };

    var getIdDemandeur = function(){
    	var dmd = JSON.parse(sessionStorage.getItem("user")) || {};
    	return dmd.idDemandeur;
    };

    return {
        getIdDemandeur: getIdDemandeur,
        nom: currentUser().nom+ " " +currentUser().prenom,
        // idDemandeur: currentUser().idDemandeur,
        user: currentUser,
        
        connexion: function(obj){
        	sessionStorage.setItem("user", JSON.stringify(obj));
        	$state.go("main.demande");
        	//$state.go("main.wizard");
        },

        deconnexion: function(){
        	sessionStorage.remove("user");
        },
    };
}])
	
;



