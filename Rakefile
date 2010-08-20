require "rake"
require "rest_client"

task :build do
  `sprocketize js/rooibos.js > build/js/rooibos.js`
  # `sprocketize js/rooibos-ie.js > build/js/rooibos-ie.js`
end

task :compile do
  js = RestClient.post("http://closure-compiler.appspot.com/compile", :js_code => File.read("build/js/rooibos.js"), :compilation_level => "SIMPLE_OPTIMIZATIONS", :output_format => "text", :output_info => "compiled_code")
  File.open("build/js/rooibos.js", "w+") { |f| f.puts js }
end