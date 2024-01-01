
enum Bimestre {
    PRIMEIRO = "PRIMEIRO",
    SEGUNDO = "SEGUNDO",
    TERCEIRO = "TERCEIRO",
    QUARTO = "QUARTO"
}

enum Disciplina {
    Biologia = "Biologia",
    Artes = "Artes",
    Geografia = "Geografia",
    Sociologia = "Sociologia"
}


export interface DisciplinaRequest {
    bimestre: Bimestre;
    disciplina: Disciplina;
    nota: number;
    criadoEm?: Date;
    atualizadoEm?: Date;
    id?: string;
}