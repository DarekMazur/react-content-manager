export interface IRoleBasicTypes {
  name: string;
  description: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRolesTypes extends IRoleBasicTypes {
  id: number;
}

export interface IStrapiRoles extends IRolesTypes {
  nb_users: number;
}

export interface IRoleTypes {
  roles: IStrapiRoles[];
}

export interface IRolesData {
  data: {
    id: number;
    attributes: IRoleBasicTypes;
  };
}
