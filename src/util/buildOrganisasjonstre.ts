import { JuridiskEnhetMedUnderEnheterArray, Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';
import { OrganisationType } from './helseSpionTypes';

// Todo: Delete?
export const buildOrganisasjonstre = (
	arbeidsgivere: Organisasjon[],
): JuridiskEnhetMedUnderEnheterArray[] => arbeidsgivere.filter(org =>
	org.Type === OrganisationType.ENTERPRISE).map(enterprise => ({
		JuridiskEnhet: enterprise,
		Underenheter: (arbeidsgivere.filter(org => org.ParentOrganizationNumber == enterprise.OrganizationNumber))
	})
).filter(orgTre => orgTre.Underenheter.length > 0);
