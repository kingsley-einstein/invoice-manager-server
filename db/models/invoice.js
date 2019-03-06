export const Invoice = (sequelize, DataTypes) => {
    const invoice = sequelize.define('invoice', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        validated: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

    invoice.prototype.makeValid = function() {
        let invoice = this;

        invoice.validated = true;

        return invoice.save().then(i => {
            return i;
        });
    };

    return invoice;
};