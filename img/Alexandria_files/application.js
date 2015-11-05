submitChangeSiteVersion = function(site_version_id){
  $("#site_version_id").val(site_version_id);
  $("#site_version_form").submit();
}

submitChangeSite = function(site_id){
  $("#site_id").val(site_id);
  $("#site_form").submit();
}

changeSite = function(site) {
  $('#site-config .message').html('');
  $('#site-config').modal({
    closeHTML: "<a href='#' title='Close' class='modal-close'>x</a>",
    autoPosition: true,
    escClose:true,
    overlayId: 'site-config-overlay',
    containerId: 'site-config-container',
    onShow: function (dialog) {
      $('.message', dialog.data[0]).append("Deseja mudar de Site?");
      $('.yes', dialog.data[0]).unbind("click");
      $('.yes', dialog.data[0]).click(function () {
        document.location.href = "/dashboard/select_site?site_selected=" + site;
      });
    }
  });
}

changeSiteVersion = function(site_version_id) {
  $('#site-config .message').html('');
  $('#site-config').modal({
    closeHTML: "<a href='#' title='Close' class='modal-close'>x</a>",
    autoPosition: true,
    escClose:true,
    overlayId: 'site-config-overlay',
    containerId: 'site-config-container',
    onShow: function (dialog) {
      $('.message', dialog.data[0]).append("Deseja mudar de Projeto?");
      $('.yes', dialog.data[0]).unbind("click");
      $('.yes', dialog.data[0]).click(function () {
        submitChangeSiteVersion(site_version_id);
        $.modal.close();
      });
    }
  });
}

defaultEnvironmentToPublish = "dev";
setDefaultEnvironmentToPublish = function(environment){
	defaultEnvironmentToPublish = environment;
}

validEnvironmentsToPublish = ["dev", "qa", "stage", "production"];
setValidEnvironmentsToPublish = function(environments){
  validEnvironmentsToPublish = environments;
}

setValidEnvironmentsToPublishConfiguration = function(environments){
  validEnvironmentsToPublishConfiguration = environments;
}

confirmPublish = function(){
  
	environment = defaultEnvironmentToPublish;
	valid_environments = validEnvironmentsToPublish;
	tag = '';
  if ( arguments.length  > 0 ) {
    tag = arguments[0];
		environment = arguments[1];
    valid_environments = arguments[2];
  } 
  $('#site-config .message').html('');
  $('#site-config').modal({
    closeHTML: "<a href='#' title='Close' class='modal-close'>x</a>",
    autoPosition: true,
    escClose:true,
    overlayId: 'site-config-overlay',
    containerId: 'site-config-container',
    onShow: function (dialog) {
			message_publish_html = "Deseja realmente publicar este Projeto?";
			message_publish_html += "<br><br><select id='publish_environment' name='publish_environment' onchange='environment=this.value;'>";
      jQuery.each(valid_environments, function(index, value) {
        if (value == environment)
          message_publish_html += "<option value='" + value + "' selected>" + value.toUpperCase() + "</option>";
        else
          message_publish_html += "<option value='" + value + "'>" + value.toUpperCase() + "</option>";
      });

			message_publish_html += "</select>";

	
      $('.message', dialog.data[0]).append(message_publish_html);
      $('.yes', dialog.data[0]).click(function () {
        $.modal.close();
				showStatusPublisher(tag, environment);
      });
    }
  });
}

confirmPreview = function(){
  
	environment = defaultEnvironmentToPublish;
	valid_environments = validEnvironmentsToPublish;
	tag = '';
  if ( arguments.length  > 0 ) {
    tag = arguments[0];
		environment = arguments[1];
    valid_environments = arguments[2];
  } 
  $('#site-config .message').html('');
  $('#site-config').modal({
    closeHTML: "<a href='#' title='Close' class='modal-close'>x</a>",
    autoPosition: true,
    escClose:true,
    overlayId: 'site-config-overlay',
    containerId: 'site-config-container',
    onShow: function (dialog) {
			message_publish_html = "Deseja realmente executar o preview deste Projeto?";
			message_publish_html += "<br><br><select id='publish_environment' name='publish_environment' onchange='environment=this.value;'>";
			jQuery.each(valid_environments, function(index, value) {
        if (value == environment)
          message_publish_html += "<option value='" + value + "' selected>" + value.toUpperCase() + "</option>";
        else
          message_publish_html += "<option value='" + value + "'>" + value.toUpperCase() + "</option>";
      });

			message_publish_html += "</select>";

	    $('.message', dialog.data[0]).append(message_publish_html);
      $('.yes', dialog.data[0]).click(function () {
        $.modal.close();
				sendPostPreview(environment);
      });
    }
  });
}

