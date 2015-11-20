// Karma configuration
// Generated on Thu Nov 19 2015 20:55:08 GMT+0900 (JST)

module.exports = function(config) {
  config.set({
    frameworks: ['browserify', 'mocha'],
    files: [
      'test/**/*.js'
    ],
    preprocessors: {
      'test/*.js': 'browserify'
    },
    plugins: [
      'karma-phantomjs-launcher',
      'karma-browserify',
      'karma-mocha'
    ],
    browserify: {
      debug: true,
      extension: ['.js'],
      transform: [
        require('babelify').configure({
          presets: ['es2015'],
          plugins: ['babel-plugin-espower']
        })
      ]
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true
  })
}
