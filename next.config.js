const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase, { defaultConfig }) => {
    defaultConfig.node = defaultConfig.node || {}
    defaultConfig.node.child_process = 'empty';

    return defaultConfig;
}