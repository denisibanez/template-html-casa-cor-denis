$(document).ready(function() {
    slugTemplateName("template_name", "template_slug");
    templateTab();
    templateType();
    indentAreas();
    insetCodeBox();
    sideBarView();
    abrilTemplateExtension();
    // Ace code editor.
    initAce("html");
});

// Slug Template Name
slugTemplateName = function(title, slug) {
  $("."+title).blur(function(){
    if (!$("."+slug).val()) {
      var slugged = slugGeneretorTemplate($(this).val());
      $("."+slug).val(slugged);
    }
  });
  $("."+slug).blur(function(){
    if ($(this).val()) {
      var autoslug = slugGeneretorTemplate($(this).val());
      $(this).val(autoslug);
    }
  });
}

// Slug Generator for Template
slugGeneretorTemplate = function(title){
  var slug = title.toLowerCase()
    .replace(/[áàâã]+/g, 'a').replace(/[éèê]+/g, 'e')
    .replace(/[íìî]+/g, 'i').replace(/[óòôõ]+/g, 'o')
    .replace(/[úùûü]+/g, 'u').replace(/[ç]+/g, 'c')
    .replace(/^\s+|\s+$/g, "").replace(/[|\s]+/g, "_")
    .replace(/[^a-z0-9-:_]+/g, "").replace(/[_]+/g, "_")
    .replace(/^_+|_+$/g, "");
  return slug;
}

// Combo template type
templateType = function(){
  if($("#abril_template_template_type").val() == 'partial' || $("#abril_template_template_type").val() == 'box') {
      $('#areas_field_box :checkbox').each(function(){
        $(this).attr('checked', false);
        $(this).attr('disabled', true);
      });
    }
  $('#abril_template_template_type').change(function(){
    if($(this).val() == 'partial' || $(this).val() == 'box') {
      $('#areas_field_box :checkbox').each(function(){
        $(this).attr('checked', false);
        $(this).attr('disabled', true);
      });
    } else {
      $('#areas_field_box :checkbox').each(function(){
        $(this).attr('disabled', false);
      });
    }
  });
}

abrilTemplateExtensionValidation = function(option){
  if(option.val() == "js.rjs" || option.val() == "xml.rxml" || option.val() == "atom.builder"){
    $("#abril_template_template_type option").each(function(){
      if($(this).val() != "view"){
        $(this).attr("disabled", true)
      }
      $($("#abril_template_template_type option[value=view]")[0]).attr("selected", true)
    })
  }else{
    $("#abril_template_template_type option").each(function(){
      $(this).attr("disabled", false)
    });
  }
}
abrilTemplateExtensionType = function(){
  if($("#abril_template_template_type").val() != "view"){
    $("#abril_template_extension option").each(function(){
      if($(this).val() != "erb" && $(this).val() != "haml"){
        $(this).attr("disabled", true)
      }
      if($("#abril_template_extension option:selected").val() != "haml"){
        $($("#abril_template_extension option[value=erb]")[0]).attr("selected", true)  
      }
    })
  }else{
    $("#abril_template_extension option").each(function(){
      $(this).attr("disabled", false);
    })
  }
}
abrilTemplateExtension = function(){
  $("#abril_template_template_type").change(function(){
    abrilTemplateExtensionType();
  })
  $("#abril_template_extension").each(function(){
    abrilTemplateExtensionValidation($(this))
  })
  $("#abril_template_extension").change(function(){
    abrilTemplateExtensionValidation($(this))
  })
}

// Template tab for Upload and Code
templateTab = function(){
  // MultiFile
  $('.multi').MultiFile();
  // Tab
  $('.tab .code').click(function(e){
      e.preventDefault();
      if ($('.MultiFile-remove').size() > 0){
        if ( confirm($('.tab .code').attr('confirm')) == false) { return false }
      }
      $(this).addClass('active');
      $('.tab .upload').removeClass('active');
      $('.Codepress-body').show().attr('disabled', false);
      $('.MultiFile-box').hide();
      $('.multi').MultiFile('reset');
      $('.insert').show();
  });
  $('.tab .upload').click(function(e){
    e.preventDefault();
    $(this).addClass('active');
    $('.tab .code').removeClass('active');
    $('.Codepress-body').hide().attr('disabled', true);
    $('.MultiFile-box').show();
    $('.insert').hide();
  });
}
// Indent Areas
indentAreas = function(){
  $('.area').each(function(){
    var child = $(this).attr('title').split('/');
    if (child.length > 2) {
      var pad = 15 * (child.length - 2)
      $(this).css('padding-left', pad+'px')
    }
  });
}

// SideBar View
sideBarView = function(){
  $('.toggle_view').toggle(function(e){
    e.preventDefault();
    $(this).text('»').nextAll().hide();
    $('.side_bar').removeClass('p30').addClass('p1');
    $('.side_content').css('width', '95%');
  }, function(e){
    e.preventDefault();
    $('.side_bar').removeClass('p1').addClass('p30');
    $('.side_content').css('width', '67%');
    $(this).text('«').nextAll().show('fast');
  })
}

// Inser Code Box
insetCodeBox = function(){
  $('.insert, .insert_code').hover(function(){
    $('.insert_code').show();
    $('.insert').addClass('active');
  }, function(){
    $('.insert_code').hide();
    $('.insert').removeClass('active');
  });
  $('.insert_box').click(function(e){
    e.preventDefault();
    var html = template_body.getCode();
    template_body.edit('<%= render_bloco("'+ $(this).attr("title") +'"); %>' + html, 'html');
  });
  $("form").submit(function() {
    if (template_body.toggleEditor)
      template_body.toggleEditor();
  });
}

