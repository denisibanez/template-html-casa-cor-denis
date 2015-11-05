$(function(){
  buildProjects();
});

buildProjects = function(){
  var _html_projects = $("#projects-select").html();
  $("#projects-select").remove();
  $("#placeholder-next-marca").html(_html_projects);
  $('#project-selected').click(function(e){
  	e.preventDefault();
  	$('#project-select').toggle();
  });
}