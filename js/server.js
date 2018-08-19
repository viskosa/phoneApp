const http = require('http');
const fs = require('fs');

http
	.createServer((request, response) => {
		//const index = fs.readFileSync('./index.html');//сначала читаем файл index.html
		let url = request.url;
		if (url == '/') {
			url = './index.html';
		}
		//console.log(url);

		try {

			let file = fs.readFileSync(`.${url}`);
			response.end(file);

		} catch (err) {
			if (err.code == 'ENOENT') {
				console.log(`${url} does not exist`)
			} else {
				console.log('some other error');
			}
		}

		response.end('NOT FOUND', 404);//закрой все соединение и отправь в него файл index
	})
	.listen(3000, err => {
		console.log('server started on 3000');
	})