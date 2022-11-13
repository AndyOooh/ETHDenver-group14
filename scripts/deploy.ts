import {deployBallot} from './deploy-ballot';
import {deployHelloWorld} from './deploy-helloWorld';
import {DeployTokenizedBallot} from './deploy-tokenizedBallot';

console.log('in deploy.ts');

export const deploy = (): void => {
  const contractName = process.argv[2];
  switch (contractName) {
    case 'HelloWorld':
      deployHelloWorld();
      break;
    case 'Ballot':
      deployBallot();
      break;
    case 'TokenizedBallot':
      DeployTokenizedBallot();
      break;
    default:
      throw new Error('Invalid contract name');
  }
};

deploy();
