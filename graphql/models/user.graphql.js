import { GraphQLString, GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLList } from 'graphql';
import { Ticket } from './ticket.graphql';
import { Role } from './role.graphql';

export const User = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
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
            type: new GraphQLNonNull(GraphQLString)
        },
        token: {
            type: GraphQLString
        },
        dateJoined: {
            type: new GraphQLNonNull(GraphQLString)
        },
        tickets: {
            type: new GraphQLList(Ticket)
        },
        role: {
            type: new GraphQLNonNull(Role)
        }
    })
});