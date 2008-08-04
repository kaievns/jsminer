#
# Some tasks for the rake util
#
# Copyright (C) 2008 Nikolay V. Nemshilov aka St. <nemshilov-gmail-com>
#

require 'rake'
require 'fileutils'
require 'lib/front_compiler'

JSMINER_BUILD_DIR       = 'build'
JSMINER_BUILD_FILE      = 'javascripts/jsminer.js'
JSMINER_STYLE_FILE      = 'stylesheets/jsminer.css'

JSMINER_JS_SOURCES = %w[
  jsminer.js
  jsminer/options.js
  jsminer/cell.js
  jsminer/game.js
  jsminer/ui.js
]

JSMINER_CSS_SOURCES = %w[
  style.css
]

JSMINER_IMAGES = %w[
  16/
  24/
  32/
  face-active.png
  face-crying.png
  face-sleepy.png
  face-smiley.png
]

task :default => :build

task :build do
  FileUtils.rm_rf JSMINER_BUILD_DIR
  puts " * Creating the build-dir"
  Dir.mkdir JSMINER_BUILD_DIR 
  Dir.mkdir JSMINER_BUILD_DIR + '/javascripts'
  
  puts " * Copying mootools"
  FileUtils.cp 'lib/mootools.js', "#{JSMINER_BUILD_DIR}/javascripts"
  
  puts " * Compiling the source code"
  File.open(JSMINER_BUILD_DIR + '/' + JSMINER_BUILD_FILE, 'w') do |file|
    file.write File.open("src/HEADER.js").read
    
    JSMINER_JS_SOURCES.each do |filename|
      #file.write File.open("src/#{filename}").read
      file.write FrontCompiler.compact_js("src/#{filename}")
    end
  end
  
  puts " * Moving styles"
  Dir.mkdir JSMINER_BUILD_DIR + '/stylesheets'
  
  File.open("#{JSMINER_BUILD_DIR}/#{JSMINER_STYLE_FILE}", 'w') do |file|
    file.write File.open("css/HEADER.css").read
    
    JSMINER_CSS_SOURCES.each do |filename|
      file.write FrontCompiler.compact_css("css/#{filename}").gsub('../img/', '../images/jsminer/')
    end
  end
  
  FileUtils.cp "css/demo.css", "#{JSMINER_BUILD_DIR}/stylesheets"
  
  puts " * Copying images"
  Dir.mkdir JSMINER_BUILD_DIR + '/images'
  Dir.mkdir JSMINER_BUILD_DIR + '/images/jsminer'
  
  JSMINER_IMAGES.each do |file|
    FileUtils.cp_r "img/#{file}", "#{JSMINER_BUILD_DIR}/images/jsminer"
  end
  
  puts " * Building the index.html file"
  File.open("#{JSMINER_BUILD_DIR}/index.html", "w") do |file|
    file.write File.open("test/build_demo.html").read.gsub('../build/', '');
  end
end