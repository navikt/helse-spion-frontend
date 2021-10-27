import env from './Environment';

describe('Environment', () => {
  it('should return the loginservice url for localhost', () => {
    expect(env.loginServiceUrl).toBe(
      'http://localhost:8080/local/cookie-please?subject=12321&redirect=http://localhost:3000/min-side-refusjon/'
    );
  });

  it('should return the loginservice url for preprod dev', () => {
    delete window.location;
    window.location = new URL('https://www.dev.nav.no');

    expect(env.loginServiceUrl).toBe(
      'https://helse-spion.dev.nav.no/local/cookie-please?subject=10107400090&redirect=XXX?loggedIn=true'
    );
  });

  it('should return the loginservice url for preprod q', () => {
    delete window.location;
    window.location = new URL('https://arbeidsgiver-q.nav.no');

    expect(env.loginServiceUrl).toBe(
      'https://loginservice-q.nav.no/login?redirect=https://arbeidsgiver-q.nav.no/min-side-refusjon/'
    );
  });

  it('should return the loginservice url for prod', () => {
    delete window.location;
    window.location = new URL('https://www.nav.no');

    expect(env.loginServiceUrl).toBe(
      'https://loginservice.nav.no/login?redirect=https://arbeidsgiver.nav.no/min-side-refusjon/'
    );
  });

  /*********/

  it('should return the baseUrl url for localhost', () => {
    delete window.location;
    window.location = new URL('http://localhost');

    expect(env.baseUrl).toBe('http://localhost:8080');
  });

  it('should return the baseUrl url for preprod dev', () => {
    delete window.location;
    window.location = new URL('https://www.dev.nav.no');

    expect(env.baseUrl).toBe('https://helse-spion.dev.nav.no');
  });

  it('should return the baseUrl url for preprod q', () => {
    delete window.location;
    window.location = new URL('https://arbeidsgiver-q.nav.no');

    expect(env.baseUrl).toBe('https://arbeidsgiver-q.nav.no/min-side-refusjon');
  });

  it('should return the baseUrl url for prod', () => {
    delete window.location;
    window.location = new URL('https://www.nav.no');

    expect(env.baseUrl).toBe('https://arbeidsgiver.nav.no/min-side-refusjon');
  });
});
