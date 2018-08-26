const path = require('path'); //пакет nodeJs, получает абсолютный путь
const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack'); // чтобы можно было подключать плагины из вебпака. Вебпак д.б установлен в проекте, а не глобально
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: './js/app.js',	// точка входа
	output: {
		path: path.resolve(__dirname, 'build'), // целевая директория
		filename: 'bundle.js',					// итоговый файл
		publicPath: '/'
	},
	//devtool: 'source-map',
	mode: 'development',
	//watch: true,	// когда запустим npm run webpack, он не будет завершаться
	watch: NODE_ENV == 'development', //т.е. включаем только при разработке

	//plugins: [

	//],

	module: {
		rules: [
			{	//лоадеры
				test: /\.js$/, //к файлам, кот оканчиваются на .js, нужно применять лоадер бабель
				use: {
					loader: 'babel-loader',
				}
				
			},
		]	
	},

	//optimization: {
	//    minimizer: [
	//      new UglifyJsPlugin({
	//      	test: /\.js($|\?)/i,
	//      })
	//    ]
  	//}
}