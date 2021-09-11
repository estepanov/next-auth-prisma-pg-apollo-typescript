import { getUserFromSession } from '../../../prisma/client';

const meResolver = (parent, args, context, info) =>
  context?.session?.user ? getUserFromSession(context.session || {}) : null;

export default meResolver;
