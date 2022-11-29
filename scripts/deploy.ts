import {deployBallot} from './deploy-ballot';
import {deployHelloWorld} from './deploy-helloWorld';
import {deployLottery} from './deploy-lottery';
import {deployMyToken} from './deploy-myToken';
import {deployTokenizedBallot} from './deploy-tokenizedBallot';

export const deploy = (): void => {
  const contractName = process.argv[2];
  switch (contractName) {
    case 'HelloWorld':
      deployHelloWorld();
      break;
    case 'Ballot':
      deployBallot();
      break;
    case 'MyToken':
      deployMyToken();
      break;
    case 'TokenizedBallot':
      deployTokenizedBallot();
      break;
    case 'Lottery':
      deployLottery();
      break;
    default:
      throw new Error('Invalid contract name');
  }
};

deploy();
