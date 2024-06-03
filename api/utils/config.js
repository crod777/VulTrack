

require('dotenv').config();
const package = require("../package.json")

let config = {
    version: package.version,
    commit: {
        branch: process.env.COMMIT_BRANCH || 'na',
        sha: process.env.COMMIT_SHA || 'na',
        tag: process.env.COMMIT_TAG || 'na',
        describe: process.env.COMMIT_DESCRIBE || 'na'
    },
    settings: {
        setClassification: process.env.VULTRACK_CLASSIFICATION || "U",
        responseValidation: process.env.VULTRACK_DEV_RESPONSE_VALIDATION || "none"
    },
    client: {
        clientId: process.env.VULTRACK_CLIENT_ID || "vul-track",
        authority: process.env.VULTRACK_OIDC_PROVIDER || "http://localhost:2020/auth/realms/RMFTools",
        apiBase: process.env.VULTRACK_CLIENT_API_BASE || "api",
        disabled: process.env.VULTRACK_CLIENT_DISABLED === "true",
        directory: process.env.VULTRACK_CLIENT_DIRECTORY || '../client/dist',
        extraScopes: process.env.VULTRACK_CLIENT_EXTRA_SCOPES,
        scopePrefix: process.env.VULTRACK_CLIENT_SCOPE_PREFIX,
        refreshToken: {
            disabled: process.env.VULTRACK_CLIENT_REFRESH_DISABLED ? process.env.VULTRACK_CLIENT_REFRESH_DISABLED === "true" : false,
        },
    },
    stigman: {
        clientId: process.env.STIGMAN_CLIENT_ID || "stig-manager",
        host: process.env.STIGMAN_HOST || "localhost",
        port: process.env.STIGMAN_PORT || "54000",
        apiBase: process.env.STIGMAN_API_BASE || "api",
        scopePrefix: process.env.STIGMAN_SCOPE_PREFIX,
        extraScopes: process.env.STIGMAN_EXTRA_SCOPES,
    },
    docs: {
        disabled: process.env.VULTRACK_DOCS_DISABLED === "true",
        docsDirectory: process.env.VULTRACK_DOCS_DIRECTORY || '../docs/_build/html',
    },
    http: {
        address: process.env.VULTRACK_API_ADDRESS || "127.0.0.1",
        port: process.env.VULTRACK_API_PORT || 8086,
        maxJsonBody: process.env.VULTRACK_API_MAX_JSON_BODY || "31457280",
        maxUpload: process.env.VULTRACK_API_MAX_UPLOAD || "1073741824"
    },
    database: {
        acquire: process.env.VULTRACK_DB_ACQUIRE || 30000,
        dialect: process.env.VULTRACK_DB_DIALECT || "mysql",
        host: process.env.VULTRACK_DB_HOST || "localhost",
        idle: process.env.VULTRACK_DB_IDLE || 10000,
        port: process.env.VULTRACK_DB_PORT || 3306,
        schema: process.env.VULTRACK_DB_SCHEMA || "vultrack",
        password: process.env.VULTRACK_DB_PASSWORD,
        username: process.env.VULTRACK_DB_USER,
        maxConnections: process.env.VULTRACK_DB_MAX_CONNECTIONS || 25,
        minConnections: process.env.VULTRACK_DB_MIN_CONNECTIONS || 0,
        tls: {
            ca_file: process.env.VULTRACK_DB_TLS_CA_FILE,
            cert_file: process.env.VULTRACK_DB_TLS_CERT_FILE,
            key_file: process.env.VULTRACK_DB_TLS_KEY_FILE
        },
        revert: process.env.VULTRACK_DB_REVERT === "true",
        toJSON: function () {
            let { password, ...props } = this
            props.password = !!password
            return props
        }
    },
    swaggerUi: {
        enabled: process.env.VULTRACK_SWAGGER_ENABLED === "true",
        authority: process.env.VULTRACK_SWAGGER_OIDC_PROVIDER || process.env.VULTRACK_OIDC_PROVIDER || "http://localhost:2020/auth/realms/RMFTools",
        server: process.env.VULTRACK_SWAGGER_SERVER || "http://localhost:8086/api",
        oauth2RedirectUrl: process.env.VULTRACK_SWAGGER_REDIRECT || "http://localhost:8086/api-docs/oauth2-redirect.html"
    },
    oauth: {
        authority: process.env.VULTRACK_OIDC_PROVIDER || "http://129.168.1.101:2020/auth/realms/RMFTools",
        claims: {
            scope: process.env.VULTRACK_JWT_SCOPE_CLAIM || "scope",
            username: process.env.VULTRACK_JWT_USERNAME_CLAIM || "preferred_username",
            servicename: process.env.VULTRACK_JWT_SERVICENAME_CLAIM || "clientId",
            fullname: process.env.VULTRACK_JWT_FULL_NAME_CLAIM || process.env.VULTRACK_JWT_USERNAME_CLAIM || "name",
            firstname: process.env.VULTRACK_JWT_FIRST_NAME_CLAIM || "given_name",
            lastname: process.env.VULTRACK_JWT_LAST_NAME_CLAIM || "family_name",
            privileges: formatChain(process.env.VULTRACK_JWT_PRIVILEGES_CLAIM || "realm_access.roles"),
            email: process.env.VULTRACK_JWT_EMAIL_CLAIM || "email"
        }
    },
    log: {
        level: parseInt(process.env.VULTRACK_LOG_LEVEL) || 3,
        mode: process.env.VULTRACK_LOG_MODE || 'combined'
    }
}

function formatChain(path) {
    const components = path?.split('.')
    if (components?.length === 1) return path
    for (let x=0; x < components.length; x++) {
      components[x] = `['${components[x]}']`
    }
    return components.join('?.')
  }
  
module.exports = config
