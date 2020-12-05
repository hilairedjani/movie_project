const fetch = require('node-fetch');
const Omdb_Url = `http://www.omdbapi.com/?apikey=36533b13`;
exports.fetchmoviefromapi = async (movie) => {
    try {
        const data = await fetch(`${Omdb_Url}&t=${movie}`)
        const response = await data.text()
        console.log(response)
        return response
    } catch (error) {
        console.log(error)
        return null
    }

}