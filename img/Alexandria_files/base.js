$(function() {
  allCheckboxes();
  highlightRow();
  itemsNaviagion();
  confirmModal();
  areaDel();
});

alertModal = function(message){
$('#alert-dialog').modal({
  closeHTML: "<a href='#' title='Close' class='modal-close'>x</a>",
  escClose:true,
  containerCss: {height:"auto"},
  overlayId: 'alert-overlay',
  containerId: 'alert-container',
  onShow: function (dialog) {
      $('.message', dialog.data[0]).append(message);
    }
  });
}

// Confirm destroy selected items
confirmModal = function(){
  $('#btDestroyItems, #btDestroyItemsB').click(function (e) {
    e.preventDefault();
    if ($("input:checked").length > 0) {
      confirmDeleteAll(function() {
        $('#destroy_all').submit();
      }, "Deseja excluir os itens selecionados?");
    }else{
      alertModal($(this).attr('conf'))
    }
  });
}

areaDel= function(){
  $(".area_del").each(function(){
    $(this).click(function(e){
      id = "#" + $(this).attr('rel')
      confirmDeleteAll(function(){$(id).click()}, $(this).attr('conf'));
      return false;
    });
  });
}

submitDelArea = function(id){

}

confirmDeleteAll = function(callback, message) {
  $('#site-config').modal({
    closeHTML: "<a href='#' title='Close' class='modal-close'>x</a>",
    autoPosition: true,
    escClose:true,
    overlayId: 'confirm-overlay',
    containerId: 'confirm-container',
    onShow: function (dialog) {
      if(message != undefined ){$('.message', dialog.data[0]).append(message);}
      $('.yes', dialog.data[0]).click(function () {
        // call the callback
        if ($.isFunction(callback)) {
        callback.apply();
        }
        // close the dialog
        $.modal.close();
      });
    }
  });
}

// Select all checkbox
allCheckboxes = function() {
  $("#select_all").click(function() {
  var checked_status = $(this).is(":checked");
  var checkboxes = $(this).parents('table').find("input[type='checkbox']").not(this)
  	checkboxes.each(function() {
      $(this).attr("checked", checked_status);
    });
		highlightRow(checkboxes);
  });
}

// Search without params alert
$("#header-search-button").click(function(){
  if ($("#search-top").val() == "" && $("#search-source").val() == "") {
    alert($(this).attr("rel"));
    return false;
  }
})

// Highlight row when checkbox is checked
highlightRow = function(check){
	if (!check)
	var check = $("table td input[type='checkbox']")
	var color = "#D7E0E9"
	check.each(function(){
		if (check.is(":checked")) {
			check.parent().css('background-color', color).siblings('td').css('background-color', color);
		} else {
			check.parent().css('background-color', '').siblings('td').css('background-color', '');
		}
	});
	check.click(function(){
		if ($(this).is(":checked")) {
			$(this).parent().css('background-color', color).siblings('td').css('background-color', color);
  	} else {
			$(this).parent().css('background-color', '').siblings('td').css('background-color', '');
			$("#select_all:checked").attr('checked', false);
		}
	});
  // $("table td:last-child").css('border-right', 'none');
}

// Main Navigation Active
mainNavigation = function(mainNav){
	$('body').attr('id', mainNav);
	removeActiveOnMainNav();
	itemsNaviagion(mainNav);
}

// Box Nagigation
itemsNaviagion = function(currentNav){
	$("#navigation .nav_box").each(function(){
		if($(this).hasClass(currentNav)){
			$(this).show();
		} else {
			$(this).hide();
		}
	});
	$('#main_navigation a').each(function(){
		if ($(this).attr('rel') == currentNav)
			$(this).addClass('active');
	});
	var navSize = $("#navigation .nav_box."+currentNav).size()
	navSize = (navSize * 200) + 50
	$("#navigation").width(navSize)
}

// Remove class .active on Main Navigation
removeActiveOnMainNav = function(){
	$('#main_navigation a').each(function(){
		if($(this).hasClass('active'))
			$(this).removeClass('active')
	});
}