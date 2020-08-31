enum EnvironmentType {
    PROD, PREPROD, LOCAL
}

class Environment {

    private env = (window as any)._env_ || {
        MOCK_BACKEND: 'true',
        NODE_ENV: 'development'
    };

    get loginServiceUrl() {
        switch (this.environmentMode) {
            case EnvironmentType.PROD : return 'https://loginservice.nav.no/login?redirect=https://arbeidsgiver.nav.no/min-side-refusjon/';
            case EnvironmentType.PREPROD : return 'https://loginservice-q.nav.no/login?redirect=https://arbeidsgiver-q.nav.no/min-side-refusjon/';
            default : return 'http://localhost:8080/local/cookie-please?subject=12321&redirect=http://localhost:3000/min-side-refusjon/';
        }
    }

    get baseUrl() {
        switch (this.environmentMode) {
            case EnvironmentType.PROD : return 'https://arbeidsgiver.nav.no/min-side-refusjon';
            case EnvironmentType.PREPROD : return 'https://arbeidsgiver-q.nav.no/min-side-refusjon';
            default : return 'http://localhost:3000';
        }
    }

    get environmentMode(){
        if (window.location.hostname === 'localhost') {
            return EnvironmentType.LOCAL;
        }
        if (window.location.hostname.indexOf('-q') > -1) {
            return EnvironmentType.PREPROD;
        }
        return EnvironmentType.PROD;
    }

}

const env = new Environment();

export default env;
