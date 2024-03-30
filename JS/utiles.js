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
Skills:transaction(where:{type:{ _like:"skill%"},eventId:{_eq:56}}){
      amount
       type
     }
  }
`

export const colors = [
    '#FF0000', // Rouge
    '#00FF00', // Vert
    '#0000FF', // Bleu
    '#FFFF00', // Jaune
    '#FF00FF', // Magenta
    '#00FFFF', // Cyan
    '#FFA500', // Orange
    '#800080', // Violet
    '#008000', // Vert foncé
    '#000080', // Bleu foncé
    '#800000', // Marron
    '#808000', // Olive
    '#008080', // Sarcelle
    '#C0C0C0', // Argent
    '#FFFFFF'  // Blanc
];