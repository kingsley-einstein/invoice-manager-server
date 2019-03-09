export const Ticket = (sequelize, DataTypes) => {
    const ticket = sequelize.define('ticket', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Phone model is required'
                }
            }
        },
        client: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Enter client name'
                }
            }
        },
        parts: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Enter parts to be fixed or replaced'
                }
            }
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        day: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: new Date().getDate()
        },
        month: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: new Date().getMonth()
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: new Date().getFullYear()
        }
    });

    ticket.prototype.changeStatus = function(status) {
        let ticket = this;
        ticket.status = status;

        return ticket.save().then(t => {
            return t;
        });
    };

    return ticket;
};