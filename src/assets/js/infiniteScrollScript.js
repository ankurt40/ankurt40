var ajax_arry=[];
var ajax_index =0;
$(function(){

	//$('#loading').show();

	
	$.ajax({

		url:"http://localhost/new-project/index.php/BooksReviewTimeLineController/showDataForTimeLine",
		type:"POST",
		data:"page=1",
		cache: false,
		success: function(response){
			//alert(response);
			$('#loading').hide();
			$('#timelineData').html(response);

		}

	});
	$(window).scroll(function(){

		var height = $('#timelineData').height();
		var scroll_top = $(this).scrollTop();
		if(ajax_arry.length>0){
			$('#loading').hide();
			for(var i=0;i<ajax_arry.length;i++){
				ajax_arry[i].abort();
			}
		}
		var page = $('#timelineData').find('.nextpage').val();
		var isload = $('#timelineData').find('.isload').val();

		if ((($(window).scrollTop()+document.body.clientHeight)>=$(window).height()) && isload=='true'){

			$('#loading').show();
			var ajaxreq = $.ajax({
				url:"http://localhost/new-project/index.php/BooksReviewTimeLineController/showDataForTimeLine",
				type:"POST",
				data:"page="+page,
				cache: false,
				success: function(response){
					$('#timelineData').find('.nextpage').remove();
					$('#timelineData').find('.isload').remove();
					$('#loading').hide();

					$('#timelineData').append(response);

				}

			});
			ajax_arry[ajax_index++]= ajaxreq;

		}
		return false;

		if($(window).scrollTop() == $(window).height()) {
			alert("bottom!");
		}
	});

});
