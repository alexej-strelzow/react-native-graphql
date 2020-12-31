import { queryField } from 'nexus'

export const me = queryField('me', {
  type: 'User',
  async resolve(_parent, _args, { prisma, userId}) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  }
});
