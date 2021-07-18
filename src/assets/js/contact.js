$(document).ready(function(){
    
    (function($) {
        "use strict";


    jQuery.validator.addMethod('answercheck', function (value, element) {
        return this.optional(element) || /^\bcat\b$/.test(value)
    }, "type the correct answer -_-");

    // validate contactForm form
    $(function() {
        $('#contactForm').validate({
            rules: {
                numberofdays: {
                    required: true,
                    minlength: 1
                }
            },
            messages: {
                numberofdays: {
                    required: "At least 1 day",
                    minlength: "Select at least 1 day"
                }
            },
            submitHandler: function(form) {

                                           var place=	document.getElementById('currentcity').val() ;
                                           var start='';
                                           var end='';
                                           var numberofdays=document.getElementById('numberofdays').val() ;
                                            console.log('Checking with Validity' ,place, numberofdays);

                                 window.location.href = "http://192.168.0.10:8000/getSuggestion/?place="+place+"&start="+start+"&end="+end+"&numberofdays="+numberofdays;

              /*  $(form).ajaxSubmit({
                    type:"POST",
                    data: $(form).serialize(),
                    url:"contact_process.php",
                    success: function() {
                        $('#contactForm :input').attr('disabled', 'disabled');
                        $('#contactForm').fadeTo( "slow", 1, function() {
                            $(this).find(':input').attr('disabled', 'disabled');
                            $(this).find('label').css('cursor','default');
                            $('#success').fadeIn()
                            $('.modal').modal('hide');
		                	$('#success').modal('show');
                        })
                    },
                    error: function() {
                        $('#contactForm').fadeTo( "slow", 1, function() {
                            $('#error').fadeIn()
                            $('.modal').modal('hide');
		                	$('#error').modal('show');
                        })
                    }
                })*/
            }
        })
    })
        
 })(jQuery)
})