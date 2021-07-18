/*
$(document).ready(function(){
    
    (function($) {
        "use strict";


    jQuery.validator.addMethod('answercheck', function (value, element) {
        return this.optional(element) || /^\bcat\b$/.test(value)
    }, "type the correct answer -_-");

    // validate contactForm form
    $(function() {
        $('#searchForm').validate({
            rules: {
                place: {
                    required: true,
                    minlength: 1
                }
            },
            messages: {
                place: {
                    required: "Add a place",
                    minlength: "Add a place"
                }
            },
            submitHandler: function(form) {
            	  var place=document.getElementById("citysearch").innerHTML;
            	  alert(place);
            	 alert("http://192.168.0.10:8000/getDestination/?place="+place);
                 window.location.href = "http://192.168.0.10:8000/getDestination/?place="+place;

            }
        })
    })
        
 })(jQuery)
})*/
