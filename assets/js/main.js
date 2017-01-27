var socket = io();

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


socket.on('connected', function(data){
    var usersData = '';
    var users = data.users;
    for( var i = 0; i < users.length; i++) {
        usersData += `<tr><td>${users[i]["First Name"]}</td>`;
        usersData += `<td>${users[i]["Last Name"]}</td>`;
        usersData += `<td>${users[i]["Phone"]}</td>`;
        usersData += `<td>${users[i]["Email"]}</td>`;
        usersData += `<td>${users[i]["Company Name"]}</td>`;
        usersData += `<td>${users[i]["Country of Incorporation"]}</td>`;
        usersData += `<td>${users[i]["Registration Number"]}</td>`;
        usersData += `<td>${users[i]["Corporate Address"]}</td>`;
        usersData += `<td>${users[i]["Legal Representative"]}</td>`;
        usersData += `<td class="text-right"><a class="edit-user btn btn-simple btn-warning btn-icon edit" data-id=${users[i]["id"]} href="#" data-toggle="modal" data-target="#edit-user-modal">
                    <i class="material-icons">dvr</i></a>
                    <a href="#" class="btn btn-simple btn-danger btn-icon remove" data-id=${users[i]["id"]}>
                    <i class="material-icons">close</i></a></td></tr>`;
    }
    $('#user-data').html(usersData);
    initTable();
});

socket.on('users_filtered', function(data) {
    var users = data.users_filtered;
    var usersData = '';
    for( var i = 0; i < users.length; i++) {
        usersData += `<tr><td>${users[i]["First Name"]}</td>`;
        usersData += `<td>${users[i]["Last Name"]}</td>`;
        usersData += `<td>${users[i]["Phone"]}</td>`;
        usersData += `<td>${users[i]["Email"]}</td>`;
        usersData += `<td>${users[i]["Company Name"]}</td>`;
        usersData += `<td>${users[i]["Country of Incorporation"]}</td>`;
        usersData += `<td>${users[i]["Registration Number"]}</td>`;
        usersData += `<td>${users[i]["Corporate Address"]}</td>`;
        usersData += `<td>${users[i]["Legal Representative"]}</td>`;
        usersData += `<td class="text-right"><a class="edit-user btn btn-simple btn-warning btn-icon edit" data-id=${users[i]["id"]} href="#" data-toggle="modal" data-target="#edit-user-modal">
                    <i class="material-icons">dvr</i></a>
                    <a href="#" class="btn btn-simple btn-danger btn-icon remove" data-id=${users[i]["id"]}>
                    <i class="material-icons">close</i></a></td></tr>`;
    }
    initTable();
    $('#user-data').html(usersData);
    if( $("#add-user-modal").hasClass('in') ) {
        $('#add-user-modal').modal('toggle');
    }
    else if( $('#edit-user-modal').hasClass('in')) {
        $('#edit-user-modal').modal('toggle');
    }
});

$(document).on('click', '.edit-user', function(){
    var userId = $(this).data('id');
    socket.emit('findUser', {id: userId})
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

$('#white-label-filter').on('click', function(){
    $('#user-type').html('White Label Users');
    $('.nav li').removeClass('active');
    $(this).parent('li').addClass('active');
    socket.emit('filter-white-label');
});

$('#resaler-filter').on('click', function(){
    $('#user-type').html('Resaler Users');
    $('.nav li').removeClass('active');
    $(this).parent('li').addClass('active');
    socket.emit('filter-resaler');
});

$('#franchise-filter').on('click', function(){
    $('#user-type').html('Franchise Users');
    $('.nav li').removeClass('active');
    $(this).parent('li').addClass('active');
    socket.emit('filter-franchise');
});

$('#all-users').on('click', function(){
    $('#user-type').html('All Users');
    $('.nav li').removeClass('active');
    $(this).parent('li').addClass('active');
    socket.emit('all-users');
});


$(document).on('click', '#datatables .remove', function(){
    var userId = $(this).data('id');
    socket.emit('delete-user', userId);
});

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
    }
    if($('#edit-user-modal #platformgroup').is(':visible')) {
        userData["Platform"] = $('#edit-user-modal #platform').val();
    }

    if(errorCount > 0) {
        $('#edit-user-modal').scrollTop(0);
        var errorMessage = errors.join('<br>');
        $('#edit-user-modal .error-container p').html(errorMessage);
    }
    else {
        socket.emit('edit-user', userData);
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
                console.log(element);
                $(this).parent('div .form-group').addClass('has-error');
                errorCount++;
            }
        });
    }
    else if( typeUser == 'franchise') {
        $('#add-user-modal :input:not(:button, #minimum-fee)').each(function(idx, element) {
            if(element.value === '') {
                console.log(element);
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
        socket.emit('add-user', userData);
    }
});
