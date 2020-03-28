const fs= require('fs');

fs.writeFile('./static/index.html', '', 'utf-8', (err) => {
    if (err) console.log(err);
    else console.log('index.html successfully created');
});