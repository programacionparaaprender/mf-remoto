# Componente1

###
>- ng new componente1
>- ng new componente1 --no-standalone
>- npm install -D @angular-architects/module-federation
>- ng add @angular-architects/module-federation --project mf-remote --port 4201 --type remote
>- ng add @angular-architects/module-federation
>- ng g m components/login
>- ng g component components/login --module=components/login/login.module.ts
>- ng g component components/login

>- ng add @angular-architects/module-federation --project mf-shell --port 4200 --type host
>- ng add @angular-architects/module-federation --project mf-shopping --port 4201 --type remote
>- ng add @angular-architects/module-federation --project mf-payment --port 4202 --type remote

>- ng new mf-shell --style=scss --routing=true
>- ng new mf-payment --style=scss
>- ng new mf-shopping --style=scss --routing=true
>- ng g c components/login -m login.module
>- --port 4200 --type host


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
