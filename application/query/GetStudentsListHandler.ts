const HARDCODED_LIST = [
    { id: 1, name: 'Juan Pérez', email: 'juan.perez@example.com', active: true, catedra:"Seguridad"},
    { id: 2, name: 'María Gómez', email: 'maria.gomez@example.com', active: true, catedra:"Gestión" },
    { id: 3, name: 'Carlos López', email: 'carlos.lopez@example.com', active: true, catedra:"Seguridad" },
    { id: 4, name: 'Ana Martínez', email: 'ana.martinez@example.com', active: true, catedra:"Gestión" },
    { id: 5, name: 'Luis Fernández', email: 'luis.fernandez@example.com', active: true, catedra:"Seguridad" },
    { id: 6, name: 'Sofía Ramírez', email: 'sofia.ramirez@example.com', active: true, catedra:"Gestión" },
    { id: 7, name: 'Diego Torres', email: 'diego.torres@example.com', active: true, catedra:"Seguridad" },
    { id: 8, name: 'Valentina Ruiz', email: 'valentina.ruiz@example.com', active: true, catedra:"Gestión" },
    { id: 9, name: 'Pedro Sánchez', email: 'pedro.sanchez@example.com', active: true, catedra:"Seguridad" },
    { id: 10, name: 'Lucía Herrera', email: 'lucia.herrera@example.com', active: true, catedra:"Gestión" },
    { id: 11, name: 'Miguel Castro', email: 'miguel.castro@example.com', active: true, catedra:"Gestión" },
    { id: 12, name: 'Camila Ortiz', email: 'camila.ortiz@example.com', active: true, catedra:"Seguridad" },
    { id: 13, name: 'Jorge Díaz', email: 'jorge.diaz@example.com', active: true, catedra:"Seguridad" },
    { id: 14, name: 'Paula Morales', email: 'paula.morales@example.com', active: true, catedra:"Gestión" },
    { id: 15, name: 'Andrés Vega', email: 'andres.vega@example.com', active: true, catedra:"Seguridad" },
    { id: 16, name: 'Andrés Pascal', email: 'andres.vega@example.com', active: true, catedra:"Redes" },
];

// no sé qué tan delicados son estos datos
// lo hacemos rápido así por temas de testing
const HARDCODED_CATEDRAS = [ //la id es la del usuario (userID)
    { id: "auth0|69ce7e407f2321b8983b4fe0", catedra:"Seguridad"}, // correofalso123@gmail.com
    { id: "auth0|69ce84ddb150e9e8d9612f7c", catedra:"Gestión"}, // elmascapo@admin.com
    { id: "auth0|69ce753bb150e9e8d9611bfe", catedra:"Redes"}, // falsorefalso@fakemail.com
    { id: "auth0|69ce753bb150e9e8d9611bfe", catedra:"Gestión"}, // falsorefalso@fakemail.com
];


// estaEnCatedra(userID, catedraAlumno)
// función que devuelva verdadero si existe el usuario en enhardcoded_catedras, 
// filtrado para la cátedra del ieismo alumno que se está planteando mostrar.
function estaEnCatedra(idUsuario: string, catedraAlumno: string){
    let listaFiltrada = (HARDCODED_CATEDRAS
        .filter(alumno => (alumno.catedra === catedraAlumno)))
        .filter(usuario => usuario.id === idUsuario)
    return (listaFiltrada.length > 0);
}

export class GetStudentsListHandler {
    async handle(query: GetStudentsListQuery): Promise<GetStudentsListResponse> {
        let listaEstudiantes = HARDCODED_LIST
        if (query.userRole !== 'Admin') {
            listaEstudiantes = listaEstudiantes
            .filter(estudiante => estaEnCatedra(query.userId, estudiante.catedra))
        }

        const response = listaEstudiantes.map(estudiante => ({
            id: estudiante.id,
            name: estudiante.name,
            email: estudiante.email,
            active: estudiante.active,
            catedra: estudiante.catedra,
        }));

        return { list: response };
    }
}

export interface GetStudentsListQuery {
    userRole?: string
    userId: string
}

export interface GetStudentsListResponse {
    list: Student[]
}

export interface Student {
    id: number
    name: string
    email: string
    active: boolean
    catedra: string
}