# PantyExpress Website
#### Branch build status:
Development: [![Build Status](https://snap-ci.com/1GTlvAbHsa6VKzS_bib9k5sH1r4Mfr3yu4YYpw0JZNY/build_image)](https://snap-ci.com/justonian/pantryexpress-web/branch/development)  
Master:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[![Build Status](https://snap-ci.com/J3xl57Pyi-W4qdGVdp3H5eEttub9_3N2AfZmZiAkges/build_image)](https://snap-ci.com/justonian/pantryexpress-web/branch/master)

## Installation
This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.15.0.

Make sure to have python 2.7 (not python 3) installed.

Run ```npm install -g yo generator-angular@0.15.0 generator-karma bower grunt-cli```

Run `npm install ` for installing repository-specific npm modules.

Run `bower install` for installing bower specific packages.

## Build & development

Run `grunt` for building and `grunt serve` for live preview.

The default branch is development.
Make sure `grunt` successfully passes before doing a git push

## Testing

Running `grunt test` will run the unit tests with karma.

## Generating new Angular website components

Refer to https://github.com/yeoman/generator-angular for how to use the Yeoman Angular generator.

## Routing
For Routing we have two different style
  1. Angular Routing: These are the overall root routes that get configured with Yoeman. We have 4 mains ones: household, login, signup and Main
      Each one of these Routes loads a default page that has tempaltes inside of it. These templates get loaded inside of the individual controllers. 
  2. Subrouting based parameter: These routign is currenrtlty only on the household controller, but w if there is a parameter after household we look to see if there is a match, if there is we swap the  temple. 
      Ex: /household/find will load the template viewhoushold.html inside of the houshold.html
