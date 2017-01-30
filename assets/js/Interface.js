
/**
 * Initialize DataTable, if not already done
 **/
function initTable(){
    if($.fn.dataTable.isDataTable('#datatables')){
        $('#datatables').DataTable();
    }else {
        $('#datatables').DataTable({
            "pagingType": "full_numbers",
            "lengthMenu": [
                [10, 25, 50, -1],
                [10, 25, 50, "All"]
            ],
            "info": false,
            responsive: true,
            language: {
                search: "_INPUT_",
                searchPlaceholder: "Search records"
            }
        });
    }
}

/**
 *  Fill in the table with the appropriate type of users
 **/
function filterTable(type) {
    var usersData = '';
    if(type == 'resaler') {
        $('#platform-header').hide();
    }
    else {
        $('#platform-header').show();
    }
    var usersData = '';
    for( var i = 0; i < USERS.length; i++) {
        if(type == 'resaler') {
            if(!USERS[i].hasOwnProperty("Platform")) {
                usersData += `<tr><td>${USERS[i]["First Name"]}</td>`;
                usersData += `<td>${USERS[i]["Last Name"]}</td>`;
                usersData += `<td>${USERS[i]["Phone"]}</td>`;
                usersData += `<td>${USERS[i]["Email"]}</td>`;
                usersData += `<td class="text-right"><a class="edit-user btn btn-simple btn-warning btn-icon edit" data-id=${USERS[i]["id"]} href="#" data-toggle="modal" data-target="#edit-user-modal">
                <i class="material-icons">dvr</i></a>
                <a href="#" class="btn btn-simple btn-danger btn-icon remove" data-id=${USERS[i]["id"]}>
                <i class="material-icons">close</i></a></td></tr>`;
            }
        }
        else if (type == 'white-label'){
            if(USERS[i].hasOwnProperty("Minimum Fee")){
                usersData += `<tr><td>${USERS[i]["Platform"]}`;
                usersData += `<td>${USERS[i]["First Name"]}</td>`;
                usersData += `<td>${USERS[i]["Last Name"]}</td>`;
                usersData += `<td>${USERS[i]["Phone"]}</td>`;
                usersData += `<td>${USERS[i]["Email"]}</td>`;
                usersData += `<td class="text-right"><a class="edit-user btn btn-simple btn-warning btn-icon edit" data-id=${USERS[i]["id"]} href="#" data-toggle="modal" data-target="#edit-user-modal">
                <i class="material-icons">dvr</i></a>
                <a href="#" class="btn btn-simple btn-danger btn-icon remove" data-id=${USERS[i]["id"]}>
                <i class="material-icons">close</i></a></td></tr>`;
            }
        }
        else if( type == 'franchise') {
            if(USERS[i].hasOwnProperty("Platform") && !USERS[i].hasOwnProperty("Minimum Fee")) {
                usersData += `<tr><td>${USERS[i]["Platform"]}`;
                usersData += `<td>${USERS[i]["First Name"]}</td>`;
                usersData += `<td>${USERS[i]["Last Name"]}</td>`;
                usersData += `<td>${USERS[i]["Phone"]}</td>`;
                usersData += `<td>${USERS[i]["Email"]}</td>`;
                usersData += `<td class="text-right"><a class="edit-user btn btn-simple btn-warning btn-icon edit" data-id=${USERS[i]["id"]} href="#" data-toggle="modal" data-target="#edit-user-modal">
                <i class="material-icons">dvr</i></a>
                <a href="#" class="btn btn-simple btn-danger btn-icon remove" data-id=${USERS[i]["id"]}>
                <i class="material-icons">close</i></a></td></tr>`;
            }
        }
    }
    $('#user-data').html(usersData);
    initTable();
}

 /**
  * Fill the inputs of the user modal
  **/
function fillEditUserModal(user, type) {
    $('#edit-user-modal #lastname').val(user["Last Name"]);
    $('#edit-user-modal #firstname').val(user["First Name"]);
    $('#edit-user-modal #phone').val(user["Phone"]);
    $('#edit-user-modal #email').val(user["Email"]);
    $('#edit-user-modal #company-name').val(user["Company Name"]);
    $('#edit-user-modal #country-incorporation').val(user["Country of Incorporation"]);
    $('#edit-user-modal #registration-number').val(user["Registration Number"]);
    $('#edit-user-modal #corporate-address').val(user["Corporate Address"]);
    $('#edit-user-modal #legal-rep').val(user["Legal Representative"]);
    $('#edit-user-modal #setup-fee').val(user["Setup Fee"]);
    $('#edit-user-modal #license-fee').val(user["License Fee"]);
    $('#edit-user-modal #comment').val(user["Comment"]);
    $('#edit-user-modal #userId').val(user["id"]);
    if(type == 'white-label') {
        $('#edit-user-modal #minimum-fee').val(user["Minimum Fee"]);
        $('#edit-user-modal #platform').val(user["Platform"]);
    }
    else if(type == 'franchise') {
        $('#edit-user-modal #platform').val(user["Platform"]);
        $('#minfeegroup').hide();
    }
    else if(type == 'resaler'){
        $('#platformgroup').hide();
        $('#minfeegroup').hide();
    }
}

