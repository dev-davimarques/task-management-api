// Aqui são os atributos da minha entidade

export class TaskDto {
  id: string;
  title: string;
  description: string;
  status: string;
  expirationDate: Date;
}

export interface FindAllParameters {
  title: string;
  status: string;
}
