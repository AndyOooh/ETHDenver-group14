import { deployBallot } from './deploy-ballot';
import { deployHelloWorld } from './deploy-helloWorld';

export const deploy = () => {
  const contractArg = process.argv[2];
  switch (contractArg) {
    case 'HelloWorld':
      deployHelloWorld();
      break;
    case 'Ballot':
      deployBallot();
      break;
    default:
      console.log('You need to pass a valid contract name as the first argument');
      throw new Error('Invalid contract name');
  }
};

deploy();
