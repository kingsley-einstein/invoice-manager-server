import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull } from 'graphql';
import { User } from './user.graphql';
import { Invoice } from './invoice.graphql';

export const Ticket = new GraphQLObjectType({
    name: 'Ticket',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        phone: {
            type: new GraphQLNonNull(GraphQLString)
        },
        client: {
            type: new GraphQLNonNull(GraphQLString)
        },
        parts: {
            type: new GraphQLNonNull(GraphQLString)
        },
        status: {
            type: GraphQLString
        },
        user: {
            type: new GraphQLNonNull(User)
        },
        invoice: {
            type: new GraphQLNonNull(Invoice)
        }
    })
});