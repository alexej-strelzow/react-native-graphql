import { gql, useMutation } from '@apollo/client';
import { useContext } from 'react';
import { Context as LocationContext } from '../context/LocationContext';
import { navigate } from '../navigationRef';

const ADD_TRACK = gql`
  mutation addTrack($data: TrackCreateInput!) {
    addTrack(data: $data) {
      name
      locations {
        timestamp
        coords {
          latitude
          longitude
          altitude
          altitudeAccuracy
          accuracy
          heading
          speed
        }
      }
    }
  }
`;

export default () => {
  const { state: { name, locations }, reset } = useContext(LocationContext);
  const [addTrack] = useMutation(ADD_TRACK);

  const saveTrack = async () => {
    const locs = locations.map((l: any) => {
      return {
        timestamp: l.timestamp,
        coords: {
          create: {
            ...l.coords
          }
        }
      }
    });

    await addTrack({
      variables: {
        data: {
          name,
          locations: {
            create: [
              ...locs
            ]
          }
        }
      }
    });
    reset();
    navigate('TrackList');
  };

  return [saveTrack];
}
