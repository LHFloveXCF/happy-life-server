// 基础配置
const baseConfig = {
    PORT: 18141,
    REDIS_CONF: {
        PORT: 6379,
        HOST: '127.0.0.1',
        PASS: '123456'
    }
};

// 环境特定配置
const envConfigs = {
    dev: {
        MYSQL_CONF: {
            PORT: 3306,
            HOST: '127.0.0.1',
            DB: 'lucky_momo',
            USER: 'root',
            PASS: '123456',
            connectionLimit: 10,
            connectTimeout: 10000,
            waitForConnections: true
        }
    },
    release: {
        MYSQL_CONF: {
            PORT: 3306,
            HOST: '111.229.16.242',
            DB: 'lucky_momo',
            USER: 'root',
            PASS: 'LuckyFM0312'
        }
    }
};

// 获取当前环境(默认为release)
const env = process.env.NODE_ENV || 'release';

// 合并配置
const config = {
    ...baseConfig,
    ...envConfigs[env]
};

// 导出配置对象
module.exports = config;