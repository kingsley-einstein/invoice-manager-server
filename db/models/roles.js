export const Role = (sequelize, DataTypes) => {
    const role = sequelize.define('role', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        value: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'user'
        }
    });

    role.prototype.invert = function() {
        let role = this;

        if (role.value == 'user') role.value = 'moderator';
        else role.value = 'user';

        return role.save().then(r => {
            return r;
        });
    };

    return role;
};