function getTypeUser(){
    var id = $('.sidebar-wrapper .nav li.active a').attr('id');
    var type = id.split('-')[0];
    return type;
}

function cleanModals(){
    //clean up modal on close
    $('#add-user-modal').on('hidden.bs.modal', function(){
        $('#add-user-modal .error-container p').html('');
        $('#add-user-modal').find('input, textarea').val('');
        $('#add-user-modal select').val('');
    });

    $('#edit-user-modal').on('hidden.bs.modal', function(){
        $('#edit-user-modal .error-container p').html('');
    });

    if( $("#add-user-modal").hasClass('in') ) {
        $('#add-user-modal').find('input, textarea').val('');
        $('#add-user-modal select').val('');
        $('#edit-user-modal .error-container p').html('');
        $('#add-user-modal').modal('toggle');
    }
    else if( $('#edit-user-modal').hasClass('in')) {
        $('#edit-user-modal').modal('toggle');
        $('#edit-user-modal .error-container p').html('');
    }
}

/**
 * Sidebar interaction, filter the table
 **/
$('#white-label-filter').on('click', function(){
    $('.nav li').removeClass('active');
    $(this).parent('li').addClass('active');
    filterTable('white-label');
});

$('#resaler-filter').on('click', function(){
    $('.nav li').removeClass('active');
    $(this).parent('li').addClass('active');
    filterTable('resaler');
});

$('#franchise-filter').on('click', function(){
    $('.nav li').removeClass('active');
    $(this).parent('li').addClass('active');
    filterTable('franchise');
});


/**
 * Actions buttons in the table
 **/
$(document).on('click', '.edit-user', function(){
    var userId = $(this).data('id');
    socket.emit('findUser', {id: userId})
});

$(document).on('click', '#datatables .remove', function(){
    var userId = $(this).data('id');
    socket.emit('delete-user', userId);
});

/**
 * Update sidebar when filtering table
 **/
function updateSidebar(filterType) {
    $('.sidebar-wrapper .nav').find('li').removeClass('active');
    if(filterType == 'resaler') {
        $('.sidebar-wrapper .nav #resaler-filter').parent('li').addClass('active');
    }
    else if (filterType == 'white-label') {
        $('.sidebar-wrapper .nav #white-label-filter').parent('li').addClass('active');
    }
    else if (filterType == 'franchise') {
        $('.sidebar-wrapper .nav #franchise-filter').parent('li').addClass('active');
    }
}

/**
 * Show or hide necessary inputs depending on the user type
 **/
$('#add-user-modal #type-user').on('change', function(){
    var type = $(this).val();
    if(type == 'white-label') {
        $('#add-user-modal #platformgroup' ).show();
        $('#add-user-modal #minfeegroup').show();
    }
    else if (type == 'franchise') {
        $('#add-user-modal #platformgroup').show();
        $('#add-user-modal #minfeegroup').hide();
    }
    else if (type == 'resaler') {
        $('#add-user-modal #platformgroup').hide();
        $('#add-user-modal #minfeegroup').hide();
    }
});

