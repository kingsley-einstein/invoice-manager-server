import { Invoice, Role, Ticket, User } from '../models';
import { environment } from '../../environment';
import Sequelize from 'sequelize';

const sequelize = new Sequelize(environment.db, environment.dbUser, environment.dbPass, {
    host: environment.dbHost,
    port: 3306,
    dialect: 'mysql',
    define: {
        underscored: true
    },
    pool: {
        max: 5,
        min: 1
    }
});

const InvoiceModel = Invoice(sequelize, Sequelize);
const RoleModel = Role(sequelize, Sequelize);
const TicketModel = Ticket(sequelize, Sequelize);
const UserModel = User(sequelize, Sequelize);

InvoiceModel.belongsTo(TicketModel);
UserModel.hasOne(RoleModel);
UserModel.hasMany(TicketModel, {
    as: 'tickets'
});

function syncDB() {
    return sequelize.sync({
        force: false
    });
}

export {
    InvoiceModel,
    RoleModel,
    TicketModel,
    UserModel,
    syncDB
};