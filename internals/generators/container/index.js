/* eslint-disable */
const componentExists = require('../utils/componentExists');
const fs = require('fs');
const path = require('path');

function trimTemplateFile(template) {
  // Loads the template file and trims the whitespace and then returns the content as a string.
  return fs.readFileSync(path.join(__dirname, `./${template}`), 'utf8').replace(/\s*$/, '');
}

module.exports = {
  description: 'Add a container component',
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
  }, {
    type: 'confirm',
    name: 'wantActionsAndReducer',
    default: true,
    message: 'Do you want an actions/constants/reducer tuple for this container?',
  }],
  actions: (data) => {
    // Generate index.js and index.test.js
    const componentTemplate = './container/es6.js.hbs';
    const styleTemplate = './container/style.js.hbs';

    const actions = [{
      type: 'add',
      path: '../../src/containers/{{properCase name}}/index.js',
      templateFile: componentTemplate,
      abortOnFail: true,
    }];

    if (data.wantStyleJs) {
      actions.push({
        type: 'add',
        path: '../../src/containers/{{properCase name}}/style.js',
        templateFile: styleTemplate,
        abortOnFail: true,
      })
    }

    if (data.wantActionsAndReducer) {
      // Actions
      actions.push({
        type: 'add',
        path: '../../src/containers/{{properCase name}}/actions.js',
        templateFile: './container/actions.js.hbs',
        abortOnFail: true,
      });

      // Constants
      actions.push({
        type: 'add',
        path: '../../src/containers/{{properCase name}}/constants.js',
        templateFile: './container/constants.js.hbs',
        abortOnFail: true,
      });

      // Reducer
      actions.push({
        type: 'add',
        path: '../../src/containers/{{properCase name}}/reducer.js',
        templateFile: './container/reducer.js.hbs',
        abortOnFail: true,
      });

      actions.push({
        type: 'modify',
        path: '../../src/modules/index.js',
        template: trimTemplateFile('importNewReducer.hbs'),
        pattern: /(\nexport default combineReducers\({)/g,
        abortOnFail: true,
      });

      actions.push({
        type: 'modify',
        path: '../../src/modules/index.js',
        template: trimTemplateFile('addNewReducer.hbs'),
        pattern: /(}\);)/g
      });
    }

    return actions;
  },
};
