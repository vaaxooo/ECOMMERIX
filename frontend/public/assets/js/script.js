$(document).ready(function() {


    //////////////////////// Prevent closing from click inside dropdown
    $(document).on('click', '.dropdown-menu', function (e) {
        e.stopPropagation();
    });

    $(document).on('click', '#toast-close', function (e) {
        document.getElementById("toasts").innerHTML = "";
    });

    $('.js-check :radio').change(function () {
        var check_attr_name = $(this).attr('name');
        if ($(this).is(':checked')) {
            $('input[name='+ check_attr_name +']').closest('.js-check').removeClass('active');
            $(this).closest('.js-check').addClass('active');
            // item.find('.radio').find('span').text('Add');

        } else {
            item.removeClass('active');
            // item.find('.radio').find('span').text('Unselect');
        }
    });


    $('.js-check :checkbox').change(function () {
        var check_attr_name = $(this).attr('name');
        if ($(this).is(':checked')) {
            $(this).closest('.js-check').addClass('active');
            // item.find('.radio').find('span').text('Add');
        } else {
            $(this).closest('.js-check').removeClass('active');
            // item.find('.radio').find('span').text('Unselect');
        }
    });



    //////////////////////// Bootstrap tooltip
    if($('[data-toggle="tooltip"]').length>0) {  // check if element exists
        $('[data-toggle="tooltip"]').tooltip()
    } // end if


    jQuery(function($) {
        $('.dropdown').hover(function() {
            $(this).find('.dropdown-menu').first().stop(true, true).delay(250).slideDown();
        }, function() {
            $(this).find('.dropdown-menu').first().stop(true, true).delay(400).slideUp();
        });});


    jQuery(function($) {
        $('.sub-dropdown').hover(function() {
            $(this).find('.dropdown-menu').first().stop(true, true).delay(550).slideDown();
        }, function() {
            $(this).find('.dropdown-menu').first().stop(true, true).delay(400).slideUp();
        });});


});