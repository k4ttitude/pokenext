import { forwardRef } from "react";
import styles from "./Pagination.module.scss";
import classNames from "classnames";

type Props = {};

export default function Pagination({}: Props) {
  return (
    <div className="mb-4 flex gap-2 items-center">
      <span className="text-sm">Showing 1-3 results from 54</span>
      <div className="border border-gray-900">
        <PaginationButton className={styles.PaginationButton}>
          first
        </PaginationButton>
        <PaginationButton>prev</PaginationButton>
        <PaginationButton>1</PaginationButton>
        <PaginationButton>2</PaginationButton>
        <PaginationButton>3</PaginationButton>
        <PaginationButton>next</PaginationButton>
        <PaginationButton>last</PaginationButton>
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
