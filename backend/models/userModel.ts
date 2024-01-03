import { Schema, model, type Document, type InferSchemaType } from 'mongoose';
import { compare, genSalt, hash } from 'bcrypt';
import validator from 'validator';

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
},
{
  statics: {
    async signup (username: string, password: string) {
      // validation
      if (username === '' || password === '') {
        throw Error('All fields must be filled.');
      }

      if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough.');
      }

      const exists = await this.findOne({ username });

      if (exists !== null) {
        throw Error('Username already in use');
      }

      const salt = await genSalt(10);
      const hashed = await hash(password, salt);

      const user = await this.create({ username, password: hashed });
      return user;
    },

    async login (username: string, password: string) {
      if (username === '' || password === '') {
        throw Error('All fields must be filled.');
      }

      const user = await this.findOne({ username });

      if (user === null) {
        throw Error('Incorrect username.');
      }

      const match = await compare(password, user.password);

      if (!match) {
        throw Error('Incorrect password.');
      }

      return user;
    },
  }
});

export default model('User', userSchema);
export type User = InferSchemaType<typeof userSchema> & Document;
