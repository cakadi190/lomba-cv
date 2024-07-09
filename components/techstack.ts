const jqueryBootstrap = [
  "devicon:jquery",
  "devicon:bootstrap",
];

const reactjs = [
  "devicon:react",
  "devicon:javascript",
]

const reactts = [
  "devicon:react",
  "devicon:javascript",
  "devicon:typescript",
]

const reactNative = [
  "devicon:react",
  "devicon:nativescript",
  "devicon:typescript",
  "devicon:javascript",
];

const kotlinJava = [
  "devicon:kotlin",
  "devicon:java",
];

const flutterDart = [
  "devicon:flutter",
  "devicon:dart",
];

const htmlCssJS = [
  "devicon:html5",
  "devicon:css3",
  "devicon:javascript",
];

const vuejs = [
  "devicon:vuejs",
  "devicon:javascript",
];

const vuets = [
  "devicon:vuejs",
  "devicon:typescript",
  "devicon:javascript",
];

const nuxt = [
  "devicon:nuxtjs",
  ...vuejs
];

const tailwind = [
  "devicon:tailwindcss",
  ...htmlCssJS
];

const tailwindAlpine = [
  ...tailwind,
  "devicon:alpinejs",
];

const php = [
  "devicon:php",
];

const laravel = [
  "devicon:laravel",
  ...php
];

const laravelFullstackNonSPABootstrap = [
  ...laravel,
  ...htmlCssJS,
  ...jqueryBootstrap,
];

const laravelFullstackNonSPATailwind = [
  ...laravel,
  ...htmlCssJS,
  ...tailwind
];

const laravelFullstackSpaVueJsBootstrap = [
  ...laravel,
  ...htmlCssJS,
  ...jqueryBootstrap,
  ...vuejs
];

const laravelFullstackSpaVueTsBootstrap = [
  ...laravel,
  ...htmlCssJS,
  ...jqueryBootstrap,
  ...vuets
];

const laravelFullstackSpaReactJsBootstrap = [
  ...laravel,
  ...htmlCssJS,
  ...jqueryBootstrap,
  ...reactjs
];

const laravelFullstackSpaReactTsBootstrap = [
  ...laravel,
  ...htmlCssJS,
  ...jqueryBootstrap,
  ...reactts
];

export {
  jqueryBootstrap,
  htmlCssJS,
  vuejs,
  nuxt,
  tailwind,
  tailwindAlpine,
  php,
  laravel,
  laravelFullstackNonSPABootstrap,
  laravelFullstackNonSPATailwind,
  flutterDart,
  kotlinJava,
  laravelFullstackSpaVueJsBootstrap,
  laravelFullstackSpaVueTsBootstrap,
  laravelFullstackSpaReactJsBootstrap,
  laravelFullstackSpaReactTsBootstrap,
  reactNative,
  reactjs,
  reactts
};