import React, { ReactNode } from "react";

interface HandleErrorStateProps {
  isError: boolean;
  errorPlaceHolder: ReactNode;
  children?: ReactNode;
}

const HandleErrorState = ({ errorPlaceHolder, isError, children }: HandleErrorStateProps) => {
  if (isError) {
    return <>{errorPlaceHolder}</>;
  }

  return <>{children}</>;
};

export default HandleErrorState;
