$.extend({
  create: (name, args...) -> this.controls[name](args...)
  
  controls: {
    toolbar: () ->
      $("<div class='toolbar'></div>")
    navbar: () ->
      $("<div class='navbar'></div>")
    vbox: () ->
      $("<div class='vbox'></div>")
    hbox: () ->
      $("<div class='hbox'></div>")
    flexspace: () ->
      $("<div class='flexspace'></div>")
    outline: (sections, opts) ->
      sections = for section in sections
        header = "<h3><a href='#'>#{section.name}</a></h3>"
        items  = for item in section.items
          "<li><a href='#{item.href}'>#{item.name}</a></li>"
        "#{header}<div><ul>#{items.toString()}</ul></div>"
      $("<div class='outline'></div>").append(sections.toString()).outline(opts)
  }
})