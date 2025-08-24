Pod::Spec.new do |s|
  s.name         = "FeedView"
  s.version      = "0.1.0"
  s.summary      = "FeedView native module for PlayPods (placeholder)"
  s.homepage     = ""
  s.license      = { :type => "MIT" }
  s.author       = { "PlayPods" => "" }
  s.source       = { :path => '.' }
  s.platform     = :ios, '12.0'
  s.source_files  = 'native-modules/FeedView/ios/**/*.{h,m,mm,swift}'
  s.dependency 'React'
end
