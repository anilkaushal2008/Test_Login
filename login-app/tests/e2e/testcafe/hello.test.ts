{
  "dependencies": {
    "testcafe": "3.7.2"
  }
}

{
  "browsers": [
    "chrome"
  ],
  "src": "tests/e2e/testcafe/**/*.test.ts",
  "reporter": [
    {
      "name": "spec"
    }
  ]
}

import { Selector } from 'testcafe';

fixture `My First Test`
  .page `http://localhost:3000`;

test('Check if the application is running', async t => {
  const element = Selector('h1');
  await t
    .expect(element.innerText).eql('Welcome to the Application');
});