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
    outline: (data, opts) ->
      html = Mustache.to_html("
      {{#sections}}
        <h3><a href='#'>{{name}}</a></h3>
        <div>
          <ul>
          {{#items}}
            <li><a href='{{href}}'>{{name}}</a></li>
          {{/items}}
          </ul>
        </div>
      {{/sections}}", data)
      $("<div class='outline'></div>").append(html).outline(opts)
  }
})