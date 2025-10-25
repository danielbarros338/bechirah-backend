import { Injectable } from '@nestjs/common';
import { User as DomainUser } from '../../domain/entities/User.entity';
import { UserProp } from '../../domain/props/user.prop';
import { User as OrmUser } from '../orm-entities/user.ormEntity';

@Injectable()
export class UserMapper {
  toDomain(orm: OrmUser): DomainUser {
    const prop: UserProp = {
      id: orm.id,
      name: orm.name,
      username: orm.username,
      email: orm.email,
      password: orm.password,
      role: orm.role,
      isActive: orm.isActive,
    };

    return DomainUser.create(prop);
  }

  toOrm(domain: DomainUser): Partial<OrmUser> {
    const orm: Partial<OrmUser> = {
      id: domain.idValue || undefined,
      name: domain.nameValue,
      username: domain.usernameValue,
      email: domain.emailValue,
      password: domain.passwordHash,
      isActive: domain.isActiveValue,
      role: domain.roleValue,
    };

    return orm;
  }
}

export default UserMapper;
