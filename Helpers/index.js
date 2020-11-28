const fetch = require('node-fetch');
const Omdb_Url = `http://www.omdbapi.com/?i=tt3896198&apikey=36533b13`;
const fetchmoviefromapi = async (movie) => {
    try {
        const data = await fetch(`${Omdb_Url}&${movie}`)
        const response = await data.text()
        console.log(response)
    } catch (error) {
        console.log(error)
    }

}
