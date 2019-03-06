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