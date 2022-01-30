import * as z from 'zod';

const registerValidation = z.object({
  name: z.string().nonempty({ message: 'NON_EMPTY' }).min(3, { message: 'MIN_LENGTH_3' }),
  email: z.string().nonempty({ message: 'NON_EMPTY' }).email({message: 'INVALID_EMAIL'}),
  password: z.string().nonempty({ message: 'NON_EMPTY' }).min(6, { message: 'MIN_LENGTH_6' }),
  cellphone: z.string().nonempty({ message: 'NON_EMPTY' }), 
}).strict();

export default registerValidation;
