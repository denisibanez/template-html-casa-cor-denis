$(function(){
  buildSites();
});

buildSites = function(){
  var _html_sites = $("#sites-select").html();
  _html_sites += $("#brand-select").html(); 
  $("#sites-select").remove();
  $("#brand-select").html(_html_sites);
  //customSelectBehavior();
}

var resultsListItemHover = function () {
  $('tbody tr', '.table').hover(function () {
      $(this).addClass('selected').prev().addClass('prevOver');
    }, function (){
      var checkItem = $(this).find('.check-item');
      if (checkItem && checkItem.is(':not:checked')) {
        return;
      }
      $(this).removeClass('selected').prev().removeClass('prevOver');  
    }
  );
};
