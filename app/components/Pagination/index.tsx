"use client";

import { forwardRef, useMemo } from "react";
import styles from "./Pagination.module.scss";
import classNames from "classnames";
import { useSearchStore } from "../../../stores/search.store";
import { useQuery } from "@apollo/client";
import { POKEMONS_COUNT } from "../../../graphql/queries";

type Props = {};

export default function Pagination({}: Props) {
  const { page, pageCount, limit, total, setPage, setTotal } = useSearchStore();
  useQuery(POKEMONS_COUNT, {
    onCompleted: (data) =>
      setTotal(data.pokemon_v2_pokemonspecies_aggregate.aggregate.count),
  });

  const handleGoFirst = () => setPage(1);
  const handleGoPrev = () => page > 1 && setPage(page - 1);
  const handleGoNext = () => page < pageCount && setPage(page + 1);
  const handleGoLast = () => setPage(pageCount);

  const adjectionPages = useMemo(() => {
    const before = [4, 3, 2, 1].map((i) => page - i).filter((p) => p > 0);
    const after = [1, 2, 3, 4]
      .map((i) => page + i)
      .filter((p) => p <= pageCount);
    const pages = [...before, page, ...after];
    const from = Math.floor(pages.length / 2) - 2;
    return pages.slice(from, from + 5);
  }, [page, pageCount]);

  return (
    <div className="mb-4 flex gap-2 items-center">
      <span className="text-sm">
        Showing {(page - 1) * limit + 1}-{page * limit} results from {total}
      </span>
      <div className="border border-gray-900">
        <PaginationButton
          className={styles.PaginationButton}
          onClick={handleGoFirst}
        >
          &lt;&lt;
        </PaginationButton>
        <PaginationButton onClick={handleGoPrev} disabled={page === 1}>
          &lt;
        </PaginationButton>
        {adjectionPages[0] > 1 && (
          <PaginationButton disabled>...</PaginationButton>
        )}
        {adjectionPages.map((i) => (
          <PaginationButton
            key={`page-${i}`}
            onClick={() => setPage(i)}
            active={i === page}
          >
            {i}
          </PaginationButton>
        ))}
        {adjectionPages[adjectionPages.length - 1] < pageCount && (
          <PaginationButton disabled>...</PaginationButton>
        )}
        <PaginationButton onClick={handleGoNext} disabled={page === pageCount}>
          &gt;
        </PaginationButton>
        <PaginationButton onClick={handleGoLast}>&gt;&gt;</PaginationButton>
      </div>
    </div>
  );
}

const PaginationButton = forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & { active?: boolean }
>(function PaginationButton({ className, active, children, ...props }, ref) {
  return (
    <button
      className={classNames({
        [styles.button]: true,
        className: true,
        "font-bold": active,
      })}
      {...props}
      ref={ref}
    >
      {children}
    </button>
  );
});
