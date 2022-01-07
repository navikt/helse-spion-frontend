import env from './Environment';

describe('Environment', () => {
  it('should return the loginservice url for localhost', () => {
    expect(env.loginServiceUrl).toBe(
      'https://helse-spion.dev.nav.no/local/cookie-please?subject=10107400090&redirect=http://localhost:3000/min-side-refusjon/'
    );
  });

  it('should return the loginservice url for preprod dev', () => {
    setWindowLocation('https://www.dev.nav.no');

    expect(env.loginServiceUrl).toBe(
      'https://helse-spion.dev.nav.no/local/cookie-please?subject=10107400090&redirect=https://helse-spion-frontend.dev.nav.no/?loggedIn=true'
    );
  });

  it('should return the loginservice url for preprod q', () => {
    setWindowLocation('https://arbeidsgiver-q.nav.no');

    expect(env.loginServiceUrl).toBe(
      'https://loginservice-q.nav.no/login?redirect=https://arbeidsgiver-q.nav.no/min-side-refusjon/'
    );
  });

  it('should return the loginservice url for prod', () => {
    setWindowLocation('https://www.nav.no');

    expect(env.loginServiceUrl).toBe(
      'https://loginservice.nav.no/login?redirect=https://arbeidsgiver.nav.no/min-side-refusjon/'
    );
  });

  /*********/

  it('should return the baseUrl url for localhost', () => {
    setWindowLocation('http://localhost');

    expect(env.baseUrl).toBe('https://helse-spion.dev.nav.no');
  });

  it('should return the baseUrl url for preprod dev', () => {
    setWindowLocation('https://www.dev.nav.no');

    expect(env.baseUrl).toBe('https://helse-spion.dev.nav.no');
  });

  it('should return the baseUrl url for preprod q', () => {
    setWindowLocation('https://arbeidsgiver-q.nav.no');

    expect(env.baseUrl).toBe('https://arbeidsgiver-q.nav.no/min-side-refusjon');
  });

  it('should return the baseUrl url for prod', () => {
    setWindowLocation('https://www.nav.no');

    expect(env.baseUrl).toBe('https://arbeidsgiver.nav.no/min-side-refusjon');
  });
});

function setWindowLocation(windowLocationURL: string) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  delete window.location;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.location = new URL(windowLocationURL);
}
