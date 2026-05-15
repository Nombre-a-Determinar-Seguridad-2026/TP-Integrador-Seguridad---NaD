import { distance } from "fastest-levenshtein";

//Libreria string-similarity: npm install fastest-levenshtein
//Código basado en de: https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html


export class PromptInjectionFilter {
  private dangerousPatterns: RegExp[];
  private fuzzyPatterns: string[];

  constructor() {
    this.dangerousPatterns = [
      /ignore\s+(all\s+)?previous\s+instructions?/i,
      /you\s+are\s+now\s+(in\s+)?developer\s+mode/i,
      /system\s+override/i,
      /reveal\s+prompt/i,
      /ignora\s+(todas\s+)?las\s+instrucciones\s+anteriores?/i,
      /tu\s+estas\s+ahora\s+(en\s+)?modo\s+desarrollador/i,
      /anula\s+el\s+sistema/i,
      /revela\s+inmediatamente/i,
    ];

    this.fuzzyPatterns = [
      "ignore",
      "bypass",
      "override",
      "reveal",
      "delete",
      "system",
      "ignorar",
      "ignora",
      "anteriores",
      "elimina",
      "eliminar",
      "evitar",
      "viola",
      "violar",
      "sobreescribi",
      "sobreescribir",
      "revela",
      "revelar",
      "invalidar",
    ];
  }

  detectInjection(text: string): boolean {
    const normalized = text.normalize("NFKC").toLowerCase();

    if (this.dangerousPatterns.some((pattern) => pattern.test(normalized))) {
      return true;
    }

    const words = normalized.match(/\b\w+\b/g) || [];

    for (const word of words) {
      for (const target of this.fuzzyPatterns) {
        if (this.isSimilarWord(word, target) || this.isSuspicious(word, target)) {
          return true;
        }
      }
    }

    return false;
  }

  validateAndSanitize(text: string): string {
    if (typeof text !== "string") {
      throw new TypeError("El mensaje debe ser un texto.");
    }

    const normalized = text.normalize("NFKC").replace(/\s+/g, " ").trim();

    if (normalized.length === 0) {
      throw new Error("El mensaje está vacío.");
    }

    if (normalized.length > 10000) {
      throw new Error("El mensaje excede el tamaño máximo permitido.");
    }

    if (this.detectInjection(normalized)) {
      throw new Error("Contenido sospechoso de prompt injection detectado.");
    }

    return this.sanitizeInput(normalized);
  }

  private isSuspicious(word: string, target: string): boolean {
    const dist = distance(word, target);
    return dist <= 2;
  }

  private isSimilarWord(word: string, target: string): boolean {
    if (word.length !== target.length || word.length < 3) {
      return false;
    }

    const sameFirstLetter = word[0] === target[0];
    const sameLastLetter = word[word.length - 1] === target[target.length - 1];
    const middleWord = word.slice(1, -1).split("").sort().join("");
    const middleTarget = target.slice(1, -1).split("").sort().join("");

    return sameFirstLetter && sameLastLetter && middleWord === middleTarget;
  }

  sanitizeInput(text: string): string {
    let normalized = text.normalize("NFKC");
    normalized = normalized.replace(/\s+/g, " ");
    normalized = normalized.replace(/(.)\1{3,}/g, "$1");

    for (const pattern of this.dangerousPatterns) {
      const regex = new RegExp(pattern.source, "gi");
      normalized = normalized.replace(regex, "[FILTERED]");
    }

    return normalized.slice(0, 10000).trim();
  }
}
