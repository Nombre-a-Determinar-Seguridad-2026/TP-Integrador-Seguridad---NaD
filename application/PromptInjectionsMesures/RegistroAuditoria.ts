//Codigo basado en: https://www.datasunrise.com/es/centro-de-conocimiento/seguridad-ia/guia-de-seguridad-ante-inyeccion-de-prompts/
//Aca definimos una interfaz para las entradas del registro de auditoría y una función para registrar interacciones sospechosas o relevantes para la seguridad.

import fs from "fs"
import path from "path"

export interface AuditLogEntry {
    timestamp: string;
    userId: string;
    eventType: string;
    riskLevel: "low" | "medium" | "high";
    promptPreview: string;
    responsePreview: string;
}

const AUDIT_LOG_PATH = path.join(process.cwd(), "audit-suspicious.log")

function writeAuditLog(entry: AuditLogEntry): void {
    try {
        const serialized = JSON.stringify(entry)
        fs.appendFileSync(AUDIT_LOG_PATH, serialized + "\n", { encoding: "utf8" })
    } catch (error) {
        console.error("Unable to write audit log:", error)
    }
}

export function logInteraction(
    userId: string,
    prompt: string,
    result: string,
    riskLevel: "low" | "medium" | "high" = "low"
): void {

    const entry: AuditLogEntry = {
        timestamp: new Date().toISOString(),
        userId,
        eventType: "AI_CHAT_INTERACTION",
        riskLevel,
        promptPreview: prompt.slice(0, 100),
        responsePreview: result.slice(0, 100),
    };

    console.warn("[AUDIT_LOG]", entry);

    if (riskLevel !== "low") {
        writeAuditLog(entry)
    }
}