import { CONFIG } from 'src/config-global';
import StepperComponent from 'src/sections/borrow/Stepper';

// ----------------------------------------------------------------------

export const metadata = { title: `Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <StepperComponent />;
}
