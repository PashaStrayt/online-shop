import { RoleType } from "./role.type"

export type JwtPayloadType = {
  id: string,
  login: string,
  email: string,
  roles: RoleType[]
}