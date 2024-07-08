import * as React from "react";

import { Heading, ReactSmartTableComponentProps } from "../../typings";

function ReactSmartTableComponent<T>({
  currentPage,
  customLoader,
  hasMoreRecords = false,
  headings,
  hideHeadings,
  inverseScroll,
  items,
  loading,
  loadMore,
  noRecordsFound,
  onPageChange,
  onRowClick,
  onSearch,
  parentClass = "scrollable-area",
  recordsView,
  recordsPerPage,
  scopedFields,
  search,
  searchableFields,
  searchBehavior,
  searchBoxPlaceholder = "Search...",
  searchType,
  showNumbering,
  stopDefaultSearch,
  totalPages,
  ...props
}: ReactSmartTableComponentProps<T>) {
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

  /* Search functionality starts */
  const [searchTerm, setSearchTerm] = React.useState("");

  const fuzzySearch = (needle: string, haystack: string) => {
    const hlen = haystack.length;
    const nlen = needle.length;
    if (nlen > hlen) {
      return false;
    }
    if (nlen === hlen) {
      return needle === haystack;
    }
    outer: for (let i = 0, j = 0; i < nlen; i++) {
      const nch = needle.charCodeAt(i);
      while (j < hlen) {
        if (haystack.charCodeAt(j++) === nch) {
          continue outer;
        }
      }
      return false;
    }
    return true;
  };

  const deepSearch = (obj: T, searchTerm: string) => {
    if (typeof obj === "object") {
      for (let key in obj) {
        if (
          searchableFields?.includes(key) &&
          deepSearch(obj[key] as T, searchTerm)
        )
          return true;
      }
    } else if (typeof obj === "string" || typeof obj === "number") {
      if (searchType === "fuzzy")
        return fuzzySearch(searchTerm.toLowerCase(), String(obj).toLowerCase());
      return String(obj).toLowerCase().includes(searchTerm.toLowerCase());
    }
    return false;
  };

  const filteredItems = React.useMemo(() => {
    if (!searchTerm || stopDefaultSearch) return items;

    return items.filter((item) => {
      return deepSearch(item, searchTerm);
    });
  }, [items, searchTerm]);

  /* Search functionality ends */

  /* Sorting functionality starts */

  // Step 1: Add a new state variable for sort field and sort direction
  const [sortField, setSortField] = React.useState<Extract<
    keyof T,
    string
  > | null>(null);
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">(
    "asc"
  );

  // Step 2: Add an onClick handler for table headers
  const handleSort = (field: Extract<keyof T, string>) => {
    setSortField(field);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  // Step 3: Sort items before rendering
  const sortedItems = React.useMemo(() => {
    if (!sortField) return filteredItems;

    return [...filteredItems].sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredItems, sortField, sortDirection]);

  /* Sorting functionality ends */

  return (
    <>
      {search && (
        <input
          type="text"
          className="search-box"
          value={searchTerm}
          onChange={(e) => {
            const text = e.target.value;
            setSearchTerm(text);
            if (searchBehavior === "debounce") {
              setTimeout(() => {
                if (onSearch) onSearch(text);
              }, 500);
            } else if (searchBehavior === "throttle") {
              clearTimeout(
                (window as any).searchThrottleTimeout as unknown as number
              );
              (window as any).searchThrottleTimeout = setTimeout(() => {
                if (onSearch) onSearch(text);
              }, 500);
            } else {
              if (onSearch) onSearch(text);
            }
          }}
          placeholder={searchBoxPlaceholder}
        />
      )}
      <div className={parentClass}>
        <table {...props} role="table">
          {headings && headings.length ? (
            <thead role="rowgroup">
              <tr role="row">
                {showNumbering ? <th role="columnheader">#</th> : null}
                {headings.map(
                  ({ title, fieldName, sortable, ...restAttr }, i) => (
                    <th
                      role="columnheader"
                      key={i}
                      {...restAttr}
                      style={{
                        cursor:
                          sortable && !fieldName.startsWith("action_")
                            ? "pointer"
                            : "default",
                      }}
                      title={
                        sortable && !fieldName.startsWith("action_")
                          ? "Click to sort"
                          : undefined
                      }
                      onClick={() =>
                        sortable &&
                        !fieldName.startsWith("action_") &&
                        handleSort(fieldName as Extract<keyof T, string>)
                      }
                    >
                      {title ?? fieldName}{" "}
                      {sortable && sortField === fieldName && (
                        <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
                      )}
                    </th>
                  )
                )}
              </tr>
            </thead>
          ) : null}

          <tbody role="rowgroup">
            {recordsView === "infinite-Scroll" &&
            inverseScroll &&
            hasMoreRecords &&
            items.length ? (
              <tr role="row">
                <td role="cell" colSpan={headings.length}>
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
            ) : null}
            {sortedItems && sortedItems.length ? (
              sortedItems.map((item, itemKey) => (
                <tr
                  key={itemKey}
                  onClick={() => onRowClick && onRowClick(item)}
                  className={onRowClick ? "cursor-pointer" : ""}
                >
                  {showNumbering ? <td>{itemKey + 1}</td> : null}
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
            ) : (
              <tr>
                {noRecordsFound ? (
                  typeof noRecordsFound === "string" ? (
                    <td colSpan={fields.length}>{noRecordsFound}</td>
                  ) : (
                    <td>{noRecordsFound}</td>
                  )
                ) : (
                  <td colSpan={fields.length} style={{ textAlign: "center" }}>
                    No record found
                  </td>
                )}
              </tr>
            )}
            {!hasMoreRecords ? (
              <tr>
                <td colSpan={headings.length}>
                  <p style={{ color: "black", textAlign: "center" }}>
                    You are all caught up!
                  </p>
                </td>
              </tr>
            ) : null}
            {recordsView === "infinite-Scroll" &&
            !inverseScroll &&
            hasMoreRecords &&
            items.length ? (
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
            ) : null}
          </tbody>
        </table>
      </div>
      <div className="page-bar">
        {totalPages && currentPage ? (
          <>
            <span
              onClick={() => {
                if (onPageChange) onPageChange(1);
              }}
            >
              {"<<"}
            </span>
            {new Array(totalPages).fill(1)?.map((...[, i]) => (
              <React.Fragment key={i}>
                {i === 0 ? (
                  <span
                    onClick={() => {
                      if (onPageChange)
                        onPageChange(
                          currentPage === 1 ? currentPage : currentPage - 1
                        );
                    }}
                  >
                    {"<"}
                  </span>
                ) : null}

                <span
                  className={currentPage === i + 1 ? "actve-page" : ""}
                  onClick={() => {
                    if (onPageChange) onPageChange(i + 1);
                  }}
                >
                  {i + 1}
                </span>

                {i === totalPages - 1 ? (
                  <span
                    onClick={() => {
                      if (onPageChange)
                        onPageChange(
                          currentPage < totalPages
                            ? currentPage + 1
                            : totalPages
                        );
                    }}
                  >
                    {">"}
                  </span>
                ) : null}
              </React.Fragment>
            ))}
            <span
              onClick={() => {
                if (onPageChange) onPageChange(totalPages);
              }}
            >
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
