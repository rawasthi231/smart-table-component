import * as React from 'react';

interface Heading<T> {
    align?: "left" | "center" | "right" | "justify" | "char";
    colSpan?: number;
    fieldName: Extract<keyof T, string> | `action_${number}`;
    rowSpan?: number;
    title?: string;
}

type ScopedFields<T> = Partial<
    Record<Heading<T>["fieldName"], (item: T) => React.ReactNode>
>;

interface SmartTableProps<T> extends React.TableHTMLAttributes<HTMLTableElement> {
    currentPage?: number;
    customLoader?: React.ReactNode | string;
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

declare interface SmartTableComponent<T> extends React.FC<SmartTableProps<T>> {

}

export { SmartTableProps }
export default SmartTableComponent;