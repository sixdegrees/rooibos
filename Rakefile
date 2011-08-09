require "rake"

task :build do
  `jim bundle && jim compress`
end

namespace :js do
  task :update do
    `jim install http://www.modernizr.com/downloads/modernizr-latest.js modernizr 2.0.6`
    `jim install http://documentcloud.github.com/underscore/underscore.js underscore 1.1.7`
    `jim install http://documentcloud.github.com/backbone/backbone.js backbone 0.5.2`
    `jim install http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js jquery 1.6.2`
    `jim install http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.7/jquery-ui.js jquery.ui 1.8.7`
    `jim install http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.10/jquery-ui.js jquery.ui 1.8.10`
    `jim install https://github.com/jquery/jquery-ui/raw/master/ui/jquery.ui.menu.js jquery.ui.menu 1.9pre`
    `jim install http://plugins.jquery.com/files/jquery.metadata.2.1.zip jquery.metadata 2.1`
    `jim install https://github.com/pixelmatrix/uniform/raw/master/jquery.uniform.js jquery.uniform 1.7.5`
    `jim install https://github.com/cowboy/jquery-hashchange/raw/v1.3/jquery.ba-hashchange.js jquery.hashchange 1.3`
  end
end