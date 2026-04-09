# Secure Campus IA 🎓🤖

Bienvenido al repositorio de **Secure Campus IA**. Este proyecto es una aplicación web moderna desarrollada con Next.js que implementa una interfaz de chat con Inteligencia Artificial.

Está diseñada con un enfoque _mobile-first_ para que se sienta como una aplicación nativa (sin scroll global, solo en el área de mensajes) y cuenta con un diseño limpio utilizando Tailwind CSS.

---

Seguridad agregada, Entrega 1:

Autenticación:
   Solo es posible acceder al chat y la lista de estudiantes si se utiliza un usuario registrado.
Autorización:
   Los visibilidad de los alumnos de la lista depende del rol y catedra de un usuario. 
   Un usuario recive el rol de estudiante al ser creado.
Elementos sensibles:
   Los elementos sensibles del código, como lo son la API_KEY y otros datos de la seguridad se encuentran en un .env, fuera del código y la página.

Todo esto se logro mediante la integración con la herramienta Auth0.
*Las catedras se encuentran hardcodeadas a usuarios especificos, y que no se considero correcto implementarlas en el sistema general dentro del alcance de lo pedido.
Se planea implementar junto con otras carcteristicas de usuario una vez se modifique la lista para funcionar con datos de usuarios reales en lugar elementos hardcodeados. 
