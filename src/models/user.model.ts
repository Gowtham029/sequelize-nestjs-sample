import { AutoIncrement, Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({ tableName: "users", freezeTableName: false, timestamps: false })
export class Users extends Model<Users> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column
    firstName: string;

    @Column
    lastName: string;

    @Column({ defaultValue: true })
    isActive: boolean;
}
