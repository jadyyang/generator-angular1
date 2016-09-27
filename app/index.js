/**
 * index
 * Created by jady on 2016/9/27.
 */


const generators = require('yeoman-generator');


const Generator = generators.Base.extend({

    constructor: function() {
        generators.Base.apply(this, arguments);
    },

    prompting: function() {
        // fixme 需要对用户输入值进行验证
        return this.prompt([
            {
                type:       'input',
                name:       'name',
                message:    '项目名称',
                default:    this.appname
            },
            {
                type:       'input',
                name:       'domain',
                message:    '域名',
                default:    'xxx.100credit.com'
            },
            {
                type:       'input',
                name:       'port',
                message:    '本机端口号',
                default:    '80'
            },
            {
                type:       'input',
                name:       'interfaceServer',
                message:    '接口服务器地址',
                default:    'http://192.168.162.108'
            }
        ]).then(answers => {
            this.config.set(answers);
            this.config.save();
        });
    },

    writing: function() {
        this.log('开始拷贝文件');
        this.bulkDirectory('./', './');

        let templateFiles = [
            './package.json',
            './config/webpack.dev.js',
            './config/webpack.dist.js'
        ];
        templateFiles.forEach(file => this.template(file, file, this.config.getAll()));
    }

});


module.exports = Generator;
