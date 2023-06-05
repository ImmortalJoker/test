export interface Asteroid {
  id: number;
  links: {
    self: string;
  };
  neo_reference_id: string;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  close_approach_data: {
    close_approach_date_full: string;
  }[];
}

export interface IAsteroid {
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  estimated_diameter: {
    kilometers: {
      estimated_diameter_max: number;
    };
  };
  is_potentially_hazardous_asteroid: boolean;
}