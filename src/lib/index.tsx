import * as React from "react";

import { Heading, SmartTableProps } from "../../typings";

import "./style.css";

function ReactSmartTableComponent<T>({
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
}: SmartTableProps<T>) {
  const fields = headings.map((item: Heading<T>) => item.fieldName);

  /** Configuration for Infinite Scroll Starts */
  const [element, setElement] = React.useState(null);

  const tableRowRef = React.useRef<HTMLTableRowElement>(null);
  const itemsRef = React.useRef<Array<T>>(items);
  const hasMoreRecordsRef = React.useRef<boolean>(hasMoreRecords);

  const scrollObserver = React.useRef<IntersectionObserver>(
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
      { threshold: 0.7 }
    )
  );

  // Observing the chat messages container movement
  React.useEffect(() => {
    const currentObserver = scrollObserver.current;

    if (element) {
      currentObserver.observe(element);
    }

    return () => {
      if (element) currentObserver.disconnect();
    };
  }, [element]);

  // Updating the hasMoreRecordsRef when the hasMoreRecords flag changes
  React.useEffect(() => {
    hasMoreRecordsRef.current = hasMoreRecords;
  }, [hasMoreRecords]);

  // Updating the itemsRef when the items array changes
  React.useEffect(() => {
    if (items.length) {
      itemsRef.current = items;
    }

    if (inverseScroll) {
      tableRowRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [items, items.length, inverseScroll]);
  /** Configuration for Infinite Scroll Ends */

  return (
    <>
      <div className="scrollable-area">
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
            {recordsView === "infinite-Scroll" &&
              inverseScroll &&
              items.length && (
                <tr>
                  <td colSpan={headings.length}>
                    <p
                      style={{ color: "black", textAlign: "center" }}
                      ref={
                        setElement as unknown as React.LegacyRef<HTMLParagraphElement>
                      }
                    >
                      {customLoader ?? "Loading..."}
                    </p>
                  </td>
                </tr>
              )}
            {items && items.length ? (
              items.map((item, itemKey) => (
                <tr
                  key={itemKey}
                  onClick={() => onRowClick && onRowClick(item)}
                  className={onRowClick ? "cursor-pointer" : ""}
                >
                  {fields.map((field: Heading<T>["fieldName"], fieldKey) =>
                    scopedFields && scopedFields[field] ? (
                      <React.Fragment key={fieldKey}>
                        {scopedFields[field]?.(item)}
                      </React.Fragment>
                    ) : (
                      <td key={fieldKey}>{`${item[field as keyof T]}`}</td>
                    )
                  )}
                </tr>
              ))
            ) : loading ? (
              <tr>
                <td colSpan={fields.length}>{customLoader ?? "Loading..."}</td>
              </tr>
            ) : null}
            {recordsView === "infinite-Scroll" &&
              !inverseScroll &&
              items.length && (
                <tr>
                  <td colSpan={headings.length}>
                    <p
                      style={{ color: "black", textAlign: "center" }}
                      ref={
                        setElement as unknown as React.LegacyRef<HTMLParagraphElement>
                      }
                    >
                      {customLoader ?? "Loading..."}
                    </p>
                  </td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
      <div className="page-bar">
        {totalPages && currentPage ? (
          <>
            <span onClick={() => onPageChange && onPageChange(1)}>{"<<"}</span>
            {new Array(totalPages).fill(1)?.map((...[, i]) => (
              <React.Fragment key={i}>
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

                <span
                  className={currentPage === i + 1 ? "actve-page" : ""}
                  onClick={() => onPageChange && onPageChange(i + 1)}
                >
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
              </React.Fragment>
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

export const ReactSmartTable = ReactSmartTableComponent;

export default ReactSmartTableComponent;
