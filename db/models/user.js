import bcrypt from 'bcryptjs';

export const User = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Name must be provided'
                },
                is: /[a-z]/i
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: {
                    msg: 'Email is required'
                },
                isEmail: true
            }
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: {
                    msg: 'Phone number is required'
                },
                is: /\d+/
            }
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Address is required'
                },
                is: /\d+, [a-z]/i
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Password is required'
                }
            }
        },
        token: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        dateJoined: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: new Date().toDateString()
        }
    });

    user.findByToken = function(token, include) {
        let User = this;

        return User.find({
            where: {
                token: token
            },
            include: include
        });
    };

    return user;
};