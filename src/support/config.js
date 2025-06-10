import { setDefaultTimeout } from '@cucumber/cucumber';
import dotenv from 'dotenv';

dotenv.config(); // ✅ Load .env variables

setDefaultTimeout(40 * 1000); // ✅ Set 40 seconds timeout globally
