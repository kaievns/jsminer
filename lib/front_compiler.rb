#
# This is a simple front-side code source compiller
# to organise all the source code in a compact single file
#
# Copyright (C) 2008 Nikolay V. Nemshilov aka St. <nemshilov-gmail-com>
#
class FrontCompiler
  class << self
    # compacts javascript source from the given file
    def compact_js(file_name, options={})
      source = File.open(file_name).read
      source.gsub! /\/\/.*?$/m, ''
      source.gsub! /\/\*.*?\*\//m, ''
      source.gsub! /\n\s*\n/im, "\n"
      source.gsub! /\n\s*/im, "\n"
      source.gsub! /\s*(=|\+|\-|<|>|\?|\|\||&&|\!|\{|\}|,|\)|\(|;|\]|\[|:|\*)\s*/im, '\1'
      
      source
    end
    
    # compacts css-source from the given file
    def compact_css(file_name)
      source = File.open(file_name).read
      source.gsub! /\/\*.*?\*\//m, ''
      source.gsub! /\n\s*\n/im, "\n"
      source.gsub! /\n\s*/im, "\n"
      source.gsub! /\s*(\{|\)|\(|;|,|:)\s*/im, '\1'
      
      source
    end
  end
end