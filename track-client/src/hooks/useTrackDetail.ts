import { gql, useQuery } from '@apollo/client';

const TRACKS_QUERY = gql`
query tracks($id: Int!) {
  track(where: { id: $id } ) {
    name
    locations {
      timestamp
      coords {
        latitude
        longitude
        altitude
        accuracy
        heading
        speed
      }
    }
  }
}
`;

export default (id: number) => {
  const { loading, error, data } = useQuery(TRACKS_QUERY, {
    variables: { id },
  });

  return [loading, error, data];
}
