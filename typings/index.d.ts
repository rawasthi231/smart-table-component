import * as React from 'react';

export interface Heading<T> {
    align?: "left" | "center" | "right" | "justify" | "char";
    colSpan?: number;
    fieldName: Extract<keyof T, string> | `action_${number}`;
    rowSpan?: number;
    title?: string;
}

export type ScopedFields<T> = Partial<
    Record<Heading<T>["fieldName"], (item: T) => React.ReactNode>
>;

export interface SmartTableProps<T> extends React.TableHTMLAttributes<HTMLTableElement> {
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

type ReactSmartTableComponentType = <T>(props: SmartTableProps<T>) => React.ReactElement;

export declare const ReactSmartTable: ReactSmartTableComponentType;

export declare const ReactSmartTableComponent: React.FC<SmartTableProps<any>>;

export default ReactSmartTableComponent;