export interface IRolesTypes {
  id: number;
  name: string;
  description: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IStrapiRoles extends IRolesTypes {
  nb_users: number;
}

export interface IRoleTypes {
  roles: IStrapiRoles[];
}
