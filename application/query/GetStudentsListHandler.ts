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
];

export class GetStudentsListHandler {

    async handle(command: GetStudentsListQuery): Promise<GetStudentsListResponse> {
        const response = HARDCODED_LIST.map(student => ({
            id: student.id,
            name: student.name,
            email: student.email,
            active: student.active,
            catedra: student.catedra,
        }))

        return { list: response }
    }
}

export interface GetStudentsListQuery {
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