sendPostPreview = function(environment){
  $.ajax({
    dataType: 'json',
		data: 'environment='+environment, dataType:'script', type:'post', url:'/preview',
    success: function(data){
			window.open(JSON.parse(data).site_preview);
    },
    error: function(data){
      alert('Erro ao gerar o preview');
    }
  });
}

showStatusPublisher = function (tag, environment){
  $('#publish-dialog .buttons .no').css('visibility', 'hidden');
  $('#publish-dialog .message').css({'background-image':'url(/images/loader.gif)','background-position':'center center', 'background-repeat':'no-repeat'}).html('');
  $('#publish-dialog').modal({
    autoPosition: true,
    escClose: false,
    overlayId: 'publish-overlay',
    containerId: 'publish-container'
  });

  $.ajax({
    complete:function(request){ showPublishDetails(request) },
    data: 'tag='+tag+'&environment='+environment, dataType:'script', type:'post', url:'/publish',
  });
}

showPublishDetails = function(request){
  $('#publish-dialog .buttons .no').css('visibility', 'visible');
  $('#publish-dialog .message').css('background', '#FFFFFF').html(request.responseText);
}

hidePublishButton = function(){
  $('.publish-action, .preview-action').hide();
}

showPublishButton = function(){
  $('.publish-action, .preview-action').show();
}

excludeSites = function(messages) {
	if ($(":checked", "#sites_form").length == 0) {
		customAlert(messages.none);
		return;
	}
	customConfirm(messages.confirm, function(){
		$("#sites_form").submit();
	});
	return false;
}

excludeDomain = function(messages) {
	if ($(":checked", "#destroy_all").length == 0) {
		customAlert(messages.none);
		return;
	}
	customConfirm(messages.confirm, function(){
		$("#destroy_all").submit();
	});
	return false;
}

/* *
 * Date.toISOString fallback:
 * https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date/toISOString
 * */
if ( !Date.prototype.toISOString ) {
  (function() {
    function pad(number) {
        var r = String(number);
        if ( r.length === 1 ) {
            r = '0' + r;
        }
        return r;
    };
    Date.prototype.toISOString = function() {
      return this.getUTCFullYear()
          + '-' + pad( this.getUTCMonth() + 1 )
          + '-' + pad( this.getUTCDate() )
          + 'T' + pad( this.getUTCHours() )
          + ':' + pad( this.getUTCMinutes() )
          + ':' + pad( this.getUTCSeconds() )
          + '.' + String( (this.getUTCMilliseconds()/1000).toFixed(3) ).slice(2, 5)
          + 'Z';
    };
  }());
}

/*var customConfirm = function (question, onYes, onNo) {
  $("#custom_confirm").remove();
  $("body").append('<div id="custom_confirm"></div>');
  $("#custom_confirm")
    .html([
      '<div class="main clearfix"></div>',
      '<div class="actions">',
      ' <button class="button default yes"><span class="ico"></span>Sim</button>',
      ' <button class="button default no"><span class="ico"></span>Não</button>',
      '</div>'
    ].join(""))
    .dialog({
      title: '<span class="title">Atenção!</span>',
      width: 400,
      modal: true
    });
  $(".main", "#custom_confirm").html(question);
  $(".actions", "#custom_confirm")
    .find('.yes')
      .click(function (e) {
        e.preventDefault();
        onYes();
      });
  $(".actions", "#custom_confirm")
    .find('.no')
      .click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('#custom_confirm').dialog('close');
        if (onNo) { onNo() };
        return false;
      });
  return false;
};

var customAlert = function (message) {
  $("#custom_alert").remove();
  $("body").append('<div id="custom_alert"></div>');
  $("#custom_alert")
    .html([
      '<div class="main clearfix"></div>',
      '<div class="actions">',
      ' <button class="button default ok"><span class="ico"></span>OK</button>',
      '</div>'
    ].join(""))
    .dialog({
      title: '<span class="title">Atenção!</span>',
      width: 400,
      modal: true
    });
  $(".main", "#custom_alert").html(message);
  $(".actions", "#custom_alert")
    .find('.ok')
      .click(function (e) {
        e.preventDefault();
        $('#custom_alert').dialog('close');
        return false;
      });
  return false;
};*/
