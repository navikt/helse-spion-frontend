const scanner = require('sonarqube-scanner');

scanner(
    {
        serverUrl : 'https://sonarcloud.io',
        token : process.env.SONAR_TOKEN,
        options: {
            'sonar.organization': 'navit',
            'sonar.projectKey': 'navikt_helse-spion-frontend',
            'sonar.sources': 'src',
            'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info'
        }
    },
    () => process.exit()
)