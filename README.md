# Componente1

###
>- ng new componente1
>- ng new componente1 --no-standalone
>- npm install -D @angular-architects/module-federation
>- ng add @angular-architects/module-federation --project mf-remoto --port 4201 --type remote
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


### comandos aws s3
>- Cuenta IAM agregarle
>- agregar politica directamente AmazonS3ReadOnlyAccess IAM 
>- agregar politica directamente AmazonS3FullAccess IAM 
>- aws s3 ls --profile myprofile 
>- aws sts get-caller-identity 
>- aws s3 sync dist/ s3://mf-remoto --acl public-read 
>- aws s3 sync dist/ s3://mf-remoto 
>- aws s3 ls s3://mf-remoto 
>- aws s3 ls s3://tu-bucket --recursive | grep index.html 
>- aws s3 cp dist/mf-remoto/index.html s3://mf-remoto/index.html 
>- aws s3 sync dist/mf-remoto/ s3://mf-remoto
Configurar cors en permisos 
[ 
  { 
    "AllowedHeaders": ["*"], 
    "AllowedMethods": ["GET"], 
    "AllowedOrigins": ["*"], 
    "ExposeHeaders": [] 
  } 
] 
>- aws s3 sync dist/ s3://mf-principal 
>- ng build --output-path=dist/mf-principal/ --base-href / 
>- aws s3 sync dist/mf-principal/ s3://mf-principal 
>- aws s3 cp dist/mf-principal/index.html s3://mf-principal/index.html 

### Despliegue de microfrontend en bucket compartido
>- aws s3 sync dist/mf-remoto s3://mf-host-and-remote/mf-remoto

### cursos 
>- https://udemy.com/course/sonarqube
>- https://udemy.com/course/angular-jasmine-karma
>- https://udemy.com/course/angular-jasmine-karma/learn/lecture/25126866#overview
>- https://www.udemy.com/course/angular-introduccion-a-pruebas-unitarias-y-tdd-en-espanol/learn/lecture/21281168#overview

### habilitar el coverage
https://www.tutorialspoint.com/angular_cli/angular_cli_code_coverage.htm


### realizar publicación en apache tomcat o rethad 7.2 EAP
1 con powershell node .\node_modules\@angular\cli\bin\ng build --base-href="/angularroure/" --output-path="tomcat_publish/salida" 
2 abrir la carpeta salida ruta frontend/tomcat_publish/
3 copiar la carpeta WEB-INF dentro de salida ruta frontend/tomcat_publish/salida/
4 dentro de frontend/tomcat_publish/salida gitbash(unix, linux) si usas java 7 'C:\Program Files\Java\jdk1.7.0_80\bin\jar.exe' cvf angularroute.war *
5 copiar angularroute.war y pegar en otra ruta para que no se borre, se encuentra en frontend/tomcat_publish/salida/
