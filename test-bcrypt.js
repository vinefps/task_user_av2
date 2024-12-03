const bcrypt = require('bcrypt');
const senha = '1234';
const hash = '$2b$10$Nuf/LUGbGflkkXWZNd9BIu.A6gr8dksK9aMVhUUTO0MCs4t9UzKsS' // Substitua pelo hash gerado

bcrypt.compare(senha, hash).then((isValid) => {
    console.log('Senha válida:', isValid);
});