$('#submit-edit-user').on('click', function(){
    var userData = {};
    var errorCount = 0;
    var errors = [];
    var userType = 'resaler';

    $('#edit-user-modal :input:visible:not(:button)').each(function(idx, element) {
        if(element.value === '') {
            $(this).parent('div .form-group').addClass('has-error');
            errorCount++;
        }
    });

    if(errorCount > 0) {
        errors.push('Please fill the required fields');
    }

    if(parseInt($('#edit-user-modal #registration-number').val()) < 0 || isNaN($('#edit-user-modal #registration-number').val())) {
        errorCount++;
        errors.push('Registration Number: Invalid Input');
    }
    if(parseFloat($('#edit-user-modal #setup-fee').val(), 10) < 0  || isNaN($('#edit-user-modal #setup-fee').val())) {
        errorCount++;
        errors.push('Setup Fee: Invalid Number');
    }
    if( parseFloat($('#edit-user-modal #license-fee').val() , 10) < 0  || isNaN($('#edit-user-modal #license-fee').val())) {
        errorCount++;
        errors.push('License Fee: Invalid Number');
    }

    userData["id"] = $('#edit-user-modal #userId').val();
    userData["First Name"] = $('#edit-user-modal #firstname').val();
    userData["Last Name"] = $('#edit-user-modal #lastname').val();
    userData["Phone"] = $('#edit-user-modal #phone').val();
    userData["Email"] = $('#edit-user-modal #email').val();
    userData["Company Name"] = $('#edit-user-modal #company-name').val();
    userData["Country of Incorporation"] = $('#edit-user-modal #country-incorporation').val();
    userData["Corporate Address"] = $('#edit-user-modal #corporate-address').val();
    userData["Legal Representative"] = $('#edit-user-modal #legal-rep').val();
    userData["Setup Fee"] = $('#edit-user-modal #setup-fee').val();
    userData["License Fee"] = $('#edit-user-modal #license-fee').val();
    userData["Registration Number"] = $('#edit-user-modal #registration-number').val();
    userData["Comment"] = $('#edit-user-modal #comment').val();
    if($('#edit-user-modal #minfeegroup').is(':visible')){
        userData["Minimum Fee"] = $('#edit-user-modal #minimum-fee').val();
        userType = 'white-label';
    }
    if($('#edit-user-modal #platformgroup').is(':visible')) {
        userData["Platform"] = $('#edit-user-modal #platform').val();
    }

    if( $('#edit-user-modal #platformgroup').is(':visible') && !$('#edit-user-modal #minfeegroup').is(':visible')) {
        userType = 'franchise';
    }

    if(errorCount > 0) {
        $('#edit-user-modal').scrollTop(0);
        var errorMessage = errors.join('<br>');
        $('#edit-user-modal .error-container p').html(errorMessage);
    }
    else {
        socket.emit('edit-user', { data: userData, type: userType});
    }
});

$('#submit-add-user').on('click', function(){
    var userData = {};
    var errorCount = 0;
    var errors = [];
    var typeUser;

    if( $('#add-user-modal #type-user').val() == null ){
        errorCount++;
        errors.push('You must choose a user type first.');
    }
    else{
        typeUser = $('#add-user-modal #type-user').val();
    }

    if(typeUser == 'resaler') {
        $('#add-user-modal :input:not(:button, #platform, #minimum-fee)').each(function(idx, element) {
            if(element.value === '') {
                $(this).parent('div .form-group').addClass('has-error');
                errorCount++;
            }
        });
    }
    else if( typeUser == 'franchise') {
        $('#add-user-modal :input:not(:button, #minimum-fee)').each(function(idx, element) {
            if(element.value === '') {
                $(this).parent('div .form-group').addClass('has-error');
                errorCount++;
            }
        });
    }

    if(errorCount > 0) {
        errors.push('Please fill the required fields');
    }

    if(parseInt($('#add-user-modal #registration-number').val()) < 0 || isNaN($('#add-user-modal #registration-number').val())) {
        errorCount++;
        errors.push('Registration Number: Invalid Input');
    }
    if(parseFloat($('#add-user-modal #setup-fee').val(), 10) < 0  || isNaN($('#add-user-modal #setup-fee').val())) {
        errorCount++;
        errors.push('Setup Fee: Invalid Number');
    }
    if( parseFloat($('#add-user-modal #license-fee').val() , 10) < 0  || isNaN($('#add-user-modal #license-fee').val())) {
        errorCount++;
        errors.push('License Fee: Invalid Number');
    }

    if(typeUser == 'white-label') {
        if( parseFloat($('#add-user-modal #minimum-fee').val() , 10) < 0  || isNaN($('#add-user-modal #minimum-fee').val())) {
            errorCount++;
            errors.push('Minimum Fee: Invalid Number');
        }
    }

    userData["First Name"] = $('#add-user-modal #firstname').val();
    userData["Last Name"] = $('#add-user-modal #lastname').val();
    userData["Phone"] = $('#add-user-modal #phone').val();
    userData["Email"] = $('#add-user-modal #email').val();
    userData["Company Name"] = $('#add-user-modal #company-name').val();
    userData["Country of Incorporation"] = $('#add-user-modal #country-incorporation').val();
    userData["Corporate Address"] = $('#add-user-modal #corporate-address').val();
    userData["Legal Representative"] = $('#add-user-modal #legal-rep').val();
    userData["Setup Fee"] = $('#add-user-modal #setup-fee').val();
    userData["License Fee"] = $('#add-user-modal #license-fee').val();
    userData["Registration Number"] = $('#add-user-modal #registration-number').val();
    userData["Comment"] = $('#add-user-modal #comment').val();
    if($('#add-user-modal #minfeegroup').is(':visible')){
        userData["Minimum Fee"] = $('#add-user-modal #minimum-fee').val();
    }
    if($('#add-user-modal #platformgroup').is(':visible')) {
        userData["Platform"] = $('#add-user-modal #platform').val();
    }

    if(errorCount > 0) {
        $('#add-user-modal').scrollTop(0);
        var errorMessage = errors.join('<br>');
        $('#add-user-modal .error-container p').html(errorMessage);
    }
    else {
        socket.emit('add-user', {data: userData, type:typeUser} );
    }
});

