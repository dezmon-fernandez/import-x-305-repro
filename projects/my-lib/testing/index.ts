// Secondary entry point: `my-lib/testing`
// Same package (projects/my-lib/package.json is the nearest package.json),
// importing from its own primary entry point. Angular libraries (ng-packagr)
// require secondary entry points to import the primary entry point this way.
import { answer } from 'my-lib';

export const mockAnswer = answer;
