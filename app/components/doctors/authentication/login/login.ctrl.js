﻿(function () {
    'use strict';

    angular.module('mtiba.authentication')

    .controller('LoginController', function($state, DoctorAuthenticationService, FlashService) {

        var loginCtrl = this;

        loginCtrl.login = login;

        (function initController() {
            // reset login status
            DoctorAuthenticationService.ClearCredentials();
        })();



        function login() {
            loginCtrl.dataLoading = true;
            DoctorAuthenticationService.Login(loginCtrl.username, loginCtrl.password, function (response) {
                if (response.success) {
                    DoctorAuthenticationService.SetCredentials(loginCtrl.username, loginCtrl.password);
                    $state.go('doctorDashboard');
                } else {
                    console.log(response.message);
                    FlashService.Error(response.message);
                    loginCtrl.dataLoading = false;
                }
            });
        };

    })

})();