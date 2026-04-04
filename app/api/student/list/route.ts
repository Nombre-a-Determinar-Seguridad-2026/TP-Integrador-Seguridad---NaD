import { NextRequest, NextResponse } from 'next/server'
import { auth0 } from '@/app/lib/auth0.js'
import { GetStudentsListHandler, GetStudentsListQuery } from '@/application/query/GetStudentsListHandler'

const getStudentsListQueryHandler = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const session = await auth0.getSession()
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }
        console.log('User session:', JSON.stringify(session.user, null, 2))
        const userRole = session.user.role
        const userCatedra = 'Seguridad' //Agregar catedra a los usuario (de alguna forma)

        const handler = new GetStudentsListHandler()
        
        const query: GetStudentsListQuery = { userRole, userCatedra }
        const response = await handler.handle(query)

        return NextResponse.json(response)
    } catch (error) {
        console.error("Error procesando el mensaje:", error)
        return NextResponse.json(
            { error: "Ocurrió un error al procesar la solicitud" },
            { status: 500 }
        )
    }
}

export const GET = getStudentsListQueryHandler
