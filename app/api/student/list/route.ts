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
        //const userRole = session.user.role
        const userId = session.user.sub

        const tokenResponse = await fetch(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: process.env.AUTH0_CLIENT_ID!,
            client_secret: process.env.AUTH0_CLIENT_SECRET!,
            audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`
        })
        });
        const tokenData = await tokenResponse.json();
        const mgmtToken = tokenData.access_token;

        /**const rolesResponse = await fetch(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${session.user.user_id}/roles`, {
        headers: { Authorization: `Bearer ${mgmtToken}`, Accept: 'application/json' }
        });*/
        const rolesResponse = await fetch(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${userId}/roles`, {
        headers: { Authorization: `Bearer ${mgmtToken}`, Accept: 'application/json' }
        });
        if (!rolesResponse.ok) {
        const errorData = await rolesResponse.text();
        console.error("Error de Auth0 Management API:", errorData);
        throw new Error("No se pudieron obtener los roles del usuario");
        }
        const rolesData = await rolesResponse.json();
        console.log('Roles raw data:', rolesData);
        const userRole = rolesData.length > 0 ? rolesData[0].name : 'Estudiante';
        
        const handler = new GetStudentsListHandler()

        const query: GetStudentsListQuery = { userRole, userId }
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