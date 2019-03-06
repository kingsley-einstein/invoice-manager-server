import { GraphQLID, GraphQLObjectType, GraphQLBoolean, GraphQLNonNull } from 'graphql';
import { Ticket } from './ticket.graphql';

export const Invoice = new GraphQLObjectType({
    name: 'Invoice',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        validated: {
            type: new GraphQLNonNull(GraphQLBoolean)
        },
        ticket: {
            type: new GraphQLNonNull(Ticket)
        }
    })
});