$(document).ready(function() {
	$('.btn-grp').on('click','.btn-grp',function(){
		$('.butn').removeClass('selected');
		$(this).addClass('selected')
	});
});
	