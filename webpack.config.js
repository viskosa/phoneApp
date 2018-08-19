const path = require('path'); //пакет nodeJs, получает абсолютный путь

module.exports = {
	entry: './js/app.js',	// точка входа
	output: {
		path: path.resolve(__dirname, 'build'), // целевая директория
		filename: 'bundle.js',					// итоговый файл
		publicPath: '/'
	},
	mode: 'development',
	watch: true,	// когда запустим npm run webpack, он не будет завершаться
}