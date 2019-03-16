import expressGraphQL from 'express-graphql';
import { GraphQLSchema, GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLID, GraphQLInt, GraphQLString, GraphQLBoolean } from 'graphql';
import { User, Ticket, Invoice } from '../models';
import { InvoiceQueryObject, RoleQueryObject, TicketQueryObject, UserQueryObject } from '../../db/queries';

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        loginByToken: {
            type: new GraphQLNonNull(User),
            args: {
                token: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: (_, args) => UserQueryObject.loginByToken(args.token)
        },
        findByToken: {
            type: new GraphQLNonNull(User),
            args: {
                token: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: (_, args) => UserQueryObject.findByToken(args.token)
        },
        findById: {
            type: new GraphQLNonNull(User),
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve: (_, args) => UserQueryObject.findById(args.id)
        },
        findAllUsers: {
            type: new GraphQLList(new GraphQLNonNull(User)),
            args: {
                page: {
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            resolve: (_, args) => UserQueryObject.findAll(args.page)
        },
        findAllUsersWithNoLimit: {
            type: new GraphQLList(User),
            resolve: (_, args) => UserQueryObject.findAllWithNoLimit()
        },
        countAllUsers: {
            type: GraphQLInt,
            resolve: (_, args) => UserQueryObject.count() 
        },
        findTicketsByUser: {
            type: new GraphQLList(new GraphQLNonNull(Ticket)),
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                },
                page: {
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            resolve: (_, args) => TicketQueryObject.findAllByUser(args.id, args.page)
        },
        findTicketById: {
            type: new GraphQLNonNull(Ticket),
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve: (_, args) => TicketQueryObject.findById(args.id)
        },
        findInvoiceById: {
            type: new GraphQLNonNull(Invoice),
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve: (_, args) => InvoiceQueryObject.findById(args.id)
        },
        findValidatedInvoices: {
            type: new GraphQLList(new GraphQLNonNull(Invoice)),
            args: {
                page: {
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            resolve: (_, args) => InvoiceQueryObject.findValidated(args.page)
        },
        findUnvalidatedInvoices: {
            type: new GraphQLList(new GraphQLNonNull(Invoice)),
            args: {
                page: {
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            resolve: (_, args) => InvoiceQueryObject.findUnvalidated(args.page)
        },
        countInvoicesByStatus: {
            type: GraphQLInt,
            args: {
                status: {
                    type: GraphQLBoolean
                }
            },
            resolve: (_, args) => InvoiceQueryObject.countByStatus(args.status)
        },
        countTicketsByDay: {
            type: GraphQLInt,
            args: {
                day: {
                    type: GraphQLInt
                }
            },
            resolve: (_, args) => TicketQueryObject.countForDay(args.day)
        },
        countTicketsByMonth: {
            type: GraphQLInt,
            args: {
                month: {
                    type: GraphQLInt
                }
            },
            resolve: (_, args) => TicketQueryObject.countForMonth(args.month)
        },
        countTicketsByUsers: {
            type: GraphQLInt,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve: (_, args) => TicketQueryObject.countByUsers(args.id)
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        newUser: {
            type: new GraphQLNonNull(User),
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                email: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                phone: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                address: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                password: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: (_, args) => UserQueryObject.create(
                args.name, 
                args.email, 
                args.phone, 
                args.address, 
                args.password
                )
        },
        modifyUser: {
            type: new GraphQLNonNull(User),
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                },
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                email: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                phone: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                address: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                password: {
                    type: GraphQLString
                }
            },
            resolve: (_, args) => UserQueryObject.modify(
                args.id,
                args.name,
                args.email,
                args.phone,
                args.address,
                args.password
            )
        },
        login: {
            type: new GraphQLNonNull(User),
            args: {
                email: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                password: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: (_, args) => UserQueryObject.login(args.email, args.password)
        },
        createTicket: {
            type: new GraphQLNonNull(Ticket),
            args: {
                userId: {
                    type: new GraphQLNonNull(GraphQLID)
                },
                parts: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                phone: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                client: {
                    type: new GraphQLNonNull(GraphQLString)
                }
                
            },
            resolve: (_, args) => TicketQueryObject.bindToUser(
                args.userId,
                args.parts,
                args.phone,
                args.client
            )
        },
        changeStatus: {
            type: new GraphQLNonNull(Ticket),
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                },
                status: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: (_, args) => TicketQueryObject.changeStatus(args.id, args.status)
        },
        invertRole: {
            type: new GraphQLNonNull(GraphQLBoolean),
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve: (_, args) => RoleQueryObject.invert(args.id)
        },
        generateInvoice: {
            type: new GraphQLNonNull(Invoice),
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve: (_, args) => InvoiceQueryObject.generate(args.id)
        },
        validateInvoice: {
            type: new GraphQLNonNull(Invoice),
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve: (_, args) => InvoiceQueryObject.validate(args.id)
        }
    }
});

const GQLSchema = new GraphQLSchema({
    mutation: Mutation,
    query: Query
});

export function useGQL(app) {
    app.use('/gql', expressGraphQL({
        schema: GQLSchema,
        graphiql: true
    }));

    console.log('App Using GraphQL', app);
};