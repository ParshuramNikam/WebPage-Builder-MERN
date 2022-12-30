import bcrypt from 'bcrypt';

const hashing = (input) => {
	return bcrypt.hashSync(input, 10);
};

export default hashing;
