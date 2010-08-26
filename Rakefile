require "rake"

task :build do
  `jim bundle && jim compress`
end

namespace :js do
  task :update do
    `jim install http://www.modernizr.com/downloadfulljs/ modernizr 1.5`
    `jim install http://github.com/janl/mustache.js/raw/0.3.0/mustache.js mustache 0.3.0`
    `jim install http://documentcloud.github.com/underscore/underscore.js underscore 1.1`
    `jim install http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.js jquery 1.4.2`
    `jim install http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/jquery-ui.js jquery.ui 1.8.4`
    `jim install http://github.com/jquery/jquery-ui/raw/menu/ui/jquery.ui.menu.js jquery.ui.menu 1.9pre`
    `jim install http://plugins.jquery.com/files/flexify-1.1-uncompressed.js.txt jquery.flexify 1.1`
    `jim install http://plugins.jquery.com/files/jquery.metadata.2.1.zip jquery.metadata 2.1`
    `jim install http://github.com/pixelmatrix/uniform/zipball/master jquery.uniform 1.5`
    `jim install http://github.com/cowboy/jquery-hashchange/raw/v1.3/jquery.ba-hashchange.js jquery.hashchange 1.3`
    `jim install http://github.com/quirkey/sammy/raw/master/lib/sammy.js sammy 0.6.0pre`
    `jim install http://github.com/quirkey/sammy/raw/master/lib/plugins/sammy.template.js sammy.template 0.6.0pre`
    `jim install http://github.com/benpickles/js-model/raw/master/dist/js-model-0.8.4.js js-model 0.8.4`
  end
end