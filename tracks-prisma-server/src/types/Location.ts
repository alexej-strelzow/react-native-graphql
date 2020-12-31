import { objectType } from 'nexus';

export const Location = objectType({
  name: 'Location',
  definition(t) {
    t.model.id();
    t.model.timestamp();
    t.model.coords();
  }
});
