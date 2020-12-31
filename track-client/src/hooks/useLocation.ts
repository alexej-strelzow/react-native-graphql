import { useEffect, useState } from 'react';
import { Accuracy, requestPermissionsAsync, watchPositionAsync } from 'expo-location';

export default (shouldTrack: boolean, callback: any) => {

  const [err, setErr] = useState(null);

  useEffect(() => {
    let subscriber: any;

    const startWatching = async () => {
      try {
        const { granted } = await requestPermissionsAsync();
        if (!granted) {
          throw new Error('Location permission not granted');
        }
        subscriber = await watchPositionAsync({
          accuracy: Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 10
        }, callback);

      } catch (e) {
        setErr(e);
      }
    };

    if (shouldTrack) {
      startWatching();
    } else {
      if (subscriber) {
        subscriber.remove();
      }
      subscriber = null
    }

    return () => {
      if (subscriber) {
        subscriber.remove();
      }
    }
  }, [shouldTrack, callback]);

  return [err]
};
