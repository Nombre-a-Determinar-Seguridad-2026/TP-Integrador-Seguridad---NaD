import { NextRequest, NextResponse } from 'next/server'
import { AddMessageHandler, AddMessageCommand } from '@/application/command/AddMessageHandler'
import { PromptInjectionFilter } from '@/application/PromptInjectionsMesures/ValidacionYSatinizacion'

const filter = new PromptInjectionFilter()

const addMessageCommandHandler = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const body = await request.json()

        if (typeof body?.message !== 'string') {
            return NextResponse.json({ error: 'El campo message es obligatorio.' }, { status: 400 })
        }

        const trimmedMessage = body.message.trim()
        if (trimmedMessage.length === 0) {
            return NextResponse.json({ error: 'El mensaje no puede estar vacío.' }, { status: 400 })
        }

        // validate and sanitize; will throw on suspicious content
        let safeMessage: string
        try {
            safeMessage = filter.validateAndSanitize(trimmedMessage)
        } catch (err: any) {
            return NextResponse.json({ error: err.message }, { status: 400 })
        }

        const safeCommand: AddMessageCommand = {
            message: safeMessage,
        }

        const handler = new AddMessageHandler()
        const response = await handler.handle(safeCommand)

        return NextResponse.json(response)
    } catch (error: any) {
        console.error('Error procesando el mensaje:', error)

        return NextResponse.json(
            { error: 'Ocurrió un error al procesar la solicitud' },
            { status: 500 }
        )
    }
}

export const POST = addMessageCommandHandler