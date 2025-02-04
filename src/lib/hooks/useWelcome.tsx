import { useSPA } from "../contexts";
export const useWelcome = () => {
  const { navigateTo } = useSPA();
  const handleGetStarted = () => {
    navigateTo("startup");
  };

  return { handleGetStarted };
};
