const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x);

const composeM = chainMethod => (...ms) =>
  ms.reduce((f, g) => x => g(x)[chainMethod](x));

const composeMap = (...ms) => ms.reduce((f, g) => x => g(x).map(f))

const composePromises = composeM('then');

const trace = label => value => {
  console.log(`${label}: ${value}`);
  return value;
};

{
  const label = 'API call composition';

  // a => Promise(b)
  const getUserById = id =>
    id === 3 ? Promise.resolve({ name: 'Kurt', role: 'Author' }) : undefined;

  // b => Promise(c)
  const hasPermission = ({ role }) => Promise.resolve(role === 'Author');

  // Try to compose them, *** This Will Fail ***
  // const authUser = compose(hasPermission, getUserById);
  // Compose again with promise composition *** This Will Work! ***
  const authUser = composePromises(hasPermission, getUserById);

  // Ooops!! Always false!
  authUser(3).then(trace(label));
}