$('#settings').on('click', function(){
    var type = getTypeUser();
    if( type == 'white') {
        $('#add-company-modal h4').html('Company Settings - White Label');
    }
    else if( type == 'resaler') {
        $('#add-company-modal h4').html('Company Settings - Resaler');
    }
    else if(type == 'franchise') {
        $('#add-company-modal h4').html('Company Settings - Franchise');
    }
    socket.emit('get-company-params', type);
});

function fillCompanySettingsModal(type, companyData) {
    if(type == 'white') {
        if(!companyData.hasOwnProperty("White Label")){
            $('#add-company-modal :input').val('');
        }
        else {
            $('#add-company-modal #company-name').val(companyData["White Label"]["Name"]);
            $('#add-company-modal #company-surname').val(companyData["White Label"]["Surname"]);
            $('#add-company-modal #company-city').val(companyData["White Label"]["City"]);
            $('#add-company-modal #company-country').val(companyData["White Label"]["Country"]);
            $('#add-company-modal #company-id').val(companyData["White Label"]["ID"]);
            $('#add-company-modal #company-owner').val(companyData["White Label"]["Owner"]);
            $('#add-company-modal #company-address').val(companyData["White Label"]["Address"]);
        }
    }
    else if(type == 'resaler') {
        if(!companyData.hasOwnProperty("Resaler")){
            $('#add-company-modal :input').val('');
        }
        else {
            $('#add-company-modal #company-name').val(companyData["Resaler"]["Name"]);
            $('#add-company-modal #company-surname').val(companyData["Resaler"]["Surname"]);
            $('#add-company-modal #company-city').val(companyData["Resaler"]["City"]);
            $('#add-company-modal #company-country').val(companyData["Resaler"]["Country"]);
            $('#add-company-modal #company-id').val(companyData["Resaler"]["ID"]);
            $('#add-company-modal #company-owner').val(companyData["Resaler"]["Owner"]);
            $('#add-company-modal #company-address').val(companyData["Resaler"]["Address"]);
        }
    }
    else if (type == 'franchise') {
        if(!companyData.hasOwnProperty("Franchise")){
            $('#add-company-modal :input').val('');
        }
        else {
            $('#add-company-modal #company-name').val(companyData["Franchise"]["Name"]);
            $('#add-company-modal #company-surname').val(companyData["Franchise"]["Surname"]);
            $('#add-company-modal #company-city').val(companyData["Franchise"]["City"]);
            $('#add-company-modal #company-country').val(companyData["Franchise"]["Country"]);
            $('#add-company-modal #company-id').val(companyData["Franchise"]["ID"]);
            $('#add-company-modal #company-owner').val(companyData["Franchise"]["Owner"]);
            $('#add-company-modal #company-address').val(companyData["Franchise"]["Address"]);
        }
    }
}

$('#submit-company').on('click', function(){
    var companyData = {};
    var type = $('#add-company-modal h4').html().split('-')[1].trim();
    companyData["Name"] = $('#add-company-modal #company-name').val();
    companyData["Surname"] = $('#add-company-modal #company-surname').val();
    companyData["Address"] = $('#add-company-modal #company-address').val();
    companyData["City"] = $('#add-company-modal #company-city').val();
    companyData["Country"] = $('#add-company-modal #company-country').val();
    companyData["ID"] = $('#add-company-modal #company-id').val();
    companyData["Owner"] = $('#add-company-modal #company-owner').val();
    socket.emit('save-company-params', {data: companyData, userType: type});
    $('#add-company-modal').modal('toggle');
});
