import { extendType } from 'nexus'

export const track = extendType({
  type: 'Mutation',
  definition(t) {

    t.crud.createOneTrack({
      alias: 'addTrack',
      async resolve(root, args, ctx, info, originalResolve) {
        args = {
          ...args,
          data: {
            ...args.data,
            user: { connect: { id: ctx.userId }}
          },
        };
        return originalResolve(root, args, ctx, info);
      }
    });

    t.crud.deleteOneTrack({ alias: 'deleteTrack' })
  },
});
