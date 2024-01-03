export interface RoleTypes {
  id: number;
  name: string;
  description: string;
  type: string;
}
export const roles: Array<RoleTypes> = [
  {
    id: 1,
    name: 'Administrator',
    description: 'Page admin',
    type: 'admin',
  },
  {
    id: 2,
    name: 'Redactor',
    description: 'Blog redactor',
    type: 'redactor',
  },
  {
    id: 3,
    name: 'Creator',
    description: 'Content creator',
    type: 'creator',
  },
  {
    id: 4,
    name: 'Authenticated',
    description: 'User',
    type: 'authenticated',
  },
];
