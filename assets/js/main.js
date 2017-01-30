var socket = io();
var USERS = [];
var WL_SETTINGS = {};
var FRANCHISE_SETTINGS = {};
var RESALER_SETTINGS = {};

require(['Interface'], function(){
    socket.on('connected', function(data){
        USERS = data.users;
        filterTable(data.filterType);
        initTable();
    });

    socket.on('update-users', function(data) {
        USERS = data.users;
        filterTable(data.filterType);
        updateSidebar(data.filterType);
        cleanModals();
    });

    socket.on('userData', function(data){
        var user = data.user;
        if(user.hasOwnProperty('Minimum Fee')){
            fillEditUserModal(user, 'white-label');
        }
        else if(user.hasOwnProperty('Platform') && !user.hasOwnProperty('Minimum Fee')){
            fillEditUserModal(user, 'franchise');
        }
        else if(!user.hasOwnProperty('Platform')) {
            fillEditUserModal(user, 'resaler');
        }
    });

    socket.on('company-params', function(data){
        var type = data.userType;
        var companyData = data.data;
        fillCompanySettingsModal(type, companyData);
    });
});
