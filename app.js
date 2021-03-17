const { person } = require('./person');
const { spellCheck } = require('./spellCheck');

const spellCheckPersonAsync = Object.entries(person).map(
  async ( [key, val] ) => {
    const checkSpelling = await spellCheck(key);
    return {
      [checkSpelling]: val,
    };
  }
);

( async () => {
  const spellCheckPerson = await Promise.all(spellCheckPersonAsync);

  // array to object
  const finalObject = spellCheckPerson.reduce((acc, curr) => ({ ...acc, ...curr }), {});
  console.log(finalObject);
})();
