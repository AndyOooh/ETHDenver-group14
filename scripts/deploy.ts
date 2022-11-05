
import {deployBallot} from './deploy-ballot';
import {deployHelloWorld} from './deploy-helloWorld';

export const deploy = (): void => {
  const contractArg = process.argv[2];
  switch (contractArg) {
    case 'HelloWorld':
      deployHelloWorld();
      break;
    case 'Ballot':
      deployBallot();
      break;
    default:
      throw new Error('Invalid contract name');
  }
};

deploy();