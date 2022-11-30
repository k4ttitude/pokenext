"use client";

import { forwardRef } from "react";
import styles from "./Pagination.module.scss";
import classNames from "classnames";
import { usePaginationStore } from "../../../stores/pagination.store";

type Props = {};

export default function Pagination({}: Props) {
  const { page, setPage } = usePaginationStore();

  const handleGoFirst = () => setPage(1);
  const handleGoPrev = () => page > 1 && setPage(page - 1);
  const handleGoNext = () => page < 10 && setPage(page + 1);
  const handleGoLast = () => setPage(10);

  return (
    <div className="mb-4 flex gap-2 items-center">
      <span className="text-sm">Showing 1-3 results from 54</span>
      <div className="border border-gray-900">
        <PaginationButton
          className={styles.PaginationButton}
          onClick={handleGoFirst}
        >
          first
        </PaginationButton>
        <PaginationButton onClick={handleGoPrev}>prev</PaginationButton>
        <PaginationButton>1</PaginationButton>
        <PaginationButton>2</PaginationButton>
        <PaginationButton>3</PaginationButton>
        <PaginationButton onClick={handleGoNext}>next</PaginationButton>
        <PaginationButton onClick={handleGoLast}>last</PaginationButton>
      </div>
    </div>
  );
}

const PaginationButton = forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(function PaginationButton({ className, children, ...props }, ref) {
  return (
    <button
      className={classNames(styles.button, className)}
      {...props}
      ref={ref}
    >
      {children}
    </button>
  );
});
