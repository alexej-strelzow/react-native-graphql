import { objectType } from 'nexus';

export const Coordinate = objectType({
  name: 'Coordinate',
  definition(t) {
    t.model.id();
    t.model.latitude();
    t.model.longitude();
    t.model.altitude();
    t.model.altitudeAccuracy();
    t.model.accuracy();
    t.model.heading();
    t.model.speed();
  }
});
