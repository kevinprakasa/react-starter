/* eslint-disable */
const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'Add an unconnected component',
  prompts: [{
    type: 'list',
    name: 'type',
    message: 'Select the type of component',
    default: 'Component',
    choices: () => ['PureComponent', 'Component'],
  }, {
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'Button',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return componentExists(value) ? 'A component or container with this name already exists' : true;
      }

      return 'The name is required';
    },
  }, {
    type: 'confirm',
    name: 'wantStyleJs',
    default: true,
    message: 'Do you need style.js?',
  }],
  actions: (data) => {
    // Generate index.js and index.test.js
    const componentTemplate = './component/es6.js.hbs';
    const styleTemplate = './component/style.js.hbs';

    const actions = [{
      type: 'add',
      path: '../../src/components/{{properCase name}}/index.js',
      templateFile: componentTemplate,
      abortOnFail: true,
    }];

    if (data.wantStyleJs) {
      actions.push({
        type: 'add',
        path: '../../src/components/{{properCase name}}/style.js',
        templateFile: styleTemplate,
        abortOnFail: true,
      })
    }

    return actions;
  },
};
