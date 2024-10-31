const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // Điểm đầu vào của ứng dụng
    entry: './src/index.js',

    // Cấu hình đầu ra
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true // Làm sạch thư mục đầu ra trước khi xây dựng
    },

    // Cấu hình các module và loader
    module: {
        rules: [
            {
                // Xử lý các tệp HTML
                test: /\.html$/,
                use: [
                    'html-loader', // Tải nội dung HTML
                    {
                        loader: 'posthtml-loader', // Sử dụng PostHTML để xử lý các plugin
                        options: {
                            posthtmlOptions: {
                                plugins: [
                                    require('posthtml-doctype')({
                                        doctype: 'HTML 5' // Thiết lập doctype
                                    }),
                                    require('posthtml-include')({
                                        root: path.resolve(__dirname, 'src') // Thư mục gốc cho các include
                                    })
                                ]
                            }
                        }
                    }
                ]
            },
            {
                // Xử lý các tệp JavaScript bằng Babel
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', // Sử dụng Babel để biên dịch
                    options: {
                        presets: ['@babel/preset-env'] // Sử dụng preset-env
                    }
                }
            },
            {
                // Xử lý các tệp SCSS
                test: /\.scss$/,
                use: [
                    'style-loader', // Inject CSS vào DOM
                    'css-loader',   // Chuyển đổi CSS thành CommonJS
                    {
                        loader: 'sass-loader', // Biên dịch Sass thành CSS
                        options: {
                            implementation: require('sass') // Sử dụng Dart Sass
                        }
                    }
                ]
            },
            {
                // Xử lý các tệp hình ảnh
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[name][ext]'
                }
            }
        ]
    },

    // Cấu hình các plugin
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/pages/index.html', // Đường dẫn tới tệp HTML mẫu
            filename: 'index.html' // Tên tệp HTML đầu ra
        })
    ],

    // Cấu hình Webpack Dev Server
    devServer: {
        static: {
            directory: path.join(__dirname, 'src'), // Thư mục chứa các tệp tĩnh
        },
        compress: true, // Bật nén gzip
        port: 8081,     // Cổng để chạy server
        hot: true,      // Bật Hot Module Replacement
        open: true      // Tự động mở trình duyệt khi server khởi động
    },

    // Chế độ xây dựng
    mode: 'development'
};