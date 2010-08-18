Layout = {
  getWindow: -> @window ?= $("<div id='application' class='vbox'/>")
  getToolbar: -> @toolbar ?= $("<div class='toolbar'/>")
  getContainer: -> @container ?= $("<div class='container hbox flex'/>")
  getSidebar: -> @sidebar ?= $("<div class='sidebar'/>")
  getContent: -> @content ?= $("<div class='content flex'/>")
  
  display: ->
    this.getContainer().append(this.getSidebar()).append(this.getContent())
    this.getWindow().append(this.getToolbar()).append(this.getContainer())
    $("body").append(this.getWindow())
    reflow()
}

Sidebar = {
  getNavBar: -> @navbar ?= $.create("navbar").append("<h3 class='txtC'>Demos</h3>")
  getOutline: ->
    @outline ?= $.create("outline", [
      { name: "Buttons", items: [{ name: "Default", href: "#/test" }] }
    ])
  display: ->
    Layout.getSidebar().append(this.getNavBar()).append(this.getOutline())
    reflow()
}

RootController = (app) ->
  this.get "#/", ->
    Sidebar.display() # if user is a superadmin
  this.get "#/test", ->
    Sidebar.display()
    console.log("test")

app = $.sammy () ->
  this.use(RootController)

$ () ->
  Layout.display()
  app.run("#/")