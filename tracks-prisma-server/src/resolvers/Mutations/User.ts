import { extendType, nonNull, stringArg } from 'nexus'
import { compare, hash } from 'bcrypt'
import { generateAccessToken, handleError } from '../../utils/helpers'
import { errors } from '../../utils/constants'

export const user = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('signup', {
      type: 'AuthPayload',
      args: {
        name: stringArg(),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(_parent, { name, email, password }, { prisma }) {
        try {
          const hashedPassword = await hash(password, 10);
          const user = await prisma.user.create({
            data: {
              name,
              email,
              password: hashedPassword,
            },
          });

          const accessToken = generateAccessToken(user.id);
          return {
            accessToken,
            user,
          }
        } catch (e) {
          handleError(errors.userAlreadyExists);
        }
      },
    });

    t.field('signin', {
      type: 'AuthPayload',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(_parent, { email, password }, { prisma }) {
        let user = null;
        try {
          user = await prisma.user.findUnique({
            where: {
              email,
            },
          })
        } catch (e) {
          handleError(errors.invalidUser);
        }

        if (!user) handleError(errors.invalidUser);

        const passwordValid = await compare(password, user.password);
        if (!passwordValid) handleError(errors.invalidUser);

        const accessToken = generateAccessToken(user.id);
        return {
          accessToken,
          user,
        }
      },
    })
  },
});
