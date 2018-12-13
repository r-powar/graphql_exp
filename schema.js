const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLBoolean,
    GraphQLNonNull
} = require('graphql');

const axios = require('axios');

//Customer Type
const LaunchType = new GraphQLObjectType({
    name: 'Launch',
    fields: () => ({
        flight_number: {type: GraphQLInt},
        mission_name: {type: GraphQLString},
        launch_year: {type: GraphQLString},
        launch_date_local: {type: GraphQLString},
        launch_success: {type: GraphQLBoolean},
        rocket: {
            type: RocketType
        }
    })
});


const RocketType = new GraphQLObjectType({
    name: 'Rocket',
    fields: () => ({
        rocket_id: {type: GraphQLString},
        rocket_name: {type: GraphQLString},
        rocket_type: {type: GraphQLString}
    })
});
// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        launches: {
            type: new GraphQLList(LaunchType),
            resolve(parentValue, args) {
                return axios
                    .get('https://api.spacexdata.com/v3/launches')
                    .then(res => res.data);
            }
        },
        launch: {
            type: LaunchType,
            args: {
                flight_number: {type: GraphQLInt}
            },
            resolve(parentValue, args) {
                return axios
                    .get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
                    .then(res => res.data);
            }
        },
        rockets: {
            type: new GraphQLList(RocketType),
            resolve(parentValue, args) {
                return axios
                    .get('https://api.spacexdata.com/v3/rockets')
                    .then(res => res.data);
            }
        },
        rocket: {
            type: RocketType,
            args: {
                id: {type: GraphQLInt}
            },
            resolve(parentValue, args) {
                return axios
                    .get(`https://api.spacexdata.com/v3/rockets/${args.id}`)
                    .then(res => res.data);
            }
        }
    }

});

/*
//Mutation
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addCustomer: {
            type: CustomerType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parentValue, args) {
                return axios.post('http://localhost:3000/customers', {
                    name: args.name,
                    email: args.email,
                    age: args.age
                })
                    .then(res => res.data)
            }
        },
        deleteCustomer: {
            type: CustomerType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parentValue, args) {
                return axios.delete('http://localhost:3000/customers/' + args.id)
                    .then(res => res.data)
            }
        },

    }
});
*/

module.exports = new GraphQLSchema({
    query: RootQuery
});