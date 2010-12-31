require "rake"

task :build do
  `jim bundle && jim compress`
end

namespace :js do
  task :update do
    `jim install http://www.modernizr.com/downloadfulljs/ modernizr 1.6`
    `jim install http://documentcloud.github.com/underscore/underscore.js underscore 1.1.3`
    `jim install http://documentcloud.github.com/backbone/backbone.js backbone 0.3.3`
    `jim install http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.js jquery 1.4.4`
    `jim install http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/jquery-ui.js jquery.ui 1.8.7`
    `jim install https://github.com/jquery/jquery-ui/raw/menu/ui/jquery.ui.menu.js jquery.ui.menu 1.9pre`
    `jim install http://plugins.jquery.com/files/jquery.metadata.2.1.zip jquery.metadata 2.1`
    `jim install https://github.com/pixelmatrix/uniform/raw/master/jquery.uniform.js jquery.uniform 1.5`
    `jim install https://github.com/cowboy/jquery-hashchange/raw/v1.3/jquery.ba-hashchange.js jquery.hashchange 1.3`
  end
end