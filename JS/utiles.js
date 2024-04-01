export const graphqlQuery = `
 query{
  User:user{
    email
    login
    firstName
    lastName
    totalUp
    totalDown
    auditRatio
    events( where: {eventId: {_eq: 56}} ){
      level
    }

  }
 Transaction:  transaction(where: {type:{_eq:"xp"},eventId:{_eq:56}}){
  amount
path
    }
Skills:      transaction(
  where: {
type: { _like: "skill%" },
#eventId: { _eq: 56 },
# object: { type: { _eq: "project" } }
},
distinct_on: [type], # Spécifiez le champ que vous voulez considérer comme distinct

order_by: {type:asc, amount: desc}, # Tri par ordre décroissant sur le champ amount

)
{
path
amount
type
}
  }
`

