import { inputObjectType, objectType } from 'nexus';

export const AuthInputType = inputObjectType({
  name: 'AuthInputType',
  definition(t) {
    t.nonNull.string('email');
    t.nonNull.string('password');
  },
});

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('accessToken');
    t.field('user', { type: 'User' });
  },
});
