import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull } from 'graphql';
import { User } from './user.graphql';

export const Role = new GraphQLObjectType({
    name: 'Role',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        value: {
            type: new GraphQLNonNull(GraphQLString)
        },
        user: {
            type: new GraphQLNonNull(User)
        }
    })
});