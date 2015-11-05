$(function(){
  sitePreview();
});
// Ajax Site Preview
sitePreview = function(){
  $('#site_preview, #btSearchBoxes').click(function(){
		confirmPreview();
  });
}

