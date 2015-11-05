$(function() {
  cssFixes();
  searchBehaviour();
  loading();

  jCarouselContainer = $('#subsystem-menu');
  jCarouselContainer.data('jCarouselClickItem', $('#subsystem-menu li.selected'));

  $('#subsystem-menu').jcarousel();
  if (jCarouselContainer.data('jCarouselClickItem') && jCarouselContainer.data('jCarouselClickItem').attr('jcarouselindex') >= 3) {
    $('#subsystem-menu').jcarousel({start: jCarouselContainer.data('jCarouselClickItem').attr('jcarouselindex') + 1});
  }

  if (!$('#brand-select-wrapper').hasClass('single'))
    brandSelectBehaviour();
});

var cssFixes = function() {
  if ($.browser.mozilla) {
    $('#body-wrapper').addClass('-moz');
  } else if ($.browser.webkit) {
    $('#body-wrapper').addClass('-webkit');
  } else if ($.browser.msie && $.browser.version < 8) {
    $('#body-wrapper').addClass('-msie7');
  } else if ($.browser.msie && $.browser.version >= 8) {
    $('#body-wrapper').addClass('-msie8');
  }
};

var searchBehaviour = function() {
  var message = $('.keyword').attr('rel');
  var from = $('.datepicker.from').attr('rel');
  var at = $('.datepicker.at').attr('rel');
  $('.form-search').submit(function() {
    if ($('.keyword').val() == message) {
      $('.keyword').val('');
    };
    $('.datepicker').each(function(e) {
      if ($(this).val() == from || $(this).val() == at) {
        $(this).val('');
      }
    });
  });
}

var loading = function(){
  $('#loading').hide().ajaxStart(function(){
    $(this).show();
  }).ajaxStop(function(){
    $(this).hide();
  });
}

var brandSelectBehaviour = function(){
  $('#brand-selected').click(function(e){
    e.preventDefault();
    $('#brand-select').toggle();
  });
}

/* Plugin wordCount */
$.fn.wordCount = function (limit, block) {

  var element = $(this),
      limitChars = function (limit, block) {
        var text = (element.val() || ""),
            textlength = text.length,
            fieldItemWrapper = element.closest('.field-item-wrapper'),
            countElement = fieldItemWrapper.find(".count");
        if (textlength > limit) {
          fieldItemWrapper.addClass('limit');
          if (block) {
            element.val(text.substr(0, limit));
            textlength = limit;
          }
        } else {
          fieldItemWrapper.removeClass('limit');
        }
        countElement.text(textlength);
      };

  element.bind('keypress keyup', function() {
    limitChars(limit, block);
  });

  limitChars(limit, block);
};


var customConfirm = function (question, onYes, onNo) {
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
};