import * as React from "react";

export interface Heading<T> {
  align?: "left" | "center" | "right" | "justify" | "char";
  colSpan?: number;
  fieldName: Extract<keyof T, string> | `action_${number}`;
  rowSpan?: number;
  title?: string;
  sortable?: boolean;
}

export type ScopedFields<T> = Partial<
  Record<Heading<T>["fieldName"], (item: T) => React.ReactNode>
>;

export type BaseSearchProps<T> = {
  search?: boolean;
  searchableFields?: Array<Extract<keyof T, string>>;
  searchBoxPlaceholder?: string;
  searchType?: "default" | "fuzzy";
  stopDefaultSearch?: boolean;
};

export type SearchProps<T> = BaseSearchProps<T> &
  (
    | {
        search: boolean;
        searchableFields: Array<Extract<keyof T, string>>;
        onSearch: (searchTerm: string) => void;
        searchBehavior: "debounce" | "throttle";
      }
    | {
        search: boolean;
        searchableFields: Array<Extract<keyof T, string>>;
        onSearch?: never;
        searchBehavior?: never;
      }
    | {
        search?: never;
        searchableFields?: never;
        onSearch?: never;
        searchBehavior?: never;
      }
  );

export interface SmartTableProps<T>
  extends React.TableHTMLAttributes<HTMLTableElement> {
  currentPage?: number;
  customLoader?: React.ReactNode | string;
  hasMoreRecords?: boolean;
  headings: Heading<T>[];
  items: Array<T>;
  loading?: boolean;
  recordsView?: "infinite-Scroll" | "pagination";
  inverseScroll?: boolean;
  loadMore?: () => void;
  noRecordsFound?: React.ReactNode | string;
  onPageChange?: (page: number) => void;
  onRowClick?: (item: T) => void;
  parentClass?: string;
  recordsPerPage?: number;
  scopedFields?: ScopedFields<T>;
  totalPages?: number;
}

export type ReactSmartTableComponentProps<T> = SmartTableProps<T> &
  SearchProps<T>;

declare const ReactSmartTableComponent: <T>(
  props: ReactSmartTableComponentProps<T>
) => React.ReactElement;

export default ReactSmartTableComponent;
