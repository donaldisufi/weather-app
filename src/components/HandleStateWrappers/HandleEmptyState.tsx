import React, { ReactNode } from "react";

interface HandleEmptyStateProps {
  isEmpty: boolean;
  emptyPlaceHolder?: ReactNode;
  children?: ReactNode;
}

const HandleEmptyState = ({ emptyPlaceHolder, isEmpty, children }: HandleEmptyStateProps) => {
  if (isEmpty) {
    return <>{emptyPlaceHolder}</>;
  }

  return <>{children}</>;
};

export default HandleEmptyState;
