requirejs.config({
    baseUrl: '/js',
    waitSeconds: 0,
    paths: {
        app: './app',
        storage: './tools/storage',
        utils: './tools/utils',
        constants: './constants',
        localization: './tools/localization',
        navigator: './tools/navigator',
        bindings: './tools/bindings',

        //json: '../vendor/js/json2',
        text: '../vendor/js/text',        
        async: '../vendor/js/async',
        font: '../vendor/js/font',
        goog: '../vendor/js/goog',
        image: '../vendor/js/image',
        json: '../vendor/js/json',
        noext: '../vendor/js/noext',
        mdown: '../vendor/js/mdown',
        propertyParser : '../vendor/js/propertyParser',
        markdownConverter : '../vendor/js/Markdown.Converter',
        
        
        underscore: '../vendor/js/underscore',
        knockout: '../vendor/js/knockout-3.4.0',
        jquery: '../vendor/js/jquery-2.1.4',
        'jquery.cookie': '../vendor/js/jquery.cookie',
        purl: '../vendor/js/purl',
        amplify: '../vendor/js/amplify',
        sammy: '../vendor/js/sammy',
        moment: '../vendor/js/moment-with-locales',
        angular: '../vendor/js/angular',
        responsejs: '../vendor/js/response',

        components: './components',
    },
    shim: {
        underscore: {
            exports: '_'
        },

        amplify: {
            deps: ['jquery']
        },
        jquery: {
            exports: '$'
        },
        app: {
            deps: ['components/main', 'navigator', 'bindings']
        },
        'jquery.cookie': {
            deps: ['jquery']
        },
        sammy: {
            deps: ['jquery']
        },
        responsejs: {
            deps: ['jquery']
        }
    },
    bundles: {
    }
});

requirejs(['app']);