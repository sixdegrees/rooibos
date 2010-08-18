var Layout, RootController, Sidebar, app;
Layout = {
  getWindow: function() {
    return this.window = (typeof this.window !== "undefined" && this.window !== null) ? this.window : $("<div id='application' class='vbox'/>");
  },
  getToolbar: function() {
    return this.toolbar = (typeof this.toolbar !== "undefined" && this.toolbar !== null) ? this.toolbar : $("<div class='toolbar'/>");
  },
  getContainer: function() {
    return this.container = (typeof this.container !== "undefined" && this.container !== null) ? this.container : $("<div class='container hbox flex'/>");
  },
  getSidebar: function() {
    return this.sidebar = (typeof this.sidebar !== "undefined" && this.sidebar !== null) ? this.sidebar : $("<div class='sidebar'/>");
  },
  getContent: function() {
    return this.content = (typeof this.content !== "undefined" && this.content !== null) ? this.content : $("<div class='content flex'/>");
  },
  display: function() {
    this.getContainer().append(this.getSidebar()).append(this.getContent());
    this.getWindow().append(this.getToolbar()).append(this.getContainer());
    $("body").append(this.getWindow());
    return reflow();
  }
};
Sidebar = {
  getNavBar: function() {
    return this.navbar = (typeof this.navbar !== "undefined" && this.navbar !== null) ? this.navbar : $.create("navbar").append("<h3 class='txtC'>Demos</h3>");
  },
  getOutline: function() {
    return this.outline = (typeof this.outline !== "undefined" && this.outline !== null) ? this.outline : $.create("outline", [
      {
        name: "Buttons",
        items: [
          {
            name: "Default",
            href: "#/test"
          }
        ]
      }
    ]);
  },
  display: function() {
    Layout.getSidebar().append(this.getNavBar()).append(this.getOutline());
    return reflow();
  }
};
RootController = function(app) {
  this.get("#/", function() {
    return Sidebar.display();
  });
  return this.get("#/test", function() {
    Sidebar.display();
    return console.log("test");
  });
};
app = $.sammy(function() {
  return this.use(RootController);
});
$(function() {
  Layout.display();
  return app.run("#/");
});