// @types/react-places-autocomplete.d.ts
declare module "react-places-autocomplete" {
    export interface Suggestion {
      placeId: string;
      description: string;
    }
  
    export interface UsePlacesAutocompleteProps {
      value: string;
      onChange: (value: string) => void;
      onSelect: (selectedAddress: string) => void;
      searchOptions?: object;
    }
  
    export default function PlacesAutocomplete(
      props: UsePlacesAutocompleteProps & {
        children: (state: {
          getInputProps: any;
          suggestions: Suggestion[];
          getSuggestionItemProps: any;
          loading: boolean;
        }) => React.ReactNode;
      }
    ): JSX.Element;
  }
  