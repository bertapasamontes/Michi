export interface SuggestResponse {
    suggestions: Suggestion[];
    attribution: string;
    response_id: string;
}

export interface Suggestion {
    name:             string;
    mapbox_id:        string;
    feature_type:     string;
    address:          string;
    full_address:     string;
    place_formatted:  string;
    context:          Context;
    language:         string;
    maki:             string;
    poi_category:     string[];
    poi_category_ids: string[];
    external_ids:     ExternalIDS;
    metadata:         Metadata;
    distance:         number;
}

export interface Context {
    country:       Country;
    postcode:      Neighborhood;
    place:         Neighborhood;
    street?:       Street;
    neighborhood?: Neighborhood;
}

export interface Country {
    name:                 string;
    country_code:         string;
    country_code_alpha_3: string;
}

export interface Neighborhood {
    id:   string;
    name: string;
}

export interface Street {
    name: string;
}

export interface ExternalIDS {
    dataplor: string;
}

export interface Metadata {
}
