const noop = () => {};
const listToObject = (list = [], key) => list.reduce((total, item) => ({ ...total, [item[key]]: item }), {});

export {noop, listToObject}