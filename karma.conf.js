// Karma configuration
export default function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'webpack'],

    // list of files / patterns to load in the browser
    files: [
      // Load Chess.js mock first
      { pattern: 'test/chess-mock.js', served: true, included: true },
      // Load setup file next
      { pattern: 'test/karma-setup.js', type: 'module' },
      // Load source files
      { pattern: 'scripts/**/*.js', type: 'module' },
      // Load test files
      { pattern: 'test/**/*.karma.test.js', type: 'module' }
    ],

    // list of files / patterns to exclude
    exclude: [
      'node_modules'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/chess-mock.js': ['webpack'],
      'test/karma-setup.js': ['webpack'],
      'scripts/**/*.js': ['webpack'],
      'test/**/*.karma.test.js': ['webpack']
    },

    // webpack configuration
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
      },
      resolve: {
        extensions: ['.js']
      }
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    // Increase timeout for slow tests
    browserNoActivityTimeout: 60000,

    // Configure client options
    client: {
      clearContext: true, // clear the context window
      jasmine: {
        // Jasmine configuration options
        timeoutInterval: 10000
      }
    }
  });
};
