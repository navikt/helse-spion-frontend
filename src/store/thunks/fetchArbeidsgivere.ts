import {
  fetchArbeidsgivereError,
  fetchArbeidsgivereStarted,
  fetchArbeidsgivereSuccess
} from "../actions/helseSpionActions";
import { Dispatch } from "redux";
import { Organisasjon } from "@navikt/bedriftsmeny/lib/Organisasjon";

export function fetchArbeidsgivere(): (dispatch: Dispatch) => Promise<void> {
  return async dispatch => {
    dispatch(fetchArbeidsgivereStarted());
    await fetch('http://localhost:3000/api/v1/arbeidsgivere')
      .then(response => {
        if (response.status !== 200) {
          dispatch(fetchArbeidsgivereError());
        } else {
          response.json().then(data =>
            dispatch(fetchArbeidsgivereSuccess(convertResponseDataToOrganisasjon(data)))
          )
        }
      })
  };
}

// todo: type safety
const convertResponseDataToOrganisasjon = (data): Organisasjon[] => data.map(organisasjon => ({
  Name: organisasjon.name,
  Type: organisasjon.type,
  OrganizationNumber: organisasjon.organizationNumber,
  OrganizationForm: organisasjon.organizationForm,
  Status: organisasjon.status,
  ParentOrganizationNumber: organisasjon.parentOrganizationNumber,
}));
