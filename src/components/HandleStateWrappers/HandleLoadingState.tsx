import { ReactNode } from "react";

interface HandleLoadingStateProps {
  children?: ReactNode;
  isLoading: boolean;
  loadingPlaceHolder: ReactNode;
}

const HandleLoadingState = ({
  isLoading,
  loadingPlaceHolder,
  children,
}: HandleLoadingStateProps) => {
  if (isLoading) {
    return <>{loadingPlaceHolder}</>;
  }

  return <>{children}</>;
};

export default HandleLoadingState;
