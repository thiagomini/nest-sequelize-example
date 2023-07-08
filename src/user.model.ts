import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

export type UserProps = {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
};

@Table({
  tableName: 'user',
  underscored: true,
})
export class User extends Model<UserProps> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  email: string;

  public fullName() {
    return `${this.get('firstName')} ${this.get('lastName')}`;
  }
}
