import { objectType } from 'nexus';

export const Track = objectType({
  name: 'Track',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.locations();
    t.model.user();
  },
});
