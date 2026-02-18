# UNIR_FULLSTACKDEVELOPER_ACTIVIDAD_5
Módulo 3. Framework de Front End Angular. - Actividad:5: Sistema Blogging en Angular.

## 1. Creación del proyecto
Comando para crear un proyecto en Angular:
```bash
ng new BloggingSystem

```

## 2. Creación del componente blog y cargarlo dentro de la aplicación principal

Comando para crear el componente blog:
```bash
ng generate component components/blog --skip-tests
```

Comando para ejecutar el servidor y verificar que el componente se ha cargado en la aplicación principal:

```bash
ng serve -o
```
## 3. Maquetar las áreas dentro del componente con html y css

Primero de todo he creado un diseño con la herramienta "Penopot", para tener un diseño principal y poder maquetar de una forma más eficiente.

![alt text](BlogTemplateDesign.jpg)

Una vez he tenido el prototipo de interfaz de usuario, he construido el diseño de la web con html y css. En esta parte he considerado todos los elementos de los componentes (app y blog), como entidades estáticas. Más adelante se identificarán las partes dinámicas, eventos y propiedades que se gestionarán con typescript.

## 4. Creación del array de datos e inicialización dos noticias dentro de propio array siguiendo el interfaz de datos.

He creado una interfaz typescript, un contrato que define las propiedades que deberá tener cada noticia almacenada.
Se ha creado mediante el siguiente comando de angular:
```bash
ng generate interface interfaces/inews --skip-tests
```

## 5. Pintar los datos del array dentro de la zona del componente correspondiente.
Para pintar de forma automatizada los datos del array de noticias del componente, he utilizado los siguientes bloques de control de flujo: 

```html
@if para mostrar los mensajes de error en caso de que la validación de las entradas no sea correcta.
@for para mostrar las noticias almacenadas en el array de noticias del componente
```


## 6. Recoger los datos de una noticia dentro del formulario y hacer la validación de campos vacíos.

He utilizado:

  * **DATA-BINDING**: en atributos del html como [src]  o [alt] para la visualización de las imágenes.

  * **EVENT-BINDING**: con (ngModelChange) para llamar los métodos de validación en cada entrada.
  Cada entrada se hace responsable de validar su contenido. 
  Para cada cambio en cada entrada se genera un evento gracias al ngModelChange.

  * **TWO-WAY-DATA-BINDING**: con [(ngModel)] para actualizar los valores de las propiedades del componente Blog.

  * **INTERPOLATION**: para mostrar las propiedades de cada notícia como el titulo, el contenido o la fecha de publicación.

<br>

| DATA-BINDING  | EVENT-BINDING    | TWO-WAY-DATA-BINDING |  Interpolation |
| :---          | :---             | :----                | :----   
| [ ]           | ( )              | [ ( ) ]              | { { } }


En las funciones de validación actualizamos los mensajes y el estado de los errores a través de las enums:
```ts
enum ErrorStatus{
  None = 0, // Nos permite detectar el estado inicial de la entrada para que no se muestre error
  True = 1, // Actua como flag de error
  False = 2 // Actua como flag de no error
}

enum ErrorMessages{
  TextField = 'This field is required.',
  ImageUrl = 'Invalid image url.', 
  DateTime = 'Invalid date time format.'
}
```

## 7. Insertar los datos dentro del array y comprobar que se pintan en el listado.
Dentro del componente se ha creado el método createNews() que valida el estado de las entradas con el método validateProperties().

Se ha asociado el evento (click) del elemento button **Create News** para se genere la noticia en caso de que todo esté correcto.