import { extendType } from 'nexus'

export const tracks = extendType({
  type: 'Query',
  definition(t) {
    /*t.crud.tracks({
      filtering:
        {
          id: true,
          userId: true,
          name: true
        },
      ordering: true,
      pagination: true
    });*/

    t.crud.tracks({
      type: 'Track',
      async resolve(root, args, ctx, info, originalResolve) {
        args = {
          where : { userId: { equals: ctx.userId } }
        } as any;
        return originalResolve(root, args, ctx, info);
      }
    });

    t.crud.track();
  }
});
