import * as React from "react";

import {
  Fragment,
  LegacyRef,
  ReactNode,
  TableHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";

interface Heading<T> {
  align?: "left" | "center" | "right" | "justify" | "char";
  colSpan?: number;
  fieldName: Extract<keyof T, string> | `action_${number}`;
  rowSpan?: number;
  title?: string;
}

type ScopedFields<T> = Partial<
  Record<Heading<T>["fieldName"], (item: T) => ReactNode>
>;

interface Props<T> extends TableHTMLAttributes<HTMLTableElement> {
  currentPage?: number;
  customLoader?: ReactNode | string;
  hasMoreRecords?: boolean;
  headings: Heading<T>[];
  items: Array<T>;
  loading?: boolean;
  recordsView?: "infinite-Scroll" | "pagination";
  inverseScroll?: boolean;
  loadMore?: () => void;
  onPageChange?: (page: number) => void;
  onRowClick?: (item: T) => void;
  recordsPerPage?: number;
  scopedFields?: ScopedFields<T>;
  totalPages?: number;
}

function Table<T>({
  currentPage,
  customLoader,
  hasMoreRecords = false,
  headings,
  inverseScroll,
  items,
  loading,
  loadMore,
  onPageChange,
  onRowClick,
  recordsView,
  recordsPerPage,
  scopedFields,
  totalPages,
  ...props
}: Props<T>) {
  const fields = headings.map((item: Heading<T>) => item.fieldName);

  /** Configuration for Infinite Scroll Starts */
  const [element, setElement] = useState(null);

  const itemsRef = useRef<Array<T>>(items);
  const hasMoreRecordsRef = useRef<boolean>(hasMoreRecords);

  const scrollObserver = useRef<IntersectionObserver>(
    new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          entry.intersectionRatio &&
          hasMoreRecordsRef.current &&
          loadMore
        ) {
          loadMore();
        }
      },
      { threshold: 1 }
    )
  );

  // Observing the chat messages container movement
  useEffect(() => {
    const currentObserver = scrollObserver.current;

    if (element) {
      currentObserver.observe(element);
    }

    return () => {
      if (element) currentObserver.disconnect();
    };
  }, [element]);

  // Updating the hasMoreRecordsRef when the hasMoreRecords flag changes
  useEffect(() => {
    hasMoreRecordsRef.current = hasMoreRecords;
  }, [hasMoreRecords]);

  // Updating the itemsRef when the items array changes
  useEffect(() => {
    if (items.length) {
      itemsRef.current = items;
    }
  }, [items, items.length]);
  /** Configuration for Infinite Scroll Ends */

  /** Configuration for Infinite Scroll Ends */

  return (
    <>
      <div className="scrollable-area">
        {recordsView === "infinite-Scroll" && inverseScroll && items.length && (
          <p
            style={{ color: "black" }}
            ref={setElement as unknown as LegacyRef<HTMLParagraphElement>}
          >
            Loading...
          </p>
        )}
        <table {...props}>
          {headings && headings.length ? (
            <thead>
              <tr>
                {headings.map(({ title, fieldName, ...restAttr }, i) => (
                  <th key={i} {...restAttr}>
                    {title ?? fieldName}
                  </th>
                ))}
              </tr>
            </thead>
          ) : null}

          <tbody>
            {items && items.length ? (
              items.map((item, itemKey) => (
                <tr
                  key={itemKey}
                  onClick={() => onRowClick && onRowClick(item)}
                  className={onRowClick ? "cursor-pointer" : ""}
                >
                  {fields.map((field: Heading<T>["fieldName"], fieldKey) =>
                    scopedFields && scopedFields[field] ? (
                      <Fragment key={fieldKey}>
                        {scopedFields[field]?.(item)}
                      </Fragment>
                    ) : (
                      <td key={fieldKey}>
                        {typeof item[field as keyof T] === "string"
                          ? (item[field as keyof T] as unknown as string)
                          : ""}
                      </td>
                    )
                  )}
                </tr>
              ))
            ) : loading ? (
              <tr>
                <td colSpan={fields.length}>{customLoader ?? "Loading"}</td>
              </tr>
            ) : null}
          </tbody>
        </table>
        {recordsView === "infinite-Scroll" &&
          !inverseScroll &&
          items.length && (
            <p
              style={{ color: "black" }}
              ref={setElement as unknown as LegacyRef<HTMLParagraphElement>}
            >
              Loading...
            </p>
          )}
      </div>
      <div className="page-bar">
        {totalPages && currentPage ? (
          <>
            <span onClick={() => onPageChange && onPageChange(1)}>{"<<"}</span>
            {new Array(totalPages).fill(1)?.map((...[, i]) => (
              <Fragment key={i}>
                {i === 0 ? (
                  <span
                    onClick={() =>
                      onPageChange &&
                      onPageChange(
                        currentPage === 1 ? currentPage : currentPage - 1
                      )
                    }
                  >
                    {"<"}
                  </span>
                ) : null}

                <span onClick={() => onPageChange && onPageChange(i + 1)}>
                  {i + 1}
                </span>

                {i === totalPages - 1 ? (
                  <span
                    onClick={() =>
                      onPageChange &&
                      onPageChange(
                        currentPage < totalPages ? currentPage + 1 : totalPages
                      )
                    }
                  >
                    {">"}
                  </span>
                ) : null}
              </Fragment>
            ))}
            <span onClick={() => onPageChange && onPageChange(totalPages)}>
              {">>"}
            </span>
          </>
        ) : null}
      </div>
    </>
  );
}

export default Table